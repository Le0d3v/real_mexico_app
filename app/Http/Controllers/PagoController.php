<?php

namespace App\Http\Controllers;

use App\Http\Requests\PagoRequest;
use App\Http\Resources\PagoCollection;
use App\Models\Colegiatura;
use App\Models\Pago;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PagoController extends Controller
{
    /**
     * Obtener todos los pagos
     */
    public function index()
    {
        return new PagoCollection(
            Pago::latest()->with([
                'colegiatura',
                'estudiante',
                'tutor', // ← usuario + perfil tutor
            ])->get()
        );
    }

    /**
     * Crear nuevo pago en BD
     */
    public function store(PagoRequest $request)
    {
        DB::beginTransaction();

        try {
            // Obtener la colegiatura
            $colegiatura = Colegiatura::find($request->colegiatura_id);
            $colegiatura->monto = $colegiatura->getMonto();
            $colegiatura->pagado += $request->monto;

            if($colegiatura->pagado >= $colegiatura->monto) {
                $colegiatura->estado = "Pagado";
            }

            // Guardar cambios a la colegiatura
            $colegiatura->save();
        
            // Crear el pago
            $pago = Pago::create([
                'colegiatura_id' => $request->colegiatura_id,
                'estudiante_id' => $request->estudiante_id,
                'tutor_id' => $request->tutor_id,
                'asunto' => $request->asunto,
                'fecha_pago' => $request->fecha_pago,
                'monto' => $request->monto,
                'metodo_pago' => $request->metodo_pago,
                'referencia' => $request->referencia,
                'observaciones' => $request->observaciones,
            ]);

            // Guardar Cambios
            DB::commit();

            // Respuesta al cliente
            return response()->json([
                'message' => 'Pago registrado exitosamente.',
            ], 201);

        } catch (\Exception $e) {
            // Cancelar transacción
            DB::rollBack();

            // Menesajes al cliente
            return response()->json([
                'message' => 'Error al registrar el pago.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}

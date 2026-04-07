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
            $colegiaturaIds = is_array($request->colegiatura_id)
                ? $request->colegiatura_id
                : [$request->colegiatura_id];

            $totalMonto = $request->monto;
            $montoRestante = $totalMonto;

            foreach ($colegiaturaIds as $colegiaturaId) {
                $colegiatura = Colegiatura::find($colegiaturaId);

                if (!$colegiatura) {
                    throw new \Exception("Colegiatura no encontrada");
                }

                $colegiatura->monto = $colegiatura->getMonto();

                $pendiente = $colegiatura->monto - $colegiatura->pagado;

                // 🔥 calcular cuánto se aplicará a ESTA colegiatura
                $montoAplicado = 0;

                if ($montoRestante >= $pendiente) {
                    $montoAplicado = $pendiente;

                    $colegiatura->pagado += $pendiente;
                    $montoRestante -= $pendiente;
                    $colegiatura->estado = "Pagado";
                } else {
                    $montoAplicado = $montoRestante;

                    $colegiatura->pagado += $montoRestante;
                    $montoRestante = 0;
                }

                $colegiatura->save();

                // 🔥 usar montoAplicado en lugar del total
                Pago::create([
                    'colegiatura_id' => $colegiaturaId,
                    'estudiante_id' => $request->estudiante_id,
                    'tutor_id' => $request->tutor_id,
                    'asunto' => $request->asunto,
                    'fecha_pago' => $request->fecha_pago,
                    'monto' => $montoAplicado, // ✅ CORREGIDO
                    'metodo_pago' => $request->metodo_pago,
                    'referencia' => $request->referencia,
                    'observaciones' => $request->observaciones,
                ]);

                if ($montoRestante <= 0) break;
            }

            DB::commit();

            return response()->json([
                'message' => 'Pago registrado exitosamente.',
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Error al registrar el pago.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}

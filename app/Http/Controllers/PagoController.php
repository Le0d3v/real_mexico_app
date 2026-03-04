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
     * Display a listing of the resource.
     */
    public function index()
    {
        return new PagoCollection(
            Pago::with([
                'colegiatura',
                'estudiante',
                'tutor', // ← usuario + perfil tutor
            ])->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PagoRequest $request)
    {
        DB::beginTransaction();

        try {
            $colegiatura = Colegiatura::find($request->colegiatura_id);
        
            $user = Pago::create([
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

            return response()->json([
                'message' => 'Pago registrado exitosamente.',
            ], 201);

        } catch (\Exception $e) {

            DB::rollBack();

            return response()->json([
                'message' => 'Error al crear el tutor.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

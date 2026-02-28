<?php

namespace App\Http\Controllers;

use App\Http\Resources\ColegiaturaResource;
use App\Models\CicloEscolar;
use App\Models\Colegiatura;
use Illuminate\Http\Request;

class ColegiaturaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
         $ciclo_actual = CicloEscolar::where("activo", 1)->first();

        if (!$ciclo_actual) {
            return response()->json([
                "message" => "No existe ciclo escolar activo"
            ], 404);
        }

        $colegiaturas = Colegiatura::where(
            "ciclo_escolar_id",
            $ciclo_actual->id
        )->get();

        return ColegiaturaResource::collection($colegiaturas);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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

<?php

namespace App\Http\Controllers;

use App\Http\Resources\ColegiaturaEstudianteResource;
use App\Models\CicloEscolar;
use App\Models\Colegiatura;
use Illuminate\Http\Request;

class ColegiaturaController extends Controller
{
    /**
     * Obtener todas las colegiaturas activas en BD
     */
    public function index()
    {
        // Obtener ciclo escolar actual
        $ciclo_actual = CicloEscolar::where("activo", 1)->first();

        if (!$ciclo_actual) {
            // Mensajes en caso de error
            return response()->json([
                "message" => "No existe ciclo escolar activo"
            ], 404);
        }

        // Obtener colegiaturas correspondientes al ciclo escolar
        $colegiaturas = Colegiatura::where(
            "ciclo_escolar_id",
            $ciclo_actual->id
        )->get();

        // Retornar colegiaturas formateadas en JSON
        return ColegiaturaEstudianteResource::collection($colegiaturas);
    }
}

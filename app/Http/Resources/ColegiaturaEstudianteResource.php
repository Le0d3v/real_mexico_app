<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ColegiaturaEstudianteResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "mes" => $this->mes,
            "anio" => $this->anio,
            "monto" => $this->monto,
            "pagado" => $this->pagado,
            "estado" => $this->estado,
            "estudiante_id" => $this->estudiante_id,
            "fecha_limite_pago" => $this->fecha_limite_pago,
            "ciclo_escolar" => new CicloEscolarResource($this->ciclo),
            "estudiante" => new EstudianteResource($this->estudiante)
        ];
    }
}

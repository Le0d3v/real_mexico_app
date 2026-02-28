<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ColegiaturaResource extends JsonResource
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
            "pagado" => $this->monto,
            "estado" => $this->estado,
            "fecha_limite_pago" => $this->fecha_limite_pago,
            "ciclo_escolar" => new CicloEscolarResource($this->ciclo),
            "estudiante" => new EstudianteResource($this->estudiante)
        ];
    }
}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\ColegiaturaResource;
use Illuminate\Database\Eloquent\Attributes\UseResource;

class PagoResource extends JsonResource
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
            "fecha_pago" => $this->created_at,
            "monto" => $this->monto,
            "metodo_pago" => $this->metodo_pago,
            "referencia" => $this->referencia,
            "observaciones" => $this->observaciones,
            "colegiatura" => new ColegiaturaResource($this->colegiatura),
            "estudiante" => new EstudianteResource($this->estudiante),

            "tutor" =>  $this->tutor->user,
        ];
    }
}

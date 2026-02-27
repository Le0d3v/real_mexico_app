<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CicloEscolarResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "nombre" => $this->nombre,
            "fecha_inicio" => $this->fecha_inicio,
            "fecha_fin" => $this->fecha_fin,
            "activo" => $this->activo,
        ];
    }
}

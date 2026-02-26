<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DomicilioResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "calle" => $this->calle,
            "numero_exterior" => $this->numero_exterior,
            "numero_interior" => $this->numero_interior,
            "colonia" => $this->colonia,
            "localidad" => $this->localidad,
            "municipio" => $this->municipio,
            "entidad" => $this->entidad,
            "cp" => $this->cp,
        ];
    }
}

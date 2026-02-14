<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            "name" => $this->name,
            "apellido_paterno" => $this->apellido_paterno,
            "apellido_materno" => $this->apellido_materno,
            "fecha_nacimiento" => $this->fecha_nacimiento,
            "genero" => $this->genero,
            "email" => $this->email,
            "telefono" => $this->telefono,
            "rol" => $this->rol,

            "domicilio" => $this->whenLoaded('domicilio', function () {
                return [
                    "calle" => $this->domicilio->calle,
                    "numero_interior" => $this->domicilio->numero_interior,
                    "numero_exterior" => $this->domicilio->numero_exterior,
                    "colonia" => $this->domicilio->colonia,
                    "localidad" => $this->domicilio->localidad,
                    "municipio" => $this->domicilio->municipio,
                    "entidad" => $this->domicilio->entidad,
                    "cp" => $this->domicilio->cp,
                ];
            }),

            "tutor" => $this->when(
                $this->esTutor() && $this->relationLoaded('tutor') && $this->tutor,
                new TutorResource($this->tutor)
            ),
        ];
    }
}

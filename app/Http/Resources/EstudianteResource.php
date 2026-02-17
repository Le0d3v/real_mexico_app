<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EstudianteResource extends JsonResource
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
            "nombre" => $this->nombre,
            "apellido_paterno" => $this->apellido_paterno,
            "apellido_materno" => $this->apellido_materno,
            "fecha_nacimiento" => $this->fecha_nacimiento,
            "curp" => $this->curp,
            "genero" => $this->genero,
            "tipo_sangre" => $this->tipo_sangre,
            "entidad_nacimiento" => $this->entidad_nacimiento,
            "tipo_sangre" => $this->tipo_sangre,
            "grado" => $this->grado->grado,
            "grupo" => $this->grupo->grupo,
            
            "domicilio" => new DomicilioResource($this->domicilio),

            "colegiaturas" => ColegiaturaResource::collection(
                $this->whenLoaded('colegiaturas')
            ),
        ];
    }
}

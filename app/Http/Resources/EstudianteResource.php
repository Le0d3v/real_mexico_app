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
            "matricula" => $this->matricula,
            "estado" => $this->estado,
            "tipo_sangre" => $this->tipo_sangre,
            "entidad_nacimiento" => $this->entidad_nacimiento,
            "grado" => $this->grado->grado,
            "grado_id" => $this->grado_id,
            "grupo" => $this->grupo->grupo,
            
            "domicilio" => new DomicilioResource($this->domicilio),

            "colegiaturas" => $this->whenLoaded("colegiaturas", function () {
                return $this->colegiaturas->map(function ($colegiatura) {
                    return new ColegiaturaResource($colegiatura);

                });
                
            }),
            
            "tutores" => $this->whenLoaded('tutores', function () {
                return $this->tutores->map(function ($tutor) {

                    return [
                        // Datos del usuario
                        "usuario" => new UserResource($tutor->user),

                        // Datos propios de tutor
                        "ocupacion" => $tutor->ocupacion,
                        "nivel_estudios" => $tutor->nivel_estudios,

                        // Datos pivot
                        "relacion" => [
                            "parentesco" => $tutor->pivot->parentesco,
                            "responsable_pagos" => (bool) $tutor->pivot->responsable_pagos,
                            "contacto_principal" => (bool) $tutor->pivot->contacto_principal,
                        ],
                    ];
                });
            }),
        ];
    }
}

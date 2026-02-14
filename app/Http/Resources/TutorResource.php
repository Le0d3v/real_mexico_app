<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\EstudianteResource;


class TutorResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "ocupacion" => $this->ocupacion,
            "nivel_estudios" => $this->nivel_estudios,

             "estudiantes" => EstudianteResource::collection(
                $this->whenLoaded('estudiantes')
            ),
        ];
    }
}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
       return [
        "titulo" => $this->titulo,
        "descripcion" => $this->descripcion,
        "multimedia" => $this->contenido_multimedia,
        "fecha" => $this->created_at->diffForHumans() ?? null,
        "created_at" => $this->created_at,
       ];
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CicloEscolar extends Model
{
    protected $fillable = [
        "nombre",
        "fecha_inicio",
        "fecha_fin",
        "activo"
    ];

    protected $casts = [
        'fecha_inicio' => 'date',
        'fecha_fin' => 'date',
        'activo' => 'boolean',
    ];

    // Relaciones

      public function colegiaturas()
    {
        return $this->hasMany(Colegiatura::class);
    }
}

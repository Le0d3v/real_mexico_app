<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Colegiatura extends Model
{
    protected $fillable = [
        "estudiante_id",
        "ciclo_escolar_id",
        "mes",
        "anio",
        "monto",
        "estado",
        "fecha_limite_pago",
    ];

     protected $casts = [
        'fecha_inicio' => 'date',
        'fecha_fin' => 'date',
        'activo' => 'boolean',
    ];

    // Relaciones 
    
    public function estudiante() 
    {
        return $this->belongsTo(Estudiante::class);
    }

    public function ciclo() 
    {
        return $this->belongsTo(CicloEscolar::class, "ciclo_escolar_id", "id");
    }

    public function pagos() 
    {
        return $this->hasMany(Pago::class);
    }
}

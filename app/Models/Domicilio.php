<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Domicilio extends Model
{
    protected $fillable = [
        "calle",
        "numero_interior",
        "numero_exterior",
        "colonia",
        "localidad",
        "municipio",
        "entidad",
        "cp",
    ];

    // Relaciones 
    
    public function estudiantes() 
    {
        return $this->hasMany(Estudiante::class);
    }

    public function usuarios() 
    {
        return $this->hasMany(User::class);
    }
}

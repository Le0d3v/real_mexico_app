<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Estudiante extends Model
{
    protected $fillable = [
        "nombre",
        "apellido_paterno",
        "apellido_materno",
        "fecha_nacimiento",
        "curp",
        "genero",
        "entidad_nacimiento",
        "tipo_sangre",
        "lengua_materna",
        "discapacidad",
        "domicilio_id",
        "grado_id",
        "grupo_id",
    ];

    public function domicilio() // ✅
    {
        return $this->belongsTo(Domicilio::class);
    }

    public function grado() // ✅
    {
        return $this->belongsTo(Grado::class);
    }

    public function grupo() // ✅
    {
        return $this->belongsTo(Grupo::class);
    }

    public function tutores()
    {
        return $this->belongsToMany(
            Tutor::class,
            'estudiantes_tutores',
            'estudiante_id',
            'tutor_id'
        )
        ->withPivot([
            'parentesco',
            'responsable_pagos',
            'contacto_principal'
        ])
        ->withTimestamps();
    }

    public function colegiaturas()
    {
        return $this->hasMany(Colegiatura::class);
    }
}

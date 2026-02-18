<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EstudianteTutor extends Model
{
    protected $table = 'estudiantes_tutores';

    protected $fillable = [
        "estudiante_id",
        "tutor_id",
        "parentesco",
        "responsable_pagos",
        "contacto_principal",
    ];

    public $timestamps = false;
}

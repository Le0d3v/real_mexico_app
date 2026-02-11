<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EstudianteTutor extends Model
{
    protected $table = 'estudiante_tutor';

    protected $fillable = [
        "estudiante_id",
        "tutor_id",
        "parentezco",
        "responsable_pagos",
        "contacto_principal",
    ];

    public $timestamps = false;
}

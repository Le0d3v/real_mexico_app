<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tutor extends Model
{
    protected $table = 'tutores';
    protected $primaryKey = 'id';
    public $incrementing = false;

     protected $fillable = [
        'ocupacion',
        'nivel_estudios',
    ];

    
    public function user()
    {
        return $this->belongsTo(User::class, 'id', 'id');
    }

    public function estudiantes()
    {
        return $this->belongsToMany(
            Estudiante::class,   
            'estudiantes_tutores',
            'tutor_id',          
            'estudiante_id'      
        )
        ->withPivot([
            'parentesco',
            'responsable_pagos',
            'contacto_principal'
        ]);
    }

    public function pagos()
    {
        return $this->hasMany(Pago::class, 'tutor_id');
    }

}

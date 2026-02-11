<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Grupo extends Model
{
    protected $fillable = ["grupo"];

    public function estudiantes() 
    {
        return $this->hasMany(Estudiante::class);
    }
}

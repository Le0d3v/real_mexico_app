<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Grado extends Model
{
     protected $fillable = ["grado"];

    public function estudiantes() 
    {
        return $this->hasMany(Estudiante::class);
    }
}

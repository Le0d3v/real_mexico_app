<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tutor extends Model
{
    protected $primaryKey = 'id';
    public $incrementing = false;

     protected $fillable = [
        'ocupacion',
        'nivel_estudios',
    ];

    
    public function usuario()
    {
        return $this->belongsTo(User::class, 'id');
    }

    public function estudiantes()
    {
        return $this->belongsToMany(
            Estudiante::class,
            'estudiante_tutor',
            'tutor_id',
            'estudiante_id'
        );
    }

    public function pagos()
    {
        return $this->hasMany(Pago::class, 'tutor_id');
    }

}

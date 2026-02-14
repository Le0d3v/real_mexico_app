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
            Estudiante::class,   // ✅ Correcto
            'estudiantes_tutores',
            'tutor_id',          // FK del tutor en la pivote
            'estudiante_id'      // FK del estudiante en la pivote
        )->withTimestamps();
    }

    public function pagos()
    {
        return $this->hasMany(Pago::class, 'tutor_id');
    }

}

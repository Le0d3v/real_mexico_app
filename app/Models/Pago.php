<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pago extends Model
{
    protected $fillable = [
        "colegiatura_id",
        "estudiante_id",
        "tutor_id",
        "fecha_pago",
        "monto",
        "metodo_pago",
        "referencia",
        "observaciones",
    ];

    protected $casts = [
        'fecha_pago' => 'datetime',
    ];

    public function tutor()
    {
        return $this->belongsTo(Tutor::class);
    }

    public function colegiatura()
    {
        return $this->belongsTo(Colegiatura::class);
    }
}

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
        "matricula",
        "estado",
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

    public function colegiaturasActuales()
    {
        $cicloActual = \App\Models\CicloEscolar::actual();

        return $this->hasMany(Colegiatura::class)
            ->where('ciclo_escolar_id', $cicloActual->id);
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($estudiante) {

            $year = now()->format('y');

            $ultimoEstudiante = self::whereYear('created_at', now()->year)
                ->whereNotNull('matricula')
                ->orderBy('id', 'desc')
                ->lockForUpdate()
                ->first();

            if ($ultimoEstudiante) {
                preg_match('/IRM\d{2}(\d{4})/', $ultimoEstudiante->matricula, $matches);
                $consecutivo = isset($matches[1]) ? intval($matches[1]) + 1 : 1;
            } else {
                $consecutivo = 1;
            }

            $consecutivoFormateado = str_pad($consecutivo, 4, '0', STR_PAD_LEFT);

            $estudiante->matricula = "IRM{$year}{$consecutivoFormateado}";
        });
    }
}

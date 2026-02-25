<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EstudiantesSeeder extends Seeder
{
    public function run(): void
    {
        $domicilios = DB::table('domicilios')->pluck('id')->toArray();

        for ($i = 1; $i <= 64; $i++) {

            $matricula = '3526' . str_pad($i, 6, '0', STR_PAD_LEFT);

            DB::table('estudiantes')->insert([
                'nombre' => "Alumno $i",
                'apellido_paterno' => 'Perez',
                'apellido_materno' => 'Lopez',
                'fecha_nacimiento' => now()->subYears(rand(6, 10))->format('Y-m-d'),
                'matricula' => $matricula,
                'curp' => "CURP" . str_pad($i, 3, '0', STR_PAD_LEFT),
                'genero' => $i % 2 === 0 ? 'Masculino' : 'Femenino',
                'entidad_nacimiento' => 'Estado',
                'tipo_sangre' => collect(['O+', 'A+', 'B+', 'AB+'])->random(),
                'domicilio_id' => $domicilios[array_rand($domicilios)],
                'grado_id' => rand(1, 6),
                'grupo_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
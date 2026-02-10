<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EstudiantesSeeder extends Seeder
{
    public function run(): void
    {
        $domicilios = DB::table('domicilios')->pluck('id')->toArray();

        $total = 130; // 63 + 67

        for ($i = 1; $i <= $total; $i++) {
            DB::table('estudiantes')->insert([
                'nombre' => "Alumno $i",
                'apellido_paterno' => 'Perez',
                'apellido_materno' => 'Lopez',
                'fecha_nacimiento' => '2016-01-01',
                'curp' => "CURP$i",
                'genero' => $i % 2 === 0 ? 'M' : 'F',
                'entidad_nacimiento' => 'Estado',
                'tipo_sangre' => 'O+',
                'domicilio_id' => $domicilios[array_rand($domicilios)],
                'grado_id' => (($i - 1) % 6) + 1,
                'grupo_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EstudiantesTutoresSeeder extends Seeder
{
    public function run(): void
    {
        $estudiantes = DB::table('estudiantes')->pluck('id')->toArray();
        $tutores = DB::table('tutores')->pluck('id')->toArray();

        for ($i = 0; $i < 64; $i++) {
            DB::table('estudiantes_tutores')->insert([
                'estudiante_id' => $estudiantes[$i],
                'tutor_id' => $tutores[$i],
                'parentesco' => 'Padre',
                'responsable_pagos' => true,
                'contacto_principal' => '2220000000',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}

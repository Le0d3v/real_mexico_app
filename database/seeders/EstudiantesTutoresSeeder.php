<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EstudiantesTutoresSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 67; $i++) {
            DB::table('estudiantes_tutores')->insert([
                'estudiante_id' => $i,
                'tutor_id' => 2,
                'parentesco' => 'Padre',
                'responsable_pagos' => true,
                'contacto_principal' => '2220000000',
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
    }
}

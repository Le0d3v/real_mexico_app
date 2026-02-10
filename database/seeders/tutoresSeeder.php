<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class tutoresSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tutores')->insert([
            'id' => 2, // user tutor
            'ocupacion' => 'Empleado',
            'nivel_estudios' => 'licenciatura',
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}

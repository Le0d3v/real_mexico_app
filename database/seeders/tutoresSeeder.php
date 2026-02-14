<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TutoresSeeder extends Seeder
{
    public function run(): void
    {
        $tutores = DB::table('users')
            ->where('rol', 'tutor')
            ->pluck('id');

        foreach ($tutores as $userId) {
            DB::table('tutores')->insert([
                'id' => $userId,
                'ocupacion' => 'Empleado',
                'nivel_estudios' => 'Licenciatura',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}

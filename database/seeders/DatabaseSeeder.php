<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
         $this->call([
            // 🔹 Catálogos base
            GradosSeeder::class,
            GruposSeeder::class,
            CiclosEscolaresSeeder::class,

            // 🔹 Datos generales
            DomiciliosSeeder::class,
            UsersSeeder::class,
            //TutoresSeeder::class,

            // 🔹 Núcleo académico
            // EstudiantesSeeder::class,
            // EstudiantesTutoresSeeder::class,

            // 🔹 Núcleo financiero
            // ColegiaturasSeeder::class,
            // PagosSeeder::class,
        ]);
    }
}

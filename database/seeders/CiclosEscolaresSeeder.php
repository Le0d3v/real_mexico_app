<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CiclosEscolaresSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('ciclos_escolares')->insert([
            [
                'nombre' => '2025 - 2026',
                'fecha_inicio' => '2025-08-01',
                'fecha_fin' => '2026-07-15',
                'activo' => false
            ],
            [
                'nombre' => '2026 - 2027',
                'fecha_inicio' => '2026-08-01',
                'fecha_fin' => '2027-07-15',
                'activo' => true
            ]
        ]);
    }
}

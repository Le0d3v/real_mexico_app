<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DomiciliosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i < 90; $i++) {
            DB::table('domicilios')->insert([
                'calle' => "Calle $i",
                'numero_exterior' => (string)$i,
                'colonia' => 'Centro',
                'localidad' => 'Ciudad',
                'municipio' => 'Municipio',
                'entidad' => 'Estado',
                'cp' => '72000',
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
    }
}

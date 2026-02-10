<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GradosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (['1', '2', '3', '4', '5', '6'] as $grado) {
            DB::table('grados')->insert([
                'grado' => $grado,
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
    }
}

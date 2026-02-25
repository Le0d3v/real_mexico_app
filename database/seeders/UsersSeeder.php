<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    public function run(): void
    {
        // Administrador único
        DB::table('users')->insert([
            'name' => 'Admin',
            'apellido_paterno' => 'Sistema',
            'apellido_materno' => 'Escolar',
            'email' => 'admin@escuela.com',
            'password' => Hash::make('password'),
            'curp' => 'ADMS900101HDFXXX01',
            'genero' => 'Masculino',
            'rol' => 'admin',
            'telefono' => '2221110000',
            'fecha_nacimiento' => '1990-01-01',
            'domicilio_id' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // 64 tutores
        for ($i = 1; $i <= 64; $i++) {
            DB::table('users')->insert([
                'name' => "Tutor$i",
                'apellido_paterno' => "Apellido$i",
                'apellido_materno' => "Familia$i",
                'email' => "tutor$i@escuela.com",
                'password' => Hash::make('password'),
                'curp' => "TUTR850505HDFX" . str_pad($i, 2, '0', STR_PAD_LEFT),
                'genero' => $i % 2 === 0 ? 'Masculino' : 'Femenino',
                'rol' => 'tutor',
                'telefono' => "222" . str_pad($i, 7, '0', STR_PAD_LEFT),
                'fecha_nacimiento' => '1985-05-05',
                'domicilio_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}

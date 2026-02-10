<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'name' => 'Administrador',
                'apellido_paterno' => 'Sistema',
                'apellido_materno' => 'Escolar',
                'email' => 'admin@escuela.com',
                'password' => Hash::make('password'),
                'curp' => 'ADMS900101HDFXXX01',
                'genero' => 'M',
                'rol' => 'admin',
                'telefono' => '2221110000',
                'fecha_nacimiento' => '1990-01-01',
                'domicilio_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Tutor Plataforma',
                'apellido_paterno' => 'Padre',
                'apellido_materno' => 'Familia',
                'email' => 'tutor@escuela.com',
                'password' => Hash::make('password'),
                'curp' => 'TUTR850505HDFXXX02',
                'genero' => 'F',
                'rol' => 'personal',
                'telefono' => '2222220000',
                'fecha_nacimiento' => '1985-05-05',
                'domicilio_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}


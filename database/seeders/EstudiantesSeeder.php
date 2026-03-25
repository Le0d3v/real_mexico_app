<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Estudiante;

class EstudiantesSeeder extends Seeder
{
    public function run(): void
    {
        $domicilios = DB::table('domicilios')->pluck('id')->toArray();

        $year = now()->format('y');

        DB::beginTransaction();

        try {

            // 🔒 Obtener el último consecutivo real
            $ultimoNumero = Estudiante::whereNotNull('matricula')
                ->selectRaw("
                    MAX(CAST(SUBSTRING_INDEX(matricula, '-', -1) AS UNSIGNED)) as max_num
                ")
                ->lockForUpdate()
                ->value('max_num');

            $consecutivo = $ultimoNumero ? $ultimoNumero + 1 : 1;

            for ($i = 1; $i <= 64; $i++) {

                $matricula = "IRM{$year}" . str_pad($consecutivo, 4, '0', STR_PAD_LEFT);

                DB::table('estudiantes')->insert([
                    'nombre' => "Alumno $i",
                    'apellido_paterno' => 'Perez',
                    'apellido_materno' => 'Lopez',
                    'fecha_nacimiento' => now()->subYears(rand(6, 10))->format('Y-m-d'),
                    'matricula' => $matricula,
                    'estado' => 'Activo',
                    'curp' => "CURP" . str_pad($i, 3, '0', STR_PAD_LEFT),
                    'genero' => $i % 2 === 0 ? 'Masculino' : 'Femenino',
                    'entidad_nacimiento' => 'Estado',
                    'tipo_sangre' => collect(['O+', 'A+', 'B+', 'AB+'])->random(),
                    'discapacidad' => "Ninguna",
                    'domicilio_id' => $domicilios[array_rand($domicilios)],
                    'grado_id' => rand(1, 6),
                    'grupo_id' => 1,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                $consecutivo++;
            }

            DB::commit();

        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
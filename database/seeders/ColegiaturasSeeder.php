<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ColegiaturasSeeder extends Seeder
{
    public function run(): void
    {
        $estudiantes = DB::table('estudiantes')->pluck('id');

        $meses = [
            1 => 'enero',
            2 => 'febrero',
            3 => 'marzo',
            4 => 'abril',
            5 => 'mayo',
            6 => 'junio',
            7 => 'julio',
            8 => 'agosto',
            9 => 'septiembre',
            10 => 'octubre',
            11 => 'noviembre',
            12 => 'diciembre',
        ];

        $anio = 2027;

        foreach ($estudiantes as $estudianteId) {

            foreach ($meses as $numeroMes => $nombreMes) {

                $fechaLimite = Carbon::create($anio, $numeroMes, 10); // Día 10 como fecha límite

                DB::table('colegiaturas')->insert([
                    'estudiante_id' => $estudianteId,
                    'ciclo_escolar_id' => 2,
                    'mes' => $nombreMes,
                    'anio' => $anio,
                    'monto' => 1500,
                    'estado' => 'pendiente',
                    'fecha_limite_pago' => $fechaLimite,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}

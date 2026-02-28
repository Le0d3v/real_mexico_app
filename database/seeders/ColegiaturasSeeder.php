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
            1 => 'Enero',
            2 => 'Febrero',
            3 => 'Marzo',
            4 => 'Abril',
            5 => 'Mayo',
            6 => 'Junio',
            7 => 'Julio',
            8 => 'Agosto',
            9 => 'Septiembre',
            10 => 'Octubre',
            11 => 'Noviembre',
            12 => 'Diciembre',
        ];

        $anio = 2026;
        $montoColegiatura = 1500;

        foreach ($estudiantes as $estudianteId) {

            foreach ($meses as $numeroMes => $nombreMes) {

                $fechaLimite = Carbon::create($anio, $numeroMes, 10);

                $esMesPagado = in_array($numeroMes, [1, 2]);

                DB::table('colegiaturas')->insert([
                    'estudiante_id' => $estudianteId,
                    'ciclo_escolar_id' => 2,
                    'mes' => $nombreMes,
                    'anio' => $anio,
                    'monto' => $montoColegiatura,
                    'pagado' => $esMesPagado ? $montoColegiatura : 0,
                    'estado' => $esMesPagado ? 'Pagado' : 'Pendiente',
                    'fecha_limite_pago' => $fechaLimite,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
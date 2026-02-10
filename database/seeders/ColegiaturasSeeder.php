<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ColegiaturasSeeder extends Seeder
{
    public function run(): void
    {
        $meses = [
            'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
            'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
        ];

        // 🔹 CICLO INACTIVO 2025–2026
        for ($estudiante = 1; $estudiante <= 63; $estudiante++) {
            foreach ($meses as $mes) {
                DB::table('colegiaturas')->insert([
                    'estudiante_id' => $estudiante,
                    'ciclo_escolar_id' => 1,
                    'mes' => $mes,
                    'anio' => 2026,
                    'monto' => 1500,
                    'estado' => 'pagado',
                    'fecha_limite_pago' => now()->startOfMonth(),
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
            }
        }

        // 🔹 CICLO ACTUAL 2026–2027
        for ($estudiante = 1; $estudiante <= 67; $estudiante++) {
            foreach ($meses as $index => $mes) {

                $estado = ($index === 0 && !in_array($estudiante, [1,2,3]))
                    ? 'pagado'
                    : 'pendiente';

                DB::table('colegiaturas')->insert([
                    'estudiante_id' => $estudiante,
                    'ciclo_escolar_id' => 2,
                    'mes' => $mes,
                    'anio' => 2027,
                    'monto' => 1500,
                    'estado' => $estado,
                    'fecha_limite_pago' => now()->startOfMonth(),
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
            }
        }
    }
}


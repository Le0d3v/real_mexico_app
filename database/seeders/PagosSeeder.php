<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class PagosSeeder extends Seeder
{
    public function run(): void
    {
        // Obtener colegiaturas de enero y febrero 2026
        $colegiaturas = DB::table('colegiaturas')
            ->whereIn('mes', ['enero', 'febrero'])
            ->where('anio', 2026)
            ->get();

        foreach ($colegiaturas as $colegiatura) {

            // Obtener tutor asociado al estudiante
            $tutor = DB::table('estudiantes_tutores')
                ->where('estudiante_id', $colegiatura->estudiante_id)
                ->first();

            if (!$tutor) {
                continue; // Evita error si no existe relación
            }

            // Marcar colegiatura como pagada
            DB::table('colegiaturas')
                ->where('id', $colegiatura->id)
                ->update([
                    'estado' => 'pagado',
                    'pagado' => $colegiatura->monto,
                    'updated_at' => now()
                ]);

            // Insertar pago
            DB::table('pagos')->insert([
                'colegiatura_id' => $colegiatura->id,
                'estudiante_id' => $colegiatura->estudiante_id,
                'tutor_id' => $tutor->tutor_id,
                'fecha_pago' => Carbon::create(2026, rand(1, 2), rand(1, 10)),
                'monto' => $colegiatura->monto,
                'metodo_pago' => collect(['transferencia', 'efectivo', 'tarjeta'])->random(),
                'referencia' => 'REF-' . strtoupper(Str::random(8)),
                'observaciones' => 'Pago correspondiente a colegiatura ' . $colegiatura->mes,
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
    }
}
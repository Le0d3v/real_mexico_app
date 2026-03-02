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
        // Obtener colegiaturas pagadas de Enero y Febrero 2026
        $colegiaturas = DB::table('colegiaturas')
            ->whereIn('mes', ['Enero', 'Febrero']) // Coincide con el seeder anterior
            ->where('anio', 2026)
            ->where('estado', 'Pagado')
            ->get();

        foreach ($colegiaturas as $colegiatura) {

            // Obtener tutor relacionado al estudiante
            $tutorRelacion = DB::table('estudiantes_tutores')
                ->where('estudiante_id', $colegiatura->estudiante_id)
                ->first();

            if (!$tutorRelacion) {
                continue; // Evita errores si no hay tutor asociado
            }

            // Determinar número del mes para fecha coherente
            $numeroMes = $colegiatura->mes === 'Enero' ? 1 : 2;

            // Generar fecha de pago antes o en fecha límite (día 1–10)
            $fechaPago = Carbon::create(
                2026,
                $numeroMes,
                rand(1, 10)
            );

            // Insertar registro histórico de pago
            DB::table('pagos')->insert([
                'colegiatura_id' => $colegiatura->id,
                'estudiante_id' => $colegiatura->estudiante_id,
                'tutor_id' => $tutorRelacion->tutor_id,
                'fecha_pago' => $fechaPago,
                'asunto' => 'Pago por Colegiatura',
                'monto' => $colegiatura->monto,
                'metodo_pago' => collect([
                    'Transferencia',
                    'Efectivo',
                    'Tarjeta'
                ])->random(),
                'referencia' => 'REF-' . strtoupper(Str::random(10)),
                'observaciones' => 'Pago correspondiente a colegiatura de ' . $colegiatura->mes . ' 2026',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
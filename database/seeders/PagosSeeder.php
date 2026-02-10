<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PagosSeeder extends Seeder
{
    public function run(): void
    {
        $colegiaturas = DB::table('colegiaturas')
            ->where('estado', 'pagado')
            ->get();

        foreach ($colegiaturas as $colegiatura) {
            DB::table('pagos')->insert([
                'colegiatura_id' => $colegiatura->id,
                'estudiante_id' => $colegiatura->estudiante_id,
                'tutor_id' => 2,
                'fecha_pago' => now(),
                'monto' => 1500,
                'metodo_pago' => 'transferencia',
                'referencia' => 'REF-' . strtoupper(Str::random(8)),
                'observaciones' => 'Pago registrado correctamente',
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
    }
}


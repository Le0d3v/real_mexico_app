<?php

namespace App\Console\Commands;

use App\Models\Colegiatura;
use Carbon\Carbon;
use Illuminate\Console\Command;

class ActualizarColegiaturasVencidas extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'colegiaturas:verificar-vencidas';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Actualiza las colegiaturas que han vencido';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $hoy = Carbon::today();

        Colegiatura::where('estado', 'pendiente')
            ->whereDate('fecha_limite_pago', '<', $hoy)
            ->update([
                'estado' => 'Vencida'
            ]);

        $this->info('Colegiaturas vencidas actualizadas');
    }
}

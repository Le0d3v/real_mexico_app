<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\CicloEscolarCollection;
use App\Models\CicloEscolar;
use App\Models\Estudiante;
use App\Models\Colegiatura;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class CicloEscolarController extends Controller
{
    public function get_ciclo_actual() {
        $ciclos = CicloEscolar::where("activo", 1)->get();
        return new CicloEscolarCollection($ciclos);
    }


    public function cerrar(Request $request)
    {
        try {

            DB::beginTransaction();

            /* ============================
            0. VALIDACIÓN
            ============================ */
            $request->validate([
                'fecha_inicio' => 'required|date',
                'fecha_fin' => 'required|date|after:fecha_inicio',
                'monto' => 'required|numeric|min:0'
            ]);

            /* ============================
            1. VALIDAR CICLO ACTIVO
            ============================ */
            $cicloActual = CicloEscolar::where('activo', 1)
                ->lockForUpdate()
                ->first();

            if (!$cicloActual) {
                throw new \Exception('No existe un ciclo activo');
            }

            if (CicloEscolar::where('activo', 1)->count() !== 1) {
                throw new \Exception('Inconsistencia: múltiples ciclos activos');
            }

            /* ============================
            2. MÉTRICAS
            ============================ */
            $egresados = Estudiante::where('grado_id', 6)
                ->where('estado', 'activo')
                ->count();

            $promovidos = Estudiante::whereBetween('grado_id', [1, 5])
                ->where('estado', 'activo')
                ->count();

            /* ============================
            3. CERRAR CICLO ACTUAL
            ============================ */
            $cicloActual->update([
                'activo' => 0,
                'fecha_fin' => now()
            ]);

            /* ============================
            4. CREAR NUEVO CICLO
            ============================ */
            $nuevoCiclo = CicloEscolar::create([
                'nombre' =>
                    date('Y', strtotime($request->fecha_inicio)) . "-" .
                    date('Y', strtotime($request->fecha_fin)),
                'fecha_inicio' => $request->fecha_inicio,
                'fecha_fin' => $request->fecha_fin,
                'activo' => 1
            ]);

            /* ============================
            5. EGRESAR
            ============================ */
            Estudiante::where('grado_id', 6)
                ->where('estado', 'activo')
                ->update(['estado' => 'egresado']);

            /* ============================
            6. PROMOVER
            ============================ */
            for ($grado = 5; $grado >= 1; $grado--) {
                Estudiante::where('grado_id', $grado)
                    ->where('estado', 'activo')
                    ->update([
                        'grado_id' => $grado + 1
                    ]);
            }

            /* ============================
            7. GENERAR COLEGIATURAS
            ============================ */
            $meses = [
                'Septiembre','Octubre','Noviembre','Diciembre',
                'Enero','Febrero','Marzo','Abril','Mayo','Junio'
            ];

            $alumnos = Estudiante::where('estado', 'activo')->get();

            $insertData = [];

            foreach ($alumnos as $alumno) {
                foreach ($meses as $index => $mes) {
                    $insertData[] = [
                        'estudiante_id' => $alumno->id,
                        'ciclo_escolar_id' => $nuevoCiclo->id,
                        'mes' => $mes,
                        'anio' => date('Y', strtotime($request->fecha_inicio)),
                        'monto' => $request->monto, // 🔥 dinámico
                        'estado' => 'pendiente',
                        'fecha_limite_pago' => Carbon::parse($request->fecha_inicio)
                            ->startOfMonth()
                            ->addMonths($index),
                        'created_at' => now(),
                        'updated_at' => now()
                    ];
                }
            }

            Colegiatura::insert($insertData);

            /* ============================
            8. LOG
            ============================ */
            Log::info('Cierre ciclo', [
                'nuevo_ciclo' => $nuevoCiclo->id,
                'egresados' => $egresados,
                'promovidos' => $promovidos,
                'monto' => $request->monto
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Ciclo cerrado correctamente',
                'data' => [
                    'ciclo_anterior' => $cicloActual->nombre,
                    'ciclo_nuevo' => $nuevoCiclo->nombre,
                    'alumnos_promovidos' => $promovidos,
                    'alumnos_egresados' => $egresados,
                    'colegiaturas_generadas' => count($insertData),
                    'monto_aplicado' => $request->monto
                ]
            ]);

        } catch (\Throwable $e) {

            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Error al cerrar ciclo',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}

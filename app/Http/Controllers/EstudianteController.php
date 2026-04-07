<?php

namespace App\Http\Controllers;

use App\Http\Requests\EstudianteRequest;
use App\Http\Resources\EstudianteCollection;
use App\Models\CicloEscolar;
use App\Models\Domicilio;
use App\Models\Estudiante;
use App\Models\Tutor;
use App\Models\User;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class EstudianteController extends Controller
{
    /**
     * Obtener Estudiantes
     */
    public function index()
    {
        return new EstudianteCollection(
            Estudiante::latest()->with([
                "tutores.user",
                'domicilio',
                'colegiaturasActuales'
            ])->get()
        );
    }

    // Crear un nuevo estudinte
    public function store(EstudianteRequest $request)
    {
        $maxIntentos = 5;
        $intentos = 0;
        $cicloEscolarActual = CicloEscolar::where("activo", 1)->first();
        Carbon::setLocale('es');

        do {
            try {

                DB::beginTransaction();

                /* ===============================
                DOMICILIO DEL ESTUDIANTE
                =============================== */

                $domicilioData = $request->input('address');
                $domicilio = Domicilio::create($domicilioData);

                /* ===============================
                DATOS DEL ESTUDIANTE
                =============================== */

                $studentData = $request->input('student');

                $estudiante = Estudiante::create([
                    'nombre' => $studentData['nombre'],
                    'apellido_paterno' => $studentData['apellido_paterno'],
                    'apellido_materno' => $studentData['apellido_materno'],
                    'fecha_nacimiento' => $studentData['fecha_nacimiento'],
                    'curp' => $studentData['curp'],
                    'genero' => $studentData['genero'],
                    'grado_id' => $studentData['grado'],
                    'grupo_id' => $studentData['grupo'],
                    'entidad_nacimiento' => $studentData['entidad_nacimiento'],
                    'estado' => "Activo",
                    'tipo_sangre' => $studentData['tipo_sangre'],
                    'lengua_materna' => $studentData['lengua_materna'],
                    'discapacidad' => $studentData['discapacidad'],
                    'domicilio_id' => $domicilio->id,
                ]);

                /* ===============================
                PROCESAR TUTOR
                =============================== */

                $tutorData = $request->input('tutor');

                if (!empty($tutorData['tutor_id'])) {

                    $tutor = Tutor::findOrFail($tutorData['tutor_id']);

                } else {

                    $newTutor = $tutorData['new_tutor'];

                    // Normalizar teléfono (solo dígitos)
                    $telefonoLimpio = preg_replace('/\D/', '', $newTutor['telefono']);

                    // Obtener últimos 4 dígitos (con padding por seguridad)
                    $ultimos4 = substr($telefonoLimpio, -4);
                    $ultimos4 = str_pad($ultimos4, 4, '0', STR_PAD_LEFT);

                    // Generar password: IRM-XXXX
                    $password = 'IRM-' . $ultimos4;

                    $tutorUser = User::create([
                        'name' => $newTutor['name'],
                        'apellido_paterno' => $newTutor['apellido_paterno'],
                        'apellido_materno' => $newTutor['apellido_materno'],
                        'fecha_nacimiento' => $newTutor['fecha_nacimiento'],
                        'curp' => $newTutor['curp'],
                        'genero' => $newTutor['genero'],
                        'email' => $newTutor['email'] ?? null,
                        'password' => Hash::make($password),
                        'telefono' => $newTutor['telefono'],
                        'rol' => 'tutor',
                        'domicilio_id' => $domicilio->id,
                    ]);

                    $tutor = $tutorUser->tutor()->create([
                        'ocupacion' => $newTutor['ocupacion'],
                        'nivel_estudios' => $newTutor['nivel_estudios'],
                    ]);
                }

                /* ===============================
                RELACIÓN ESTUDIANTE - TUTOR
                =============================== */

                $relacion = $tutorData['relacion'];

                $parentescoFinal = $relacion['parentesco'] === 'Otro'
                    ? ($relacion['parentesco_otro'] ?? null)
                    : $relacion['parentesco'];

                $estudiante->tutores()->attach($tutor->id, [
                    'parentesco' => $parentescoFinal,
                    'responsable_pagos' => $relacion['responsable_pagos'],
                    'contacto_principal' => $relacion['contacto_principal'],
                ]);

                /* ===============================
                GENERAR COLEGIATURAS
                =============================== */
                $montoColegiatura = $cicloEscolarActual->monto_colegiatura;

                $cicloEscolar = CicloEscolar::where("activo", 1)->firstOrFail();

                // Tomar fechas reales del ciclo
                $inicio = Carbon::parse($cicloEscolar->fecha_inicio)->startOfMonth();
                $fin = Carbon::parse($cicloEscolar->fecha_fin)->startOfMonth();

                // Crear periodo mensual
                $periodo = CarbonPeriod::create($inicio, '1 month', $fin);

                foreach ($periodo as $fecha) {

                    $mesNombre = $mesNombre = ucfirst($fecha->translatedFormat('F')); // Ej: Septiembre
                    $anio = $fecha->year;

                    $fechaLimite = $fecha->copy()->day(10);

                    // Evitar duplicados (robustez adicional)
                    $existe = DB::table('colegiaturas')
                        ->where('estudiante_id', $estudiante->id)
                        ->where('ciclo_escolar_id', $cicloEscolar->id)
                        ->where('mes', $mesNombre)
                        ->where('anio', $anio)
                        ->exists();

                    if (!$existe) {
                        DB::table('colegiaturas')->insert([
                            'estudiante_id' => $estudiante->id,
                            'ciclo_escolar_id' => $cicloEscolar->id,
                            'mes' => $mesNombre,
                            'anio' => $anio,
                            'monto' => $montoColegiatura,
                            'pagado' => 0,
                            'estado' => 'Pendiente',
                            'fecha_limite_pago' => $fechaLimite,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ]);
                    }
                }

                DB::commit();
                
                // Mensaje de éxito al usuario
                return response()->json([
                    'message' => 'Registro Exitoso.',
                    'estudiante' => $estudiante->load('domicilio', 'tutores.user')
                ], 201);

            } catch (\Illuminate\Database\QueryException $e) {

                DB::rollBack();

                // Reintento si es duplicado
                if ($e->errorInfo[1] == 1062) {
                    $intentos++;
                    if ($intentos >= $maxIntentos) {
                        return response()->json([
                            'message' => 'Error: no se pudo generar una matrícula única.'
                        ], 500);
                    }
                } else {
                    return response()->json([
                        'message' => 'Error al registrar el estudiante.',
                        'error' => $e->getMessage()
                    ], 500);
                }

            } catch (\Exception $e) {
                // Acciones en caso de erro
                
                DB::rollBack();
                return response()->json([
                    'message' => 'Error al registrar el estudiante.',
                    'error' => $e->getMessage()
                ], 500);
            }

        } while ($intentos < $maxIntentos);
    }

    /**
     * Actualizar información de un estudiante
     */
    public function update(Request $request, string $id)
    {
        DB::beginTransaction();

        try {

            // Obtener el estudiante
            $estudiante = Estudiante::with('domicilio', 'tutores')->findOrFail($id);

            /* ===============================
            Actualizar Domicilio
            =============================== */
            $estudiante->domicilio->update($request->input('address'));

            /* ===============================
            Actualizar Estudiante
            =============================== */
            $studentData = $request->input('student');

            $estudiante->update([
                'nombre' => $studentData['nombre'],
                'apellido_paterno' => $studentData['apellido_paterno'],
                'apellido_materno' => $studentData['apellido_materno'],
                'fecha_nacimiento' => $studentData['fecha_nacimiento'],
                'curp' => $studentData['curp'],
                'genero' => $studentData['genero'],
                'grado_id' => $studentData['grado'],
                'grupo_id' => $studentData['grupo'],
                'entidad_nacimiento' => $studentData['entidad_nacimiento'],
                'tipo_sangre' => $studentData['tipo_sangre'],
                'lengua_materna' => $studentData['lengua_materna'],
                'discapacidad' => $studentData['discapacidad'],
            ]);

            /* ===============================
            Actualizar Relación con Tutor
            =============================== */
            $tutorData = $request->input('tutor');

            if (!empty($tutorData['tutor_id'])) {

                $relacion = $tutorData['relacion'];

                $parentescoFinal = $relacion['parentesco'] === 'Otro'
                    ? ($relacion['parentesco_otro'] ?? null)
                    : $relacion['parentesco'];

                $estudiante->tutores()->sync([
                    $tutorData['tutor_id'] => [
                        'parentesco' => $parentescoFinal,
                        'responsable_pagos' => $relacion['responsable_pagos'],
                        'contacto_principal' => $relacion['contacto_principal'],
                    ]
                ]);
            }

            // Guardar cambios en BD
            DB::commit();

            // Mensjaes en JSON al usuario (Éxito)
            return response()->json([
                'message' => 'Estudiante actualizado correctamente.',
                'estudiante' => $estudiante->load('domicilio', 'tutores.user')
            ]);

        } catch (\Exception $e) {
            // Cancelar operación en BD
            DB::rollBack();

            // Mensajes en JSON al usuario (Error)
            return response()->json([
                'message' => 'Error al actualizar el estudiante.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

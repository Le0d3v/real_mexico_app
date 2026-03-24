<?php

namespace App\Http\Controllers;

use App\Http\Resources\EstudianteCollection;
use App\Models\CicloEscolar;
use App\Models\Domicilio;
use App\Models\Estudiante;
use App\Models\Tutor;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class EstudianteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new EstudianteCollection(
            Estudiante::latest()->with([
                "tutores.user",
                'domicilio',
                'colegiaturas'
            ])->get()
        );
    }

    public function store(Request $request)
    {
        DB::beginTransaction();

        try {

            /* ===============================
            DOMICILIO DEL ESTUDIANTE
            =============================== */

            $domicilioData = $request->input('address');

            $domicilio = Domicilio::create($domicilioData);


            /* ===============================
            CREAR ESTUDIANTE
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
                'tipo_sangre' => $studentData['tipo_sangre'],
                'lengua_materna' => $studentData['lengua_materna'],
                'discapacidad' => $studentData['discapacidad'],
                'domicilio_id' => $domicilio->id
            ]);

            /* ===============================
            PROCESAR TUTOR
            =============================== */

            $tutorData = $request->input('tutor');

            if (!empty($tutorData['tutor_id'])) {

                $tutor = Tutor::findOrFail($tutorData['tutor_id']);

            } else {

                $newTutor = $tutorData['new_tutor'];

                $tutorUser = User::create([
                    'name' => $newTutor['name'],
                    'apellido_paterno' => $newTutor['apellido_paterno'],
                    'apellido_materno' => $newTutor['apellido_materno'],
                    'fecha_nacimiento' => $newTutor['fecha_nacimiento'],
                    'curp' => $newTutor['curp'],
                    'genero' => $newTutor['genero'],
                    'email' => $newTutor['email'] ?? null,
                    'password' => Hash::make($newTutor['curp']),
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
            GENERAR COLEGIATURAS DEL ESTUDIANTE
            =============================== */

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

            $anio = now()->year; 
            $montoColegiatura = 1500; 
            $cicloEscolar = CicloEscolar::where("activo", 1)->firstOrFail();

            foreach ($meses as $numeroMes => $nombreMes) {

                $fechaLimite = Carbon::create($anio, $numeroMes, 10);

                DB::table('colegiaturas')->insert([
                    'estudiante_id' => $estudiante->id,
                    'ciclo_escolar_id' => $cicloEscolar->id,
                    'mes' => $nombreMes,
                    'anio' => $anio,
                    'monto' => $montoColegiatura,
                    'pagado' => 0,
                    'estado' => 'Pendiente',
                    'fecha_limite_pago' => $fechaLimite,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }


            DB::commit();

            return response()->json([
                'message' => 'Registro Exitoso.',
                'estudiante' => $estudiante->load('domicilio', 'tutores.user')
            ], 201);

        } catch (\Exception $e) {

            DB::rollBack();

            return response()->json([
                'message' => 'Error al registrar el estudiante.',
                'error' => $e->getMessage()
            ], 500);
        }

        
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        DB::beginTransaction();

        try {

            $estudiante = Estudiante::with('domicilio', 'tutores')->findOrFail($id);

            /* ===============================
            UPDATE DOMICILIO
            =============================== */
            $estudiante->domicilio->update($request->input('address'));

            /* ===============================
            UPDATE ESTUDIANTE
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
            UPDATE RELACIÓN TUTOR
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

            DB::commit();

            return response()->json([
                'message' => 'Estudiante actualizado correctamente.',
                'estudiante' => $estudiante->load('domicilio', 'tutores.user')
            ]);

        } catch (\Exception $e) {

            DB::rollBack();

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

<?php

namespace App\Http\Controllers;

use App\Http\Requests\TutorRequest;
use App\Http\Resources\UserCollection;
use App\Models\Domicilio;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class TutorController extends Controller
{
    /**
     * Obtener tutores de BD
     */
    public function index()
    {
       return new UserCollection( User::where("rol", "tutor")->with([
            "domicilio", 
            'tutor.estudiantes'
        ])->get());
    }

    /**
     * Registrar un nuevo tutor en BD
     */
    public function store(TutorRequest $request)
    {
        DB::beginTransaction();

        try {
            // Obtener datos de domicilio
            $domicilioData = $request->only([
                'calle',
                'numero_exterior',
                'numero_interior',
                'colonia',
                'localidad',
                'municipio',
                'entidad',
                'cp'
            ]);

            // Crear domicilio
            $domicilio = Domicilio::create($domicilioData);

            // Crear usuario
            $user = User::create([
                'name' => $request->name,
                'apellido_paterno' => $request->apellido_paterno,
                'apellido_materno' => $request->apellido_materno,
                'fecha_nacimiento' => $request->fecha_nacimiento,
                'curp' => $request->curp,
                'genero' => $request->genero,
                'email' => $request->email,
                'password' => Hash::make($request->curp),
                'telefono' => $request->telefono,
                'domicilio_id' => $domicilio->id,
            ]);

            // Crear datos de turor
            $tutor = $user->tutor()->create([
                'ocupacion' => $request->ocupacion,
                'nivel_estudios' => $request->nivel_estudios,
            ]);

            // Sincronizar estudiantes con el tutor
            if ($request->filled('estudiantes')) {

                $syncData = [];

                foreach ($request->estudiantes as $estudiante) {

                    $parentescoFinal = $estudiante['parentesco'] === 'Otro'
                        ? ($estudiante['parentesco_otro'] ?? null)
                        : $estudiante['parentesco'];

                    $syncData[$estudiante['id']] = [
                        'parentesco' => $parentescoFinal,
                        'responsable_pagos' => $estudiante['responsable_pagos'],
                        'contacto_principal' => $estudiante['contacto_principal'],
                    ];
                }

                $tutor->estudiantes()->sync($syncData);
            }

            // Guardar en BD
            DB::commit();

            // Mensajes al usuario
            return response()->json([
                'message' => 'Tutor creado correctamente.',
                'tutor' => $tutor->load('user.domicilio', 'estudiantes')
            ], 201);

        } catch (\Exception $e) { // caso de error

            // Cancelar proceso
            DB::rollBack();

            // Mensajes al susuario
            return response()->json([
                'message' => 'Error al crear el tutor.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $tutor = User::find($id);

        try {
            $tutor->delete();
            return response()->json([
                'message' => 'Tutor eliminado exitosamente.'
            ]);

        } catch (\Exception $e) {

            return response()->json([
                'message' => 'Error al eliminar la publicación.',
                "error" => $e->getMessage()
            ], 500);
        }
    }
}

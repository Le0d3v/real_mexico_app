<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class AuthController extends Controller
{
    public function login(LoginRequest $request): JsonResponse
    {
        $request->authenticate();

        $user = User::where('telefono', $request->phone)->first();

        $user = $this->loadUserRelations($user);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => new UserResource($user), // 🔥 IMPORTANTE
            'token' => $token,
            'token_type' => 'Bearer'
        ]);
    }

    // Metodo para cerrar la sesión de un usuario
    public function logout(Request $request): JsonResponse
    {
        // Eliminar Bearer Token
        $request->user()->currentAccessToken()->delete();

        // Respuesta json para el cliente
        return response()->json([
            'message' => 'Sesión cerrada correctamente'
        ]);
    }
   
    // Metodopara obtener los datos del usuario autenticado
    public function me(Request $request): JsonResponse
    {
        $user = $this->loadUserRelations($request->user());

        return response()->json(
            new UserResource($user)
        );
    }

    
    private function loadUserRelations($user)
    {
        if ($user->rol === 'tutor') {
            return $user->load([
                'domicilio',

                // 🔥 RELACIÓN BASE
                'tutor',

                

                // 🔥 ESTUDIANTES
                'tutor.estudiantes',
                'tutor.estudiantes.grado',
                'tutor.estudiantes.grupo',
                'tutor.estudiantes.domicilio',

                // 🔥 COLEGIATURAS
                'tutor.estudiantes.colegiaturasActuales',

                // 🔥 RELACIÓN INVERSA
                'tutor.estudiantes.tutores.user',

                // 🔥 PAGOS DEL TUTOR
                'tutor.pagos',
                'tutor.pagos.colegiatura',
                'tutor.pagos.estudiante',
            ]);
        }

        return $user->load(['domicilio']);
    }
}

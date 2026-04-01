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
    // Metodo para la autenticación de un usuario 
    public function login(LoginRequest $request): JsonResponse
    {
        // Autenticar usuario con datos provenientes del request
        $request->authenticate();

        // Obtener el usuario con sus datos relacionados a otras tablas
        $user = User::with([
            'domicilio',
            'tutor'
        ])->where('telefono', $request->phone)->first();

        // Generar token
        $token = $user->createToken('auth_token')->plainTextToken;

        // Retornar usuario en json para ser procesado en el front
        return response()->json([
            'user' => $user,
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
        // Generar objeto user con todos sus datos 
        $user = $request->user()->load([
            'domicilio',
            'tutor.estudiantes.domicilio',
            'tutor.estudiantes.colegiaturas',
            'tutor.estudiantes.grado',
            'tutor.estudiantes.grupo'
        ]);

        // Retornar el usuario al backend
        return response()->json(
            new UserResource($user)
        );
    }

    

}

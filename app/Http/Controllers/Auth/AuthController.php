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

        $user = User::with([
            'domicilio',
            'tutor'
        ])->where('email', $request->email)->first();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
            'token_type' => 'Bearer'
        ]);
    }

   
    public function me(Request $request): JsonResponse
    {
        $user = $request->user()->load([
            'domicilio',
            'tutor.estudiantes.domicilio',
            'tutor.estudiantes.colegiaturas',
            'tutor.estudiantes.grado',
            'tutor.estudiantes.grupo'
        ]);

        return response()->json(
            new UserResource($user)
        );
    }

    

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Sesión cerrada correctamente'
        ]);
    }
}

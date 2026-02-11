<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;


class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): Response
    {
        $request->authenticate();

        $request->session()->regenerate();

        $user = $request->user();

        // Si la petición viene de una app móvil (Accept: application/json)
        if ($request->expectsJson()) {

            // Opcional: eliminar tokens anteriores
            $user->tokens()->delete();

            return response()->json([
                'user' => $user,
                'token' => $user->createToken('mobile')->plainTextToken,
            ]);
        }

        // SPA (React)
        return response()->json([
            'user' => $user
        ]);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request)
    {
        // Si tiene token (Flutter)
        if ($request->user()?->currentAccessToken()) {
            $request->user()->currentAccessToken()->delete();
        }

        // Cerrar sesión SPA
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Sesión cerrada'
        ]);
    }
}

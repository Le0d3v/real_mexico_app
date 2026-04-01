<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Http\Resources\UserCollection;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // Obtenr usuarios
    public function index()
    {
        return new UserCollection(
            User::with([
                'domicilio',
                'tutor.estudiantes'
            ])->get()
        );
    }

    // Actualizar información de un usuario
    public function update(UserRequest $request, $id) {
        // Obtener usuario
        $user = User::findOrFail($id);

        // Actualizar informacion
        $user->update($request->validated());

        // Mensajes al usuario
        return response()->json([
            "message" => "Usuario actualizado correctamente",
            "user" => $user
        ], 200);
    }
}

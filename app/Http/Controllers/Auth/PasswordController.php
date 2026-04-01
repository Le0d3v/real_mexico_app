<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\PasswordRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class PasswordController extends Controller
{
    // Metodo para actualizar contraseña 
    public function update(PasswordRequest $request, $id) {
        // Validar datos del request
        $data = $request->validated(); 

        // Localzar usuario
        $user = User::find($id);

        // Validar que el password del usuario es el mismo que el del request
        if (!Hash::check($data["current_password"], $user->password)) {
            // Enviar mensaje al cliente en caso de error
            return response([
                "message" => "Error de validación",
                "errors" => [
                    "current_password" => ["La contraseña actual es incorrecta"]
                ]
            ], 422);
        }

        // Cambiar password y guardar cambios
        $user->password = $data["password"];
        $user->save();

        // Retornar respuesta json al usuario
        return [
            "status" => 200,
            "message" => "Contraseña Actualizada Correctamente"
        ];
    }
}

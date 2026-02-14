<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\PasswordRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class PasswordController extends Controller
{
    public function update(PasswordRequest $request, $id) {
        $data = $request->validated(); 

        $user = User::find($id);

        if (!Hash::check($data["current_password"], $user->password)) {
            return response([
                "message" => "Error de validación",
                "errors" => [
                    "current_password" => ["La contraseña actual es incorrecta"]
                ]
            ], 422);
        }

        $user->password = $data["password"];
        $user->save();

        return [
            "status" => 200,
            "message" => "Contraseña Actualizada Correctamente"
        ];
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\DomicilioRequest;
use App\Models\Domicilio;
use App\Models\User;
use Illuminate\Http\Request;

class DomicilioController extends Controller
{

    /**
     * Actualizar un domicilio en BD
     */
    public function update(DomicilioRequest $request, string $id)
    {
        // Obtener el usuario perteneciente al domicillio
        $user = User::with('domicilio')->findOrFail($id);

        // Validaciones
        if ($user->domicilio) {
            $user->domicilio->update($request->validated());
        } else {
            $user->domicilio()->create($request->validated());
        }

        // Mensajes al usuario en JSON
        return response()->json([
            "message" => "Domicilio actualizado correctamente",
            "domicilio" => $user->fresh()->domicilio
        ], 200);
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Http\Resources\UserCollection;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return new UserCollection(
            User::with([
                'domicilio',
                'tutor.estudiantes'
            ])->get()
        );
    }

    public function update(UserRequest $request, $id) {
        $user = User::findOrFail($id);

        $user->update($request->validated());

        return response()->json([
            "message" => "Usuario actualizado correctamente",
            "user" => $user
        ], 200);
    }
}

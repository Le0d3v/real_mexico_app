<?php

namespace App\Http\Controllers;

use App\Http\Requests\DomicilioRequest;
use App\Models\Domicilio;
use App\Models\User;
use Illuminate\Http\Request;

class DomicilioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(DomicilioRequest $request, string $id)
    {
        $user = User::with('domicilio')->findOrFail($id);

        if ($user->domicilio) {
            $user->domicilio->update($request->validated());
        } else {
            $user->domicilio()->create($request->validated());
        }

        return response()->json([
            "message" => "Domicilio actualizado correctamente",
            "domicilio" => $user->fresh()->domicilio
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

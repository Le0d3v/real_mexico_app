<?php

namespace App\Http\Controllers;

use App\Http\Resources\PagoCollection;
use App\Models\Pago;
use Illuminate\Http\Request;

class PagoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new PagoCollection(
            Pago::with([
                'colegiatura',
                'estudiante',
                'tutor', // ← usuario + perfil tutor
            ])->get()
        );
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

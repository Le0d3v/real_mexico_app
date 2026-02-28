<?php

namespace App\Http\Controllers;

use App\Http\Resources\CicloEscolarCollection;
use App\Http\Resources\CicloEscolarResource;
use App\Models\CicloEscolar;
use Illuminate\Http\Request;

class CicloEscolarController extends Controller
{
    public function get_ciclo_actual() {
        $ciclos = CicloEscolar::where("activo", 1)->get();
        return new CicloEscolarCollection($ciclos);
    }
}

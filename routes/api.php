<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\CicloEscolarController;
use App\Http\Controllers\ColegiaturaController;
use App\Http\Controllers\DomicilioController;
use App\Http\Controllers\EstudianteController;
use App\Http\Controllers\PagoController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\TutorController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/auth-login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']); 
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::put("/user/update/{id}", [UserController::class, "update"]);
    Route::put("/update-password/{id}", [PasswordController::class, "update"]);
    Route::apiResource("/domicilio", DomicilioController::class);
    Route::apiResource("/tutores", TutorController::class);
    Route::apiResource("/pagos", PagoController::class);
    Route::apiResource("/colegiaturas", ColegiaturaController::class);
    Route::post("/registrar-pago", [PagoController::class, "registrarPago"]);
    });
    
    Route::apiResource("/estudiantes", EstudianteController::class); 
Route::get("/ciclo-actual", [CicloEscolarController::class, "get_ciclo_actual"]);
Route::apiResource('/posts', PostController::class);
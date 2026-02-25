<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\DomicilioController;
use App\Http\Controllers\EstudianteController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\TutorController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/auth-login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::put("/update-password/{id}", [PasswordController::class, "update"]);
    Route::put("/user/update/{id}", [UserController::class, "update"]);
    Route::apiResource("/domicilio", DomicilioController::class);
    Route::apiResource("/tutores", TutorController::class);
    });
    
    Route::apiResource("/estudiantes", EstudianteController::class);
Route::apiResource('/posts', PostController::class);
Route::get('/users', [UserController::class, 'index']);
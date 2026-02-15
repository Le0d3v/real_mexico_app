<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::put("/update-password/{id}", [PasswordController::class, "update"]);
    Route::put("/update-user/{id}", [UserController::class, "update"]);
});

Route::apiResource('/posts', PostController::class);
Route::get('/users', [UserController::class, 'index']);

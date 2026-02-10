<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('estudiantes_tutores', function (Blueprint $table) {
            $table->id();
            $table->foreignId('estudiante_id')->constrained("estudiantes")->cascadeOnDelete();
            $table->foreignId('tutor_id')->constrained("tutores")->cascadeOnDelete();
            $table->string('parentesco', 45);
            $table->boolean('responsable_pagos')->default(false);
            $table->string('contacto_principal', 45);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('estudiantes_tutores', function (Blueprint $table) {
            $table->dropForeign(['estudiante_id']);
            $table->dropForeign(['tutor_id']);
        });

        Schema::dropIfExists('estudiantes_tutores');
    }
};

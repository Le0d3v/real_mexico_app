<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use function Laravel\Prompts\table;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('estudiantes', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 45);
            $table->string('apellido_paterno', 45);
            $table->string('apellido_materno', 45);
            $table->date('fecha_nacimiento');
            $table->char('curp', 18)->unique();
            $table->string('matricula', 20)->unique();
            $table->enum('genero', ['Masculino', 'Femenino']);
            $table->string('entidad_nacimiento', 45);
            $table->enum('estado', ['Activo', 'Baja Temporal', 'Egresado']);
            $table->enum('tipo_sangre', ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']);
            $table->string('lengua_materna', 45)->nullable();
            $table->string('discapacidad', 45)->nullable();

            $table->foreignId('domicilio_id')->constrained()->cascadeOnDelete();
            $table->foreignId('grado_id')->constrained();
            $table->foreignId('grupo_id')->constrained();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('estudiantes');
    }
};

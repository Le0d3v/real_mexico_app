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
         Schema::table('users', function (Blueprint $table) {
            $table->string('apellido_paterno', 45)->after('name');
            $table->string('apellido_materno', 45)->after('apellido_paterno');
            $table->date('fecha_nacimiento')->nullable();
            $table->char('curp', 18)->unique();
            $table->enum('genero', ['Masculino', 'Femenino']);
            $table->string('telefono', 15)->nullable();
            $table->enum('rol', ['admin', 'tutor'])->default('tutor');
            $table->foreignId('domicilio_id')->nullable()
                  ->constrained('domicilios')
                  ->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['domicilio_id']);
            $table->dropColumn([
                'apellido_paterno',
                'apellido_materno',
                'fecha_nacimiento',
                'curp',
                'genero',
                'telefono',
                'rol',
                'domicilio_id'
            ]);
        });
    }
};

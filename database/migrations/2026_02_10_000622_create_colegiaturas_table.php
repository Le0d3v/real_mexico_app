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
        Schema::create('colegiaturas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('estudiante_id')->constrained("estudiantes")->cascadeOnDelete();
            $table->foreignId('ciclo_escolar_id')->constrained("ciclos_escolares");
            $table->string('mes', 45);
            $table->string('anio', 4);
            $table->integer('monto');
            $table->integer('pagado')->nullable();
            $table->string('estado', 45);
            $table->date('fecha_limite_pago');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('colegiaturas', function (Blueprint $table) {
            $table->dropForeign(['estudiante_id']);
            $table->dropForeign(['ciclo_escolar_id']);
        });
        Schema::dropIfExists('colegiaturas');
    }
};

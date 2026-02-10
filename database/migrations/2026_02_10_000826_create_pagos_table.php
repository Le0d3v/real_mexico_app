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
        Schema::create('pagos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('colegiatura_id')->constrained("colegiaturas")->cascadeOnDelete();
            $table->foreignId('tutor_id')->constrained("tutores");
            $table->foreignId('estudiante_id')->constrained("estudiantes");
            $table->dateTime('fecha_pago');
            $table->integer('monto');
            $table->enum('metodo_pago', ['efectivo','transferencia','tarjeta']);
            $table->string('referencia', 45)->nullable();
            $table->text('observaciones')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pagos', function (Blueprint $table) {
            $table->dropForeign(['estudiante_id', 'tutor_id', 'colegiatura_id']);
        });
        Schema::dropIfExists('pagos');
    }
};

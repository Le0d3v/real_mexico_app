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
        Schema::create('tutores', function (Blueprint $table) {
            $table->id();
            $table->string('ocupacion', 45);
            $table->enum('nivel_estudios', [
                'primaria', 'secundaria', 'preparatoria', 'licenciatura', 'posgrado'
            ]);
            $table->foreign('id')
                ->references('id')
                ->on('users')
                ->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tutores', function (Blueprint $table) {
            $table->dropForeign(['id']);
        });
        Schema::dropIfExists('tutores');
    }
};

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
        Schema::table('trackers', function (Blueprint $table) {
            $table->dropColumn(['break_in', 'break_out', 'total_break']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('trackers', function (Blueprint $table) {
            $table->dateTime('break_in')->nullable();
            $table->dateTime('break_out')->nullable();
            $table->decimal('total_break', 8, 2)->nullable();
        });
    }
};

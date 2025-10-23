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
        Schema::create('trackers', function (Blueprint $table) {
            $table->id();
            
            $table->dateTime('time_in');
            $table->dateTime('time_out')->nullable();
            $table->dateTime('break_in')->nullable();
            $table->dateTime('break_out')->nullable();

            $table->decimal('total_hours', 8, 2)->nullable();
            $table->decimal('total_break', 8, 2)->nullable();

            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('store_id')->nullable();
            $table->unsignedBigInteger('company_id')->nullable();

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->nullOnDelete();
            
            $table->foreign('store_id')
                ->references('id')
                ->on('stores')
                ->nullOnDelete();

            $table->foreign('company_id')
                ->references('id')
                ->on('companies')
                ->nullOnDelete();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trackers');
    }
};

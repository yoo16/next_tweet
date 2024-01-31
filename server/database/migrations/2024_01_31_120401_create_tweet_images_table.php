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
        Schema::create('tweet_images', function (Blueprint $table) {
            $table->id();
            $table->dateTime('created_at', $precision = 0);
            $table->dateTime('updated_at', $precision = 0);
            $table->unsignedBigInteger('tweet_id');
            $table->text('file');
            $table->foreign('tweet_id')->references('id')->on('tweets');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tweet_images');
    }
};

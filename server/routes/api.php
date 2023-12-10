<?php

use App\Http\Controllers\Api\TweetController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/tweet/get', [TweetController::class, 'get']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

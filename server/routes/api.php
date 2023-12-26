<?php

use App\Http\Controllers\Api\TweetController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

Route::middleware('auth:sanctum')->get('/tweet/get', [TweetController::class, 'get']);
Route::middleware('auth:sanctum')->post('/tweet/add', [TweetController::class, 'add']);

Route::post('/auth', [AuthController::class, 'auth']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

<?php

use App\Http\Controllers\Api\TweetController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\RegistUserController;

Route::middleware('auth:sanctum')
    ->prefix('/tweet')
    ->group(function () {
        Route::get('get', [TweetController::class, 'get']);
        Route::post('add', [TweetController::class, 'add']);
    });

Route::post('/auth', [AuthController::class, 'auth']);
Route::post('/regist/store', [RegistUserController::class, 'store']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

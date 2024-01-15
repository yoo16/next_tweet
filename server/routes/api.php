<?php

use App\Http\Controllers\Api\TweetController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\RegistUserController;

Route::middleware('auth:sanctum')
    ->prefix('/tweet')
    ->group(function () {
        Route::get('get', [TweetController::class, 'get']);
        Route::post('add', [TweetController::class, 'add']);
    });

Route::post('/user/{id}', [UserController::class, 'get']);
Route::post('/auth', [AuthController::class, 'auth']);
Route::post('/regist/store', [RegistUserController::class, 'store']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Socialite
Route::get('/login/{provider}', [AuthController::class, 'getOAuthURL'])
    ->where('provider', 'github')->name('oauth.request');

Route::post('/auth/{provider}/callback', [AuthController::class, 'callbackOAuthURL'])
    ->where('provider', 'github')->name('oauth.callback');

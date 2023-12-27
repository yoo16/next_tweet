<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegistUserRequest;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class RegistUserController extends Controller
{
    public function store(RegistUserRequest $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        if ($user) {
            return response()->json([
                'access_token' => User::getToken($request),
                'token_type' => 'Bearer',
            ]);
        }
        return response()->json(['error' => 'Auth error'], 401);
    }
}

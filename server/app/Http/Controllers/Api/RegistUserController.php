<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegistUserRequest;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class RegistUserController extends Controller
{
    public function store(RegistUserRequest $request)
    {
        Log::debug("RegistUser: store()");

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        if ($user) {
            $user->remember_token = $user->createToken('auth_token')->plainTextToken;;
            // $user->save();
            return response()->json([
                'access_token' => $user->remember_token,
                'token_type' => 'Bearer',
            ]);
        } else {
            return response()->json(['error' => ['message' => 'invalid auth']]);
        }
    }
}

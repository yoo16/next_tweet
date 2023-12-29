<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Exception;

class AuthController extends Controller
{
    public function auth(Request $request)
    {
        try {
            if ($token = User::auth($request)) {
                $data = ['access_token' => $token, 'token_type' => 'Bearer',];
            } else {
                $data = ['error' => ['auth' => 'email or password error.']];
            }
            return response()->json($data);
        } catch (Exception $e) {
            return response()->json(['error' => ['auth' => 'Server error']], 500);
        }
    }
}

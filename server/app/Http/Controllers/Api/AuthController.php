<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function auth(Request $request)
    {
        Log::info('auth()');
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

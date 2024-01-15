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

use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    public function getOAuthURL(string $provider)
    {
        $redirectUrl = Socialite::driver($provider)->redirect()->getTargetUrl();
        return response()->json([
            'redirect_url' => $redirectUrl,
        ]);
    }

    public function callbackOAuthURL(string $provider)
    {
        try {
            $providerUser = Socialite::driver($provider)->user();
        } catch (Exception $e) {
            abort(500, $e->getMessage());
        }
        $authUser = User::socialFindOrCreate($providerUser, $provider);
        Auth::login($authUser, true);
        return $authUser;
    }

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

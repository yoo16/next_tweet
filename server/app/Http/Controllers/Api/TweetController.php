<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\TweetRequest;
use App\Models\Tweet;
use Illuminate\Support\Facades\Log;

class TweetController extends Controller
{
    function get()
    {
        $tweets = Tweet::with('user')
            ->orderBy('created_at', 'desc')
            ->limit(25)
            ->get();
        return response()->json($tweets);
    }

    function add(TweetRequest $request)
    {
        $user = $request->user();
        // Log::debug($request);
        // Log::debug($user);
        if ($user && $request->user_id == $user->id) {
            $tweet = Tweet::create($request->all());
            $tweet->user = $user;
            return response()->json($tweet);
        } else {
            return response()->json(['error' => 'invalid tweet'], 401);
        }
    }
}

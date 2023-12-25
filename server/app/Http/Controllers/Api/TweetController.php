<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\TweetRequest;
use App\Models\Tweet;
use Illuminate\Http\Request;

class TweetController extends Controller
{
    function get()
    {
        $tweets = Tweet::orderBy('created_at', 'desc')->limit(25)->get();
        return response()->json($tweets);
    }

    function add(TweetRequest $request)
    {
        $tweet = Tweet::create($request->all());
        return response()->json($tweet);
    }
}

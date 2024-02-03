<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\TweetRequest;
use App\Models\Tweet;
use App\Models\TweetImage;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TweetController extends Controller
{
    function find(int $id)
    {
        $tweet = Tweet::with('user')
            ->with('image')
            ->find($id);
        return response()->json($tweet);
    }

    function get()
    {
        $tweets = Tweet::with('user')
            ->with('image')
            ->orderBy('created_at', 'desc')
            ->limit(25)
            ->get();
        return response()->json($tweets);
    }

    function getByUserId(int $user_id)
    {
        $user = User::find($user_id);
        $tweets = Tweet::with('user')
            ->with('image')
            ->where('user_id', $user_id)
            ->orderBy('created_at', 'desc')
            ->limit(25)
            ->get();
        $data = compact("tweets", "user");
        return response()->json($data);
    }

    function add(TweetRequest $request)
    {
        $user = $request->user();
        if ($user && $request->user_id == $user->id) {
            $tweet = Tweet::create($request->all());
            if ($image = $request->file('image')) {
                $path = $image->store('images', 'public');
                TweetImage::create(['file' => $path, 'tweet_id' => $tweet->id]);
            }
            return $this->find($tweet->id);
        } else {
            return response()->json(['error' => 'invalid tweet'], 401);
        }
    }

    function uploadImage(Request $request)
    {
        $image = $request->file('image');
        if ($image && $request->tweet_id) {
            Log::debug($request->tweet_id);
            Log::debug($image);
            $path = $image->store('images', 'public');
            $tweet_image = TweetImage::create(['file' => $path, 'tweet_id' => $request->tweet_id]);
            return response()->json(['tweet_image' => $tweet_image], 201);
        }
    }
}

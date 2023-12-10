<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tweet;
use Illuminate\Http\Request;

class TweetController extends Controller
{
    function get() : String {
        $tweets = Tweet::get();
        return response()->json($tweets);
    }
}

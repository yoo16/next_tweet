<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    function get(Request $request, int $id) {
        $user = User::fetch($id);
        return response()->json($user);
    }
}

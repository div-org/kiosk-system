<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;

class UserController extends Controller
{
    // GET /api/users
    public function index()
    {
        $users = User::paginate(15);

        return UserResource::collection($users);
    }

    // POST /api/users
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'firstname'     => 'required|string|max:255',
            'lastname'      => 'required|string|max:255',
            'email'         => 'required|email|unique:users,email',
            'password'      => 'required|string|min:8|confirmed'
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->messages(),
                'error' => 422,
            ], 422);
        }

        $user = User::create([
            'firstname' => $request->firstname,
            'lastname'  => $request->lastname,
            'email'     => $request->email,
            'password'  => bcrypt($request->password),
            'role_id'   => 1
        ]);

        return response()->json([
            'message' => 'User created successfully',
            'data' => new UserResource($user),
            'error' => 0
        ], 200);
    }

    // GET /api/users/{user}
    public function show(User $user)
    {
        return new UserResource($user);
    }

    // PUT/PATCH /api/users/{user}
    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'name'     => 'sometimes|required|string|max:255',
            'email'    => 'sometimes|required|email|unique:users,email,' . $user->id,
            'password' => 'sometimes|required|string|min:8|confirmed'
        ]);

        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }

        $user->update($data);

        return new UserResource($user);
    }

    // DELETE /api/users/{user}
    public function destroy(User $user)
    {
        $user->delete();

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }

    public function loginPost(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'    => 'required|email',
            'password' => 'required|string|min:8'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->messages(),
                'error'   => $validator->messages()
            ], 422);
        }

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Invalid credentials',
                'error'   => ['email' => ['The provided credentials are incorrect.']]
            ], 401);
        }

        $user = Auth::user();

        // Generate token (Laravel Sanctum)
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'data' => array_merge(
                (new UserResource($user))->toArray(request()),
                ['token' => $token]
            ),
            'error' => 0
        ]);
    }

    public function loginGet($token)
    {
        // ✅ If you’re using Sanctum tokens
        $accessToken = PersonalAccessToken::findToken($token);

        if (!$accessToken) {
            return response()->json([
                'message' => 'Invalid token',
                'error' => 1
            ], 401);
        }

        $user = $accessToken->tokenable;

        $user->load('company');
        $user->load('role');

        return response()->json([
            'message' => 'Token valid',
            'data' => array_merge(
                (new UserResource($user))->toArray(request()),
                [
                    'token' => $token,
                    'company' => $user->company,
                    'role' => $user->role
                ]
            ),
            'error' => 0
        ]);
    }
}

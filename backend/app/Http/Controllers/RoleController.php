<?php

namespace App\Http\Controllers;

use App\Http\Resources\RoleResource;
use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    // GET /api/roles
    public function index()
    {
        $roles = Role::paginate(15);

        return (RoleResource::collection($roles))
            ->additional([
                'error' => 0,
                'message' => ''
            ]);
    }
}

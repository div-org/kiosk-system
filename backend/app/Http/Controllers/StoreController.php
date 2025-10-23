<?php

namespace App\Http\Controllers;

use App\Http\Resources\StoreResource;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StoreController extends Controller
{
    // GET /api/stores
    public function index()
    {
        $stores = Store::paginate(15);

        return (StoreResource::collection($stores))
            ->additional([
                'error' => 0,
                'message' => ''
            ]);
    }
    
    // POST /api/stores
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'store_name' => 'required|string|max:255',
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->messages(),
                'error' => 422,
            ], 422);
        }

        $user = $request->user();

        $store = Store::create([
            'company_id' => $user->company_id,
            'store_name' => $request->store_name
        ]);

        return response()->json([
            'message' => 'User created successfully',
            'data' => new StoreResource($store),
            'error' => 0
        ], 200);
    }
}

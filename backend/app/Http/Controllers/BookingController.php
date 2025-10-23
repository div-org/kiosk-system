<?php

namespace App\Http\Controllers;

use App\Http\Resources\BookingResource;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BookingController extends Controller
{
    // GET /api/bhookings
    public function index()
    {
        $bookings = Booking::paginate(15);

        return (BookingResource::collection($bookings))
            ->additional([
                'error' => 0,
                'message' => ''
            ]);
    }
    
    // POST /api/bookings
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title'       => 'nullable|string|max:255',
            'start_date'  => 'required|date|after_or_equal:today',
            'end_date'    => 'required|date|after_or_equal:start_date',
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors(),
                'error' => 422,
            ], 422);
        }

        $user = $request->user();

        $store = Booking::create([
            'title'      => $request->title,
            'start_date' => $request->start_date,
            'end_date'   => $request->end_date,
            'store_id'   => $user->store_id,
            'user_id'    => $user->id,
        ]);

        return response()->json([
            'message' => 'Booking created successfully',
            'data' => new BookingResource($store),
            'error' => 0
        ], 200);
    }
}

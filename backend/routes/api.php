<?php

use App\Http\Controllers\BookingController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\TrackerController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource('users', UserController::class);

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('companies', CompanyController::class);
    Route::apiResource('stores', StoreController::class);
    Route::apiResource('bookings', BookingController::class);
    Route::apiResource('roles', RoleController::class);
    // Route::apiResource('trackers', TrackerController::class);

    // Tracker routes
    Route::get('trackers', [TrackerController::class, 'index']);
    Route::post('trackers/clockTrack', [TrackerController::class, 'clockTrack']);
    Route::get('trackers/clockStatus', [TrackerController::class, 'clockStatus']);

    // Create user via store
    Route::post('/userStore', [UserController::class, 'userStore']);
});

Route::post('/login', [UserController::class, 'loginPost']);
Route::get('/login/{token}', [UserController::class, 'loginGet']);

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

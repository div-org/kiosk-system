<?php

namespace App\Http\Controllers;

use App\Http\Resources\TrackerResource;
use App\Models\Tracker;
use App\Models\TrackerBreak;
use Illuminate\Http\Request;

class TrackerController extends Controller
{
    // GET /api/trackers
    public function index(Request $request)
    {
        $user = $request->user();
        
        $trackers = Tracker::with('breaks')
            ->where('user_id', $user->id)
            ->latest()
            ->get();

        return (TrackerResource::collection($trackers))
            ->additional([
                'error' => 0,
                'message' => ''
            ]);
    }

    // POST /api/clockTrack
    // public function clockTrack(Request $request)
    // {
    //     $user = $request->user();
    //     $action = $request->input('action'); // time | break

    //     $lastTracker = Tracker::where('user_id', $user->id)
    //         ->latest()
    //         ->first();

    //     if ($action === 'time') {

    //         if ($lastTracker && !$lastTracker->time_out) {

    //             $timeNow = now();

    //             if ($lastTracker->break_in && !$lastTracker->break_out) {
    //                 $lastTracker->break_out = $timeNow;

    //                 $breakMinutes = $lastTracker->break_in->diffInMinutes($lastTracker->break_out);
    //                 $lastTracker->total_break = round($breakMinutes / 60, 2);
    //             }

    //             $lastTracker->time_out = $timeNow;

    //             $totalMinutes = $lastTracker->time_in->diffInMinutes($lastTracker->time_out);
    //             $totalHours = round($totalMinutes / 60, 2);

    //             $lastTracker->total_hours = $totalHours;
    //             $lastTracker->save();

    //             return response()->json([
    //                 'message' => 'Clocked Out Successfully',
    //                 'data' => new TrackerResource($lastTracker),
    //                 'error' => 0
    //             ], 200);

    //         } else {
                
    //             $tracker = Tracker::create([
    //                 'user_id' => $user->id,
    //                 'store_id' => $user->store_id,
    //                 'company_id' => $user->company_id,
    //                 'time_in' => now(),
    //             ]);

    //             return response()->json([
    //                 'message' => 'Clocked In Successfully',
    //                 'data' => new TrackerResource($tracker),
    //                 'error' => 0
    //             ], 200);

    //         }
            
    //     } else if ($action === 'break') {

    //         // Handle break logic here if needed
    //         // return response()->json([
    //         //     'message' => 'Break action not implemented yet',
    //         //     'data' => null,
    //         //     'error' => 501
    //         // ], 501);


    //         if ($lastTracker && $lastTracker->time_in && !$lastTracker->time_out) {

    //             if (!$lastTracker->break_in) {
    //                 $lastTracker->break_in = now();
    //                 $lastTracker->save();

    //                 return response()->json([
    //                     'message' => 'Break Started Successfully',
    //                     'data' => new TrackerResource($lastTracker),
    //                     'error' => 0
    //                 ], 200);

    //             } elseif (!$lastTracker->break_out) {
    //                 $lastTracker->break_out = now();

    //                 $breakMinutes = $lastTracker->break_in->diffInMinutes($lastTracker->break_out);
    //                 $lastTracker->total_break = round($breakMinutes / 60, 2);
    //                 $lastTracker->save();

    //                 return response()->json([
    //                     'message' => 'Break Ended Successfully',
    //                     'data' => new TrackerResource($lastTracker),
    //                     'error' => 0
    //                 ], 200);
    //             } else {
    //                 return response()->json([
    //                     'message' => 'No active break session found',
    //                     'data' => null,
    //                     'error' => 400
    //                 ], 400);
    //             }

    //         } else {

    //             return response()->json([
    //                 'message' => 'No active clock-in session found',
    //                 'data' => null,
    //                 'error' => 400
    //             ], 400);

    //         }
            

    //     } else {
    //         return response()->json([
    //             'message' => 'Invalid action',
    //             'data' => null,
    //             'error' => 400
    //         ], 400);
    //     }
    // }
    public function clockTrack(Request $request)
    {
        $user = $request->user();
        $action = $request->input('action'); // "time" or "break"

        $lastTracker = Tracker::where('user_id', $user->id)->latest()->first();

        if ($action === 'time') {
            // Clock OUT
            if ($lastTracker && !$lastTracker->time_out) {
                $timeNow = now();

                // check if user is on break — close it
                $activeBreak = TrackerBreak::where('tracker_id', $lastTracker->id)
                    ->whereNull('break_out')
                    ->latest()
                    ->first();

                if ($activeBreak) {
                    $activeBreak->break_out = $timeNow;
                    $activeBreak->total_break = $activeBreak->break_in
                        ? round($activeBreak->break_in->diffInMinutes($timeNow) / 60, 2)
                        : 0;
                    $activeBreak->save();
                }

                // finish main tracker
                $lastTracker->time_out = $timeNow;
                $totalMinutes = $lastTracker->time_in->diffInMinutes($timeNow);
                $lastTracker->total_hours = round($totalMinutes / 60, 2);
                $lastTracker->save();

                return response()->json([
                    'message' => 'Clocked Out Successfully',
                    'data' => new TrackerResource($lastTracker),
                    'error' => 0
                ]);
            }

            // Clock IN
            $tracker = Tracker::create([
                'user_id' => $user->id,
                'store_id' => $user->store_id,
                'company_id' => $user->company_id,
                'time_in' => now(),
            ]);

            return response()->json([
                'message' => 'Clocked In Successfully',
                'data' => new TrackerResource($tracker),
                'error' => 0
            ]);
        }

        if ($action === 'break') {
            if (!$lastTracker || $lastTracker->time_out) {
                return response()->json([
                    'message' => 'No active clock-in session found',
                    'error' => 400
                ], 400);
            }

            $activeBreak = TrackerBreak::where('tracker_id', $lastTracker->id)
                ->whereNull('break_out')
                ->latest()
                ->first();

            if (!$activeBreak) {
                // start break
                $newBreak = TrackerBreak::create([
                    'tracker_id' => $lastTracker->id,
                    'user_id' => $user->id,
                    'store_id' => $user->store_id,
                    'company_id' => $user->company_id,
                    'break_in' => now(),
                ]);

                return response()->json([
                    'message' => 'Break Started Successfully',
                    'data' => $newBreak,
                    'error' => 0
                ]);
            } else {
                // end break
                $timeNow = now();
                $activeBreak->break_out = $timeNow;
                $activeBreak->total_break = $activeBreak->break_in
                    ? round($activeBreak->break_in->diffInMinutes($timeNow) / 60, 2)
                    : 0;
                $activeBreak->save();

                return response()->json([
                    'message' => 'Break Ended Successfully',
                    'data' => $activeBreak,
                    'error' => 0
                ]);
            }
        }

        return response()->json([
            'message' => 'Invalid action',
            'error' => 400
        ], 400);
    }

    // GET /api/clockStatus/
    public function clockStatus(Request $request)
    {
        $user = $request->user();

        $lastTracker = Tracker::where('user_id', $user->id)
            ->latest()
            ->first();

        if ($lastTracker && !$lastTracker->time_out) {
            return response()->json([
                'message' => 'User is currently Clocked In',
                'data' => new TrackerResource($lastTracker),
                'error' => 0
            ], 200);
        } else {
            return response()->json([
                'message' => 'User is currently Clocked Out',
                'data' => null,
                'error' => 0
            ], 200);
        }
    }
}

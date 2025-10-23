<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TrackerBreak extends Model
{
    protected $fillable = [
        'tracker_id',
        'user_id',
        'store_id',
        'company_id',
        'break_in',
        'break_out',
    ];

    protected $casts = [
        'break_in'  => 'datetime',
        'break_out' => 'datetime',
    ];
}

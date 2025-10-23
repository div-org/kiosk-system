<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tracker extends Model
{
    protected $fillable = [
        'user_id',
        'store_id',
        'company_id',
        'time_in',
        'time_out',
        'total_hours'
    ];

    protected $casts = [
        'time_in'   => 'datetime',
        'time_out'  => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function store()
    {
        return $this->belongsTo(Store::class);
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function breaks()
    {
        return $this->hasMany(TrackerBreak::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SessionInterval extends Model
{
    protected $fillable = [
        'workout_session_id',
        'start_second',
        'end_second',
        'speed_kmh',
        'incline_percent',
        'kcal',
    ];

    public function workoutSession()
    {
        return $this->belongsTo(WorkoutSession::class);
    }
}

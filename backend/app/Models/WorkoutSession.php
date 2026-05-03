<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkoutSession extends Model
{
    protected $fillable = [
        'user_id',
        'weight_kg',
        'age',
        'gender',
        'duration_seconds',
        'avg_speed_kmh',
        'incline_percent',
        'total_kcal',
    ];

    public function intervals()
    {
        return $this->hasMany(SessionInterval::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

<?php

namespace App\Providers;

use App\Models\WorkoutSession;
use App\Policies\WorkoutSessionPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        Gate::policy(WorkoutSession::class, WorkoutSessionPolicy::class);
    }
}

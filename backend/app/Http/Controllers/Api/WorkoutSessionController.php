<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\WorkoutSession;
use Illuminate\Http\Request;

class WorkoutSessionController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(
            $request->user()->workoutSessions()->with('intervals')->latest()->get()
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'weight_kg'        => 'required|numeric|min:30|max:300',
            'age'              => 'required|integer|min:10|max:100',
            'gender'           => 'required|in:male,female',
            'duration_seconds' => 'required|integer|min:60',
            'avg_speed_kmh'    => 'required|numeric|min:1|max:30',
            'incline_percent'  => 'required|numeric|min:0|max:30',
            'total_kcal'       => 'required|numeric|min:0',
            'intervals'        => 'nullable|array',
            'intervals.*.start_second'   => 'required|integer',
            'intervals.*.end_second'     => 'required|integer',
            'intervals.*.speed_kmh'      => 'required|numeric',
            'intervals.*.incline_percent' => 'required|numeric',
            'intervals.*.kcal'           => 'required|numeric',
        ]);

        $session = $request->user()->workoutSessions()->create($validated);

        if (!empty($validated['intervals'])) {
            $session->intervals()->createMany($validated['intervals']);
        }

        return response()->json($session->load('intervals'), 201);
    }

    public function show(Request $request, WorkoutSession $workoutSession)
    {
        $this->authorize('view', $workoutSession);
        return response()->json($workoutSession->load('intervals'));
    }

    public function destroy(Request $request, WorkoutSession $workoutSession)
    {
        $this->authorize('delete', $workoutSession);
        $workoutSession->delete();
        return response()->json(null, 204);
    }
}

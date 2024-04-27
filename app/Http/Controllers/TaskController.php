<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Task::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", 'desc');

        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }

        if (request('status')) {
            $query->where('status', request('status'));
        }

        $tasks = $query->orderBy($sortField, $sortDirection)->paginate(10);
        // $tasks = $query->paginate(10)->onEachSide(1);
        return inertia('Task/Index', [
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Task/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = auth()->user()->id;
        $data['updated_by'] = auth()->user()->id;

        $image = $data['image'] ?? null;
        if ($image) {
            $data['image_path'] = '/storage/' . $image->store('task/' . Str::random(), 'public');
        }

        $task = Task::create($data);

        return to_route('task.index')->with('success', 'Task created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        $query = $task->tasks();
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", 'desc');

        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }

        if (request('status')) {
            $query->where('status', request('status'));
        }

        $tasks = $query->orderBy($sortField, $sortDirection)->paginate(10);
        return inertia('Task/Show', [
            'task' => new TaskResource($task), // single data
            'tasks' => TaskResource::collection($tasks), // collection data
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        return inertia('Task/Edit', [
            'task' => new TaskResource($task),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();
        $data['updated_by'] = auth()->user()->id;
        $image = $data['image'] ?? null;
        if ($image) {
            $origin_img_path = str_replace('/storage/', '', $task->image_path);
            $dir_path = explode('/', $task->image_path);

            if ($task->image_path && Storage::disk('public')->exists($origin_img_path)) {
                Storage::disk('public')->deleteDirectory($dir_path[2] . '/' . $dir_path[3]); // delete file
            }

            $data['image_path'] = '/storage/' . $image->store('task/' . Str::random(), 'public');
        }
        $task->update($data);

        return to_route('task.index')->with('success', "Task \"$task->name\" was updated successfully.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $origin_img_path = str_replace('/storage/', '', $task->image_path);
        $dir_path = explode('/', $task->image_path);

        if ($task->image_path && Storage::disk('public')->exists($origin_img_path)) {
            Storage::disk('public')->deleteDirectory($dir_path[2] . '/' . $dir_path[3]); // delete file
        }

        $task->delete();

        return to_route('task.index')->with('success', "Task \"$task->name\" was deleted successfully.");
    }
}

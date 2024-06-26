<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Project::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", 'desc');

        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }

        if (request('status')) {
            $query->where('status', request('status'));
        }

        $projects = $query->orderBy($sortField, $sortDirection)->orderBy('updated_at', 'DESC')->paginate(10);
        // $projects = $query->paginate(10)->onEachSide(1);
        return inertia('Project/Index', [
            'projects' => ProjectResource::collection($projects),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Project/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = auth()->user()->id;
        $data['updated_by'] = auth()->user()->id;

        $image = $data['image'] ?? null;
        if ($image) {
            $data['image_path'] = '/storage/' . $image->store('project/' . Str::random(), 'public');
        }

        $project = Project::create($data);

        return to_route('project.index')->with('success', 'Project created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $query = $project->tasks();
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", 'desc');

        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }

        if (request('status')) {
            $query->where('status', request('status'));
        }

        $tasks = $query->orderBy($sortField, $sortDirection)->paginate(10);
        return inertia('Project/Show', [
            'project' => new ProjectResource($project), // single data
            'tasks' => TaskResource::collection($tasks), // collection data
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return inertia('Project/Edit', [
            'project' => new ProjectResource($project),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $data = $request->validated();
        $data['updated_by'] = auth()->user()->id;
        $image = $data['image'] ?? null;
        if ($image) {
            $origin_img_path = str_replace('/storage/', '', $project->image_path);
            $dir_path = explode('/', $project->image_path);

            if ($project->image_path && Storage::disk('public')->exists($origin_img_path)) {
                Storage::disk('public')->deleteDirectory($dir_path[2] . '/' . $dir_path[3]); // delete file
            }

            $data['image_path'] = '/storage/' . $image->store('project/' . Str::random(), 'public');
        }
        $project->update($data);

        return to_route('project.index')->with('success', "Project \"$project->name\" was updated successfully.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $origin_img_path = str_replace('/storage/', '', $project->image_path);
        $dir_path = explode('/', $project->image_path);

        if ($project->image_path && Storage::disk('public')->exists($origin_img_path)) {
            Storage::disk('public')->deleteDirectory($dir_path[2] . '/' . $dir_path[3]); // delete file
        }

        $project->delete();

        return to_route('project.index')->with('success', "Project \"$project->name\" was deleted successfully.");
    }
}

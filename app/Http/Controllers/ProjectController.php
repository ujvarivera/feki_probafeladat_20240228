<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\Project;
use App\Notifications\ProjectUpdateNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects = Project::withCount('contacts')->with('contacts')->get();
        $contacts = Contact::all();

        return inertia('Projects/Index', compact('projects', 'contacts'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'projectName' => 'required',
            'description' => 'required',
            'projectStatus' => 'required',
            'projectContacts' => 'required',
        ]);

        $project = Project::create([
            'name' => $request->projectName,
            'description' => $request->description,
            'status' => $request->projectStatus,
        ]);

        $project->contacts()->sync($request->projectContacts);

        return redirect()->route('projects.index')->with('success', 'Projekt sikeresen hozzáadva!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        $contactIdsOfProject = $project->contacts->pluck('id');
        $contacts = Contact::all();

        return inertia('Projects/Edit', compact('project', 'contactIdsOfProject', 'contacts'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        $request->validate([
            'projectName' => 'required',
            'description' => 'required',
            'projectStatus' => 'required',
            'projectContacts' => 'required|array',
        ]);

        $projectOriginalName = $project->name;

        $project->update([
            'name' => $request->projectName,
            'description' => $request->description,
            'status' => $request->projectStatus,
        ]);

        $project->contacts()->sync($request->projectContacts);

        $changes = $project->getChanges();

        if(!empty($changes)) {
            Notification::send($project->contacts, new ProjectUpdateNotification($project, $changes, $projectOriginalName));
        }

        return redirect()->back()->with('success', 'Projekt sikeresen módosítva!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $project->delete();
    }
}

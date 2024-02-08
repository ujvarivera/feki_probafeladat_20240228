<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\Project;
use Illuminate\Http\Request;

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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        //
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store(Request $request) 
    {
        $request->validate([
            'contactName' => 'required',
            'contactEmail' => 'required|unique:contacts,email',
        ]);

        Contact::create([
            'name' => $request->contactName,
            'email' => $request->contactEmail,
        ]);

        return redirect()->back()->with('success', 'Kapcsolattartó sikeresen hozzáadva!');;
    }
}

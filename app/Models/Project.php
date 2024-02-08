<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'status'
    ];

    public function contacts()
    {
        return $this->belongsToMany(Contact::class, 'contact_projects');
    }

    public function numberOfContacts()
    {
        return count($this->contacts);
    }
}

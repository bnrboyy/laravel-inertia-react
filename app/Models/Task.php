<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    function project()
    {
        return $this->belongsTo(Project::class);
    }

    function assignedUser()
    {
        return $this->belongsTo(User::class, 'assigned_user_id');
    }

    function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}

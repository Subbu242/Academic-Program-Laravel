<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class programobjectives extends Model
{
    use HasFactory;
    protected $table = 'programobjectives';

    protected $fillable = [
        'POid',
        'Pid',
        'Objective',
    ];

}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class assessments extends Model
{
    use HasFactory;
    protected $table = 'assessments';

    protected $fillable = [
        'Cid',
        'instructorID',
        'description',
        'totalPoints',
    ];
}

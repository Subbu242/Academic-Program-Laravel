<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class userscourse extends Model
{
    use HasFactory;
    protected $table = 'userscourse';

    protected $fillable = [
        'Uid',
        'Cid',
        'Score',
        'Grades',
        'Feedback',
    ];

}

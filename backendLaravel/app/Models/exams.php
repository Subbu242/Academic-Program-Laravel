<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class exams extends Model
{
    use HasFactory;
    protected $table = 'exams';

    protected $fillable = [
        'Cid',
        'instructorID',
        'question1',
        'question2',
        'question3',
        'question4',
        'choices1',
        'choices2',
        'choices3',
        'choices4',
        'answer1',
        'answer2',
        'answer3',
        'answer4',
    ];

}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class studentinstructormessage extends Model
{
    use HasFactory;
    protected $table = 'studentinstructormessage';

    protected $fillable = [
        'SIMid',
        'studentID',
        'instructorID',
        'message',
        'unread',
        'senderID',
    ];

}

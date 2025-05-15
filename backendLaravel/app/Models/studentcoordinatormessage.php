<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class studentcoordinatormessage extends Model
{
    use HasFactory;
    protected $table = 'studentcoordinatormessage';

    protected $fillable = [
        'SCMid',
        'studentID',
        'coordinatorID',
        'message',
        'unread',
        'senderID',
    ];

}

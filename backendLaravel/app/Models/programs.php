<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class programs extends Model
{
    use HasFactory;
    protected $table = 'programs';

    protected $fillable = [
        'Pid',
        'ProgramCoordinator',
        'ProgramCode',
        'Programname',
        'College',
    ];

}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Mail\WelcomeEmail;
use Illuminate\Support\Facades\Mail;

class SessionResponse extends Model
{
    use SoftDeletes;

    protected $table = 'c_session_response';
    protected $fillable = ['userid', 'sessionid', 'questionno', 'response'];
    
}
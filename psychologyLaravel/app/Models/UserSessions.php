<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Mail\WelcomeEmail;
use Illuminate\Support\Facades\Mail;

class UserSessions extends Model
{
    use SoftDeletes;

    protected $table = 'c_user_progress_status';
    protected $fillable = ['userid', 'sessionid', 'startat', 'firstopenat', 'lastopenat', 'endat', 'sessionfinishemailsent', 'sessionfinishemailsenttime'];


    
}
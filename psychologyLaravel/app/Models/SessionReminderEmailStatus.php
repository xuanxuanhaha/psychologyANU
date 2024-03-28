<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Mail\WelcomeEmail;
use Illuminate\Support\Facades\Mail;

class SessionReminderEmailStatus extends Model
{
    use SoftDeletes;

    protected $table = 'c_session_reminder_email_status';
    protected $fillable = ['userid', 'sessionid', 'sessionreminderemailsent', 'sessionreminderemailsenttime'];

}
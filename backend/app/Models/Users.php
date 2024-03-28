<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Mail\WelcomeEmail;
use Illuminate\Support\Facades\Mail;

class Users extends Model
{
    use SoftDeletes;

    protected $table = 'c_users';
    protected $fillable = ['username', 'email', 'language', 'password'];
    protected $hidden = ['password'];

    public function createUser (array $attributes = []) {
        $user = self::create($attributes);
        $this->sendWelcomeEmail($user);
    
        return $user;
    }

    public function sendWelcomeEmail($user)
    {
        Mail::to($user->email)->send(new WelcomeEmail($user));
    }
}
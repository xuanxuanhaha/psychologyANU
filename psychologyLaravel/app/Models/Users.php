<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Mail\WelcomeEmail;
use Illuminate\Support\Facades\Mail;
use App\Http\Controllers\SessionController;
use Illuminate\Support\Facades\Hash;
use App\Models\UserIds;


class Users extends Model
{
    use SoftDeletes;

    protected $table = 'c_users';
    protected $fillable = ['username', 'email', 'password', 'language'];
    protected $hidden = ['password'];

    public function createUser (array $attributes = []) {
        $attributes['password'] = Hash::make($attributes['password']);
        $user = self::create($attributes);
        $userId = UserIds::find($attributes['username']);
        $userId->available = 0;
        $userId->save();

        
        $this->sendWelcomeEmail($user);
    

        if(!empty($user)) {
            $sessionController = new SessionController;
            $sessionController->sessionCreate(array('userid' => $user->id, 'sessionid' => 1)); // user can start session 1 once sign up.
        }


        return $user;
    }

    public function sendWelcomeEmail($user)
    {
        Mail::to($user->email)->send(new WelcomeEmail($user));
    }

}
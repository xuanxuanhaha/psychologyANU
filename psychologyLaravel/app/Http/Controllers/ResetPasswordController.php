<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Users;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\ForgetPasswordMail;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;
use App\Models\UserIds;

class ResetPasswordController extends Controller
{
    public function index(Request $request)
    {
        $attributes = $request->all();
        if($resetpasswords = \DB::table('c_password_resets')->where([['c_password_resets.userid', $attributes['userId']], ['c_password_resets.used', 0]])->get()){
            if($resetpasswords->count() > 0) {
                foreach($resetpasswords as $resetpassword){
                    if(Hash::check($attributes['token'], $resetpassword->token)){
                        $user = \DB::table('c_users')->where('id', $attributes['userId'])->first();
                        return array('success'=> true, 'user'=> $user, 'resetpasswordid'=> $resetpassword->id);
                    }
                }
            }
        }
        return array('success'=> false, 'error'=> 'No user found');
    }

    public function show(Request $request)
    {
        dd('hi show', $request->all());
        return 'hallo';
    }

    public function store(Request $request)
    {
        dd('store');
        
        return array('success'=> true);
    }

    public function update(Request $request, $id){
        $attributes = $request->all();
        $resetpassword = \DB::table('c_password_resets')->where([['c_password_resets.id', $id], ['c_password_resets.used', 0]])->first();
        if($resetpassword){
            \DB::table('c_password_resets')
                ->where([['c_password_resets.id', $id, ['c_password_resets.used', 0]]])
                ->update([ // if user reset password, change used to 1 to let them not able to use again.
                    'used' => 1
                ]);
            $userExists = Users::where('email', $attributes['useremail'])->exists();
            if($userExists){
                \DB::table('c_users')->where('email', $attributes['useremail'])->update([ // if user reset password, change used to 1 to let them not able to use again.
                    'password' => Hash::make($attributes['password'])
                ]);
                $updatedUser = \DB::table('c_users')
                    ->where('email', $attributes['useremail'])
                    ->first();

                $userIdRecord = UserIds::where('id', $updatedUser->username)->first();
                $updatedUser->group = $userIdRecord->group;

                return array('success'=> true,'user'=>$updatedUser);
            }
        }
        return array('success'=>false, 'error'=>'unable to reset password, please contact admin');
    }
}

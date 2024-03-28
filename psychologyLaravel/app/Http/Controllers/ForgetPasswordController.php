<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Users;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\ForgetPasswordMail;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;

class ForgetPasswordController extends Controller
{
    public function index(Request $request)
    {
        $attributes = $request->all();

        if(empty($attributes['email'])){
            return array('success'=>false, 'error'=>'Invalid credentials. Please try again.');
        }else{
            if($user = Users::where('email', $attributes['email'])->first()){
                // send forget password email

                $token = Str::random(60);
                \DB::table('c_password_resets')->insert([
                    'userid' => $user->id,
                    'token' => bcrypt($token),
                    'used' => 0,
                    'created_at' => Carbon::now()
                ]);
                $resetLink = 'http://35.182.37.175/resetpassword?token=' . $token . '&userid=' . $user->id;
                Mail::to($user->email)->send(new ForgetPasswordMail($user, $resetLink));

                return array('success'=>true, 'message'=>'we have send you an email to update your password');
            } else{
                return array('success'=>false, 'error'=>'Invalid credentials. Please try again.');
            }
        }
        
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
}

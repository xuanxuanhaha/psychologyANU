<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Users;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\ForgetPasswordMail;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;
use App\Models\SessionResponse;

class DataGenerateController extends Controller
{
    public function index(Request $request)
    {
        $attributes = $request->all();
        // Todo: change to admin email. Only admin or account with password can visit
        if((empty($attributes['password']) || $attributes['password'] !== '1-2=-1') && ($attributes['username'] !== 'dcardenas06@hotmail.com' && $attributes['username'] !== 'shijingjing0316@gmail.com' && $attributes['username'] !== 'zhangqixuan17@outlook.com' )) {
            return array('success'=>false, 'error'=>'Invalid credentials. Please try again.');
        }
        
        $existResponse = SessionResponse::join('c_users', 'c_session_response.userid', '=', 'c_users.id')
                        ->select('c_users.email as useremail', 'c_session_response.sessionid', 'c_session_response.questionno', 'c_session_response.response')
                        ->when(!empty($attributes['filterUserEmail']), function ($query) use ($attributes) {
                            return $query->where('c_users.email', '=', $attributes['filterUserEmail']);
                        })
                        ->when(!empty($attributes['filterSessionId']), function ($query) use ($attributes) {
                            return $query->where('c_session_response.sessionid', '=', $attributes['filterSessionId']);
                        })
                        ->when(!empty($attributes['filterQuestionNo']), function ($query) use ($attributes) {
                            return $query->where('c_session_response.questionno', '=', $attributes['filterQuestionNo']);
                        })
                        ->when(!empty($attributes['filterQuestionAnswer']), function ($query) use ($attributes) {
                            return $query->where('c_session_response.response', 'like', '%' . $attributes['filterQuestionAnswer'] . '%');
                        })
                        
                        ->get();
        return array('success'=>true, 'existResponse'=>$existResponse);
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

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
        if((empty($attributes['password']) || $attributes['password'] !== '1-2=-1') && ($attributes['username'] !== 'dcardenas06@hotmail.com' && $attributes['username'] !== 'shijingjing0316@gmail.com' && $attributes['username'] !== 'learning2thriveanu@gmail.com' )) {
            return array('success'=>false, 'error'=>'Invalid credentials. Please try again.');
        }
        
        $existResponse = SessionResponse::join('c_users', 'c_session_response.userid', '=', 'c_users.id')
                        ->join('c_ids', 'c_users.username', '=', 'c_ids.id')
                        ->rightJoin('c_user_progress_status', function($join) {
                            $join->on('c_user_progress_status.sessionid', '=', 'c_session_response.sessionid')
                                ->on('c_user_progress_status.userid', '=', 'c_session_response.userid');
                        })
                        ->select('c_ids.code as userid', 'c_users.email as useremail', 'c_users.username as groupcode', 'c_session_response.sessionid', 'c_session_response.questionno', 'c_session_response.response', 'c_user_progress_status.firstopenat', 'c_user_progress_status.endat')
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

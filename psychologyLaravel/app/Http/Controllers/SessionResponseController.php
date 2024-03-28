<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserSessions;
use App\Models\Users;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;
use App\Models\SessionReminderEmailStatus;
use App\Models\SessionResponse;

class SessionResponseController extends Controller
{
    public function index(Request $request)
    {
        dd('index');
    }

    public function show(int $sessionid, Request $request)
    {
        $attributes = $request->all();
        $existResponse = SessionResponse::where([['userid', $attributes['userid']], ['sessionid', $sessionid], ['questionno', $attributes['questionno']]])->first();
        return array('success'=> true, 'sessionresponse'=>$existResponse);
    }

    public function store(Request $request)
    {
        $attributes = $request->all();
        $existResponse = SessionResponse::where([['userid', $attributes['userid']], ['sessionid', $attributes['sessionid']], ['questionno', $attributes['questionno']]])
                            ->whereNotNull('response')
                            ->first();
        $sessionresponse = null;
        if(!empty($existResponse)){
            $this->update($request);
        }else{
            $newSessionResponseRecord = new SessionResponse([
                'userid' => $attributes['userid'],
                'sessionid' => $attributes['sessionid'],
                'questionno' => $attributes['questionno'],
                'response' => json_encode($attributes['response'])
            ]);
            $newSessionResponseRecord->save();
            $sessionresponse = $newSessionResponseRecord;
        }
        return array('success'=> true, 'sessionresponse'=>$sessionresponse);
    }

    public function update(Request $request)
    {
        $attributes = $request->all();
        $existResponse = SessionResponse::where([['userid', $attributes['userid']], ['sessionid', $attributes['sessionid']], ['questionno', $attributes['questionno']]])
                            ->whereNotNull('response')
                            ->first();
        if(!empty($existResponse)){
            $existResponse->update([
                'response' => json_encode($attributes['response'])
            ]);
        }
        return array('success'=> true, 'sessionresponse'=>$existResponse);
    }


}

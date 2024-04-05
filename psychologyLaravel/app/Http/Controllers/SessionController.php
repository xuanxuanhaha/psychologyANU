<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserSessions;
use App\Models\Users;
use App\Mail\Session1Finish;
use App\Mail\Session2Finish;
use App\Mail\Session3Finish;
use App\Mail\Session4Finish;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;
use App\Models\SessionReminderEmailStatus;
use App\Mail\SessionStartReminderAuto;

class SessionController extends Controller
{
    public function index(Request $request)
    {
        dd('index');
    }

    public function show(Request $request)
    {
        dd('show');

    }

    public function store(Request $request)
    {
        $attributes = $request->all();
        if(!empty($attributes['start'])){
            return array('success'=>true, 'user'=>$this->sessionStart($attributes));
        }

    }

    public function update(Request $request)
    {
        $attributes = $request->all();
        if(!empty($attributes['finish'])){
            $sessionFinish = $this->sessionEnd($attributes);
            if(!empty($sessionFinish['success'])){
                return array('success'=>true, 'sessionFinish'=>$sessionFinish['userSessionRecord']);
            }else {
                return array('success' => false, 'error' => $sessionFinish['error']);
            }
        }
    }

    public function getUserSessionInfo(Request $request, int $userid) {
        $finishedSession = 0;
        $userFinishedSessionId = UserSessions::select('sessionId')
            ->where('userid', $userid)
            ->whereNull('deleted_at')
            ->orderByDesc('sessionId')
            ->whereNotNull('endat')
            ->where('sessionfinishemailsent', 1) // only when session finish email sent, mean done the session
            ->first();
        if ($userFinishedSessionId) {
            $finishedSession = $userFinishedSessionId->sessionId;
        }
        $nextsessionId = $finishedSession + 1;
        $disableNextSessionBtn = true;
        if($nextsessionId > 1){
            $epochTime = time();

            // User can see session 3, 4, only when sessionreminderemailsent
            $sessionStart = UserSessions::where('sessionid', $nextsessionId)
                ->where('userid', $userid)
                ->where('startat', '<', $epochTime)
                ->whereNull('endat')
                ->whereNull('sessionfinishemailsenttime')
                ->first();
            if($sessionStart){
                $disableNextSessionBtn = false;
            }
        }else{
            // User can see session 1, 2 immediately
            $disableNextSessionBtn = false; 
        }
        return array('success'=> true, 'nextsessionId'=>$nextsessionId, 'disableNextSessionBtn'=> $disableNextSessionBtn);
    }

    public function sessionCreate($attributes = []) {
        $usersession = UserSessions::where([['userid', $attributes['userid']], ['sessionid', $attributes['sessionid']]])
                ->whereNull('endat')
                ->whereNull('firstopenat')
                ->whereNull('lastopenat')
                ->first();
        $epochTime = time();
        if(empty($usersession)) {
            $newUserRecord = new UserSessions([
                'userid' => $attributes['userid'],
                'sessionid' => $attributes['sessionid'],
                'startat' => $epochTime + $this->sessionGapTime($attributes['sessionid']),
                'firstopenat' => null,
                'lastopenat' => null,
                'endat' => null,
                'sessionfinishemailsent' => false,
                'sessionfinishemailsenttime' => null
            ]);
            $newUserRecord->save();
            return $newUserRecord;
        }
    }

    public function sessionStart($attributes = []) {
        $user = UserSessions::where([['userid', $attributes['userid']], ['sessionid', $attributes['sessionid']]])
                ->whereNull('endat')
                ->first();
        $epochTime = time();
        if($user) { // if have user record => user didn't finish current session
            $user->update([
                'lastopenat' => $epochTime
            ]);
            if(!$user->startat) {
                $user->update([
                    'startat' => $epochTime
                ]);
            }
            if(!$user->firstopenat) {
                $user->update([
                    'firstopenat' => $epochTime
                ]);
            }
            return $user;
        }else{
            return $this->sessionCreate($attributes);
        }
        
    }

    public function sessionEnd($attributes = []) {
        $user = Users::find($attributes['userid']);
        if(!$user) {
            return array('success' => false, 'error' => 'no user found');
        }

        $userSessionRecord = UserSessions::where([['userid', $attributes['userid']], ['sessionid', $attributes['sessionid']]])->whereNull('endat')->first();
        $epochTime = time();
        if($userSessionRecord) {


            $maxRetryAttempts = 3;
            $retryInterval = 5; // seconds

            for ($retry = 0; $retry < $maxRetryAttempts; $retry++) {
                try {
                    // Attempt to connect to SMTP
                    // send session finish email
                    if($attributes['sessionid'] === 1){
                        Mail::to($user->email)->send(new Session1Finish($user));
                    }else if ($attributes['sessionid'] === 2){
                        Mail::to($user->email)->send(new Session2Finish($user));
                    }else if ($attributes['sessionid'] === 3){
                        Mail::to($user->email)->send(new Session3Finish($user));
                    }else if ($attributes['sessionid'] === 4){
                        Mail::to($user->email)->send(new Session4Finish($user));
                    }
                    $mailSentTime = time();

                    // If the connection is successful, break out of the loop
                    break;
                } catch (Exception $e) {
                    // Handle the exception (e.g., log the error)
                    error_log('SMTP Connection Error: ' . $e->getMessage());

                    if ($retry < $maxRetryAttempts - 1) {
                        // Sleep for a while before the next retry
                        sleep($retryInterval);
                    } else {
                        // If we've reached the maximum retry attempts, throw the exception
                        throw $e;
                    }
                }
            }

            // update finished session
            $userSessionRecord->update([
                'endat' => $epochTime,
                'sessionfinishemailsent' => true,
                'sessionfinishemailsenttime' => $mailSentTime
            ]);

            if($attributes['sessionid'] < 4){
                $this->sessionCreate(array('userid' =>  $attributes['userid'], 'sessionid' => $attributes['sessionid'] + 1)); // user can start session 1 once sign up.
            }

            return array('success' => true, 'userSessionRecord' => $userSessionRecord);
        }else {
            return array('success' => false, 'error' => 'already finished');
        }
    }

    private function sessionGapTime($sessionid) { // get session gap time
        // session 1 -> 2: 0 seconds
        
        if ($sessionid === 1) {
            return 120;
        } else if($sessionid === 2){
            return 120;
        } else if($sessionid === 3) { // session 2 -> 3: 6 days
            return 120; // Todo: use 6 minutes to do testing
            // return 518400;
        } else if($sessionid === 4) { // session 3 -> 4: 6 days
            return 120; // Todo: use 6 minutes to do testing
            // return 518400;
        }
    }

}

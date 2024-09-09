<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserSessions;
use App\Models\Users;
use App\Mail\Session1Finish;
use App\Mail\Session2Finish;
use App\Mail\Session3Finish;
use App\Mail\Session3FinishC;
use App\Mail\Session4Finish;
use App\Mail\Session4FinishC;
use App\Mail\Session5Finish;
use App\Mail\Session5FinishToAdmin;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;
use App\Models\SessionReminderEmailStatus;
use App\Mail\SessionStartReminderAuto;
use App\Models\UserIds;

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
        if($nextsessionId > 2){
            $epochTime = time();

            // User can see session 3, 4, 5, only when sessionreminderemailsent
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
        $username = $user->username;
        $userGroup = UserIds::where('id', $username)->where('available', 0)->first();
        if(!$user) {
            return array('success' => false, 'error' => 'no user found');
        }
        if(empty($userGroup)) {
            return array('success' => false, 'error' => 'no user found');
        }
        $userGroupId = $userGroup->group;

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
                        if($userGroupId === 3){
                            Mail::to($user->email)->send(new Session3FinishC($user));
                        } else{
                            Mail::to($user->email)->send(new Session3Finish($user));
                        }
                    }else if ($attributes['sessionid'] === 4){
                        if($userGroupId === 3){
                            Mail::to($user->email)->send(new Session4FinishC($user));
                        } else{
                            Mail::to($user->email)->send(new Session4Finish($user));
                        }
                    }else if ($attributes['sessionid'] === 5){
                        $user->code = $user->join('c_ids', 'c_ids.id', '=', 'c_users.username')->where('c_users.id', $user->id)->first()->code;
                        Mail::to($user->email)->send(new Session5Finish($user));
                        Mail::to('learning2thriveanu@gmail.com')->send(new Session5FinishToAdmin($user));
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

            if($attributes['sessionid'] < 5){
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
            return 0;
        } else if($sessionid === 2){
            return 0;
        } else if($sessionid === 3) { // session 2 -> 3: 7 days
            // return 3600*24; // Todo: use 6 minutes to do testing
            return 604800;
        } else if($sessionid === 4) { // session 3 -> 4: 7 days
            // return 3600*24; // Todo: use 6 minutes to do testing
            return 604800;
        } else if($sessionid === 5) { // session 4 -> 5: 7 days
            // return 3600*24; // Todo: use 6 minutes to do testing
            return 604800;
        }
    }

}

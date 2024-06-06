<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;
use App\Models\UserSessions;
use App\Mail\SessionStartReminderAuto;
use App\Models\SessionReminderEmailStatus;

class SendSessionStartReminderEmail extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'send:session_start_reminder';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send a session start reminder email at 21:00 AM';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $users = $this->getUsersNeedStartReminder();
        foreach($users as $user) {
            // send email
            Mail::to($user->email)->send(new SessionStartReminderAuto($user));
            // add email record to c_session_reminder_email_status table

            $epochTime = time();
            $newSessionReminderRecord = new SessionReminderEmailStatus([
                'userid' => $user->id,
                'sessionid' => $user->sessionid,
                'sessionreminderemailsent' => 1,
                'sessionreminderemailsenttime' => $epochTime
            ]);
            $newSessionReminderRecord->save();            
        }
    }

    private function getUsersNeedStartReminder() 
    {
        $epochTime = time();
        $epochTimeSevenDaysAgo = $epochTime - 604800;
        // get all records that has startat time, no endat time, and startat time > currenttime - 7 days
        $usersNeedStartReminder = UserSessions::whereNotNull('startat')
                ->whereNull('endat')
                ->whereNull('sessionfinishemailsenttime')
                ->where('startat', '>', $epochTimeSevenDaysAgo)
                ->join('c_users', 'c_users.id', '=', 'c_user_progress_status.userid')
                ->get();
        return $usersNeedStartReminder;
    }
}

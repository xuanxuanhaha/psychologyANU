<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Users;
use App\Models\UserIds;

use Illuminate\Support\Facades\Hash;

class SignController extends Controller
{
    public function index(Request $request)
    {
        $attributes = $request->all();
        if(empty($attributes['email']) || empty($attributes['password'])){
            return response()->json(['error' => 'Invalid credentials. Please try again.'], 401);
        }else{
            $userIdRecord = UserIds::where('code', $attributes['email'])->first();
            $usernameid = null;
            if($userIdRecord){
                $usernameid = $userIdRecord->id;
            }

            $user = Users::where('email', $attributes['email'])->first();
            if(!$user && $usernameid){
                $user = Users::where('username', $usernameid)->first();
            }
            if($user){
                if(Hash::check($attributes['password'], $user['password'])){
                    return array('success'=> true, 'user'=> $user);
                }else{
                    return response()->json(['error' => 'Invalid credentials. Please try again.'], 401);
                }
            }else{
                // User not found, return an error message
                return response()->json(['error' => 'Invalid credentials. Please try again.'], 401);
            }
        }
    }

    public function show(Request $request)
    {
        dd('hi get', $request->all());
        return 'hallo';
    }

    public function store(Request $request)
    {
        $data = $request->all();
        if (!$data['isstudent'] || !$data['username'] || !$data['password'] || !$data['email'] || !$data['confirmpassword']) {
            return array(['success'=> false, 'error'=> 'data invalid']);
        }
        $userId = null;
        $userIdAvailable = UserIds::where('code', $data['username'])->where('available', 1);
        if(!$userIdAvailable->exists()){
            return array('success'=>false, 'error'=>'User Id is invalid');
        }else{
            $userId = $userIdAvailable->first()->id;
        }

        $user = new Users();
        $userExists = Users::where('email', $data['email'])->exists();
        if(!$userExists) {
            if(isset($data['isstudent'])) {
                if($userId){
                    $data['username'] = $userId;
                    $data['language'] = 'English';
                    $data['group'] = $this->pickRandomNumber();
                    $user->createUser($data);
                }
            }
        }else{
            return array('success'=>false, 'error'=>'Email Exist');
        }
        
        return array('success'=> true);
    }

    private function pickRandomNumber() {
        // Your numbers array
        $numbers = Users::pluck('group')->toArray();

        // Desired percentages
        $desiredPercentages = [1 => 60, 2 => 20, 3 => 20];

        // Calculate the current percentages
        $countValues = array_count_values($numbers);
        $total = count($numbers);
        $currentPercentages = [];
        foreach ($countValues as $number => $count) {
            $currentPercentages[$number] = ($count / $total) * 100;
        }

        // Adjusted array to maintain the desired distribution
        $adjustedNumbers = [];

        // Populate the adjusted array based on current percentages
        foreach ($desiredPercentages as $number => $desiredPercentage) {
            $currentPercentage = $currentPercentages[$number] ?? 0;
            if ($currentPercentage < $desiredPercentage) {
                // If the current percentage is less than the desired, increase the probability of this number
                $adjustedNumbers = array_merge($adjustedNumbers, array_fill(0, $desiredPercentage - $currentPercentage, $number));
            }
        }

        // If adjustedNumbers is empty, it means all numbers are above their desired percentages. You can pick any.
        if (empty($adjustedNumbers)) {
            $adjustedNumbers = [1, 2, 3];
        }

        // Randomly pick a number from the adjusted array
        $group_number = $adjustedNumbers[array_rand($adjustedNumbers)];

        return $group_number;
    }
}

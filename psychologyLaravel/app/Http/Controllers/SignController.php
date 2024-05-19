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
                $user->group = $userIdRecord->group;
            }
            if(empty($user->group)){
                $userNameId = $user->username;
                $userGroup = UserIds::where('id', $userNameId)->first()->group;
                $user->group = $userGroup;
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
                    $data['username'] = $userId; // id in c_ids table
                    $data['language'] = 'English';
                    $user->createUser($data);
                }
            }
        }else{
            return array('success'=>false, 'error'=>'Email Exist');
        }
        
        return array('success'=> true);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Users;
use Illuminate\Support\Facades\Hash;

class SignController extends Controller
{
    public function index(Request $request)
    {
        $attributes = $request->all();
        if(empty($attributes['email']) || empty($attributes['password'])){
            return response()->json(['error' => 'Invalid credentials. Please try again.'], 401);
        }else{

            if($user = Users::where('email', $attributes['email'])->first()){
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
        if (!$data['isstudent'] || !$data['password'] || !$data['email'] || !$data['confirmpassword']) {
            return array(['success'=> false, 'error'=> 'data invalid']);
        }
        $user = new Users();
        $userExists = Users::where('email', $data['email'])->exists();
        if(!$userExists) {
            if(isset($data['isstudent'])) {
                $user->createUser($data);
            }
        }else{
            return array('success'=>false, 'error'=>'Email Exist');
        }
        
        return array('success'=> true);
    }
}

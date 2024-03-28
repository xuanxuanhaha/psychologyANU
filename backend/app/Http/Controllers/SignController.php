<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Users;

class SignController extends Controller
{
    public function index(Request $request)
    {
        dd('hi', $request->all());
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
        
        return array(['success'=> true]);
    }
}

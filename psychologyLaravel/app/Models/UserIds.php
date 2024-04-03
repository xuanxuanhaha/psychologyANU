<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;


class UserIds extends Model
{
    protected $table = 'c_ids';
    protected $fillable = ['code', 'available'];

    

}
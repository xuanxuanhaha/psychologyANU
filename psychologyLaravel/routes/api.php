<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SignController;
use App\Http\Controllers\ForgetPasswordController;
use App\Http\Controllers\ResetPasswordController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\SessionResponseController;
use App\Http\Controllers\DataGenerateController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::resource('users', SignController::class);
Route::resource('forgetpassword', ForgetPasswordController::class);
Route::resource('resetpassword', ResetPasswordController::class);
Route::resource('sessions', SessionController::class);
Route::resource('sessionresponse', SessionResponseController::class);
Route::resource('datagenerate', DataGenerateController::class);

Route::get('sessions/user/{userid}', SessionController::class . '@getUserSessionInfo');


<?php

use App\Http\Controllers\AttributionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ComputerController;
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

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('/login',       [AuthController::class, 'login']);
    Route::post('/register',    [AuthController::class, 'register']);
    Route::post('/logout',      [AuthController::class, 'logout']);
    Route::post('/refresh',     [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);    
    Route::get('/test-token',   [AuthController::class, 'TestToken']);    
});

Route::group([
    'midleware' => 'api',
    'prefix'    => 'computers'
], function($router){
    Route::post('get',    [ComputerController::class, 'GetComputers']);
    Route::post('create', [ComputerController::class, 'CreateComputer']);
    Route::post('update', [ComputerController::class, 'Update']);
    Route::delete('delete/{id}', [ComputerController::class, 'Delete']);
});


Route::group([
    'midleware' => 'api',
    'prefix'    => 'attributions'
], function($router){
    Route::post('create',      [AttributionController::class, 'AddAttribution']);
    Route::delete('delete/{id}', [AttributionController::class, 'RemoveAttribution']);
});

Route::group([
    'midleware' => 'api',
    'prefix'    => 'client'
], function($router){
    Route::get('/getAll',        [ClientController::class, 'GetClients']);
    Route::post('create',        [ClientController::class, 'Create']);
    Route::delete('delete/{id}', [ClientController::class, 'Delete']);
    Route::post('/search',       [ClientController::class, 'search']);
});
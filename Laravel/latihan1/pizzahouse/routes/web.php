<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/pizzas', function () {
    $pizza =    [['type' => 'hawaiian', 'base' => 'cross', 'price' => '100'],
                ['type' => 'hawaiian', 'base' => 'cross', 'price' => '100'],
                ['type' => 'hawaiian', 'base' => 'cross', 'price' => '100']
                ];

    $name = request('name');
    $age = request('age');
    return view('pizzas', ['name' => $name, 'age' => $age]);
});

Route::get('/pizzas/{id}/{name}', function ($id, $name) {
    return view('details', ['id' => $id, 'name' => $name]);
});
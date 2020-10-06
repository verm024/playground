<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Gate;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        if(Gate::allows('isAdmin')){
            return view('admin.home');
        }

        else if(Gate::allows('isUser')){
            return view('user.home');
        }

        else if(Gate::allows('isMaster')){
            return view('master.home');
        }
        // return view('home');
    }
}

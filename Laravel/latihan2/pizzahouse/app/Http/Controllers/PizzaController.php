<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Pizza;

class PizzaController extends Controller
{
    public function index() {
        $pizza = Pizza::all();
        $pizzas = ['pizzas' => $pizza];
        return view('pizza.index', $pizzas);
    }

    public function show($id) {
        $pizza = Pizza::findOrFail($id);

        $pizza = ['pizza' => $pizza];

        return view('pizza.show', $pizza);
    }
}

@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Pizza List</div>

                <div class="card-body">
                    @foreach($pizzas as $pizza)
                        {{ $pizza->pizza_name }}
                        <br>
                        {{ $pizza->pizza_sauce }}
                        <br>
                        {{ $pizza->pizza_cheese }}
                        <br>
                        {{ $pizza->pizza_type }}
                        <br>
                        <br>
                    @endforeach
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

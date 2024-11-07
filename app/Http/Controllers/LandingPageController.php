<?php

namespace App\Http\Controllers;

class LandingPageController extends Controller
{
       public function landingPage(){
        return inertia('LandingPage');
    }
}

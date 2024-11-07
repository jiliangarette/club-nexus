<?php

namespace App\Http\Controllers;

class ChatController extends Controller
{
      public function chat(){
        return inertia('Chat');
    }
}

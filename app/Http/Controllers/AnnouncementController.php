<?php

namespace App\Http\Controllers;

use App\Models\Group;
use Illuminate\Http\Request;

class AnnouncementController extends Controller
{
        public function announcement(){
        return inertia('Announcement');
    }

       public function index($groupId)
    {
        $group = Group::find($groupId);

        if (!$group) {
            return response()->json(['message' => 'Group not found.'], 404);
        }

        return response()->json([
            'selectedClub' => $group->toConversationArray(),
        ]);
    }
}

<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Announcement;
use App\Models\Group;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class AnnouncementController extends Controller
{
    public function announcement()
    {
        return inertia('Announcement');
    }

public function store(Request $request)
{
    $validated = $request->validate([
        'title' => 'required|string|max:255',
        'content' => 'required|string',
        'date' => 'required|date',
        'group_id' => 'required|exists:groups,id',
        'attachments.*' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:10240',
    ]);

    $announcement = Announcement::create([
        'user_id' => Auth::id(),
        'group_id' => $validated['group_id'],
        'title' => $validated['title'],
        'content' => $validated['content'],
        'date' => $validated['date'],
    ]);

    if ($request->hasFile('attachments')) {
        $attachments = $request->file('attachments');
        foreach ($attachments as $file) {
            $path = $file->store('attachments', 'public');
            $announcement->attachments()->create([
                'file_path' => $path,
                'file_name' => $file->getClientOriginalName(),
                'file_size' => $file->getSize(),
                'mime_type' => $file->getMimeType(),
            ]);
        }
    }

    return response()->json([
        'message' => 'Announcement created successfully.',
        'announcement' => $announcement->load('attachments'),
    ]);
}


    public function getAnnouncements()
    {
        $user = auth()->user();

        $groups = Group::getGroupsForUser($user);

        $announcements = Announcement::whereIn('group_id', $groups->pluck('id'))
            ->with('user', 'group', 'attachments')
            ->get()
            ->map(function ($announcement) {
                return [
                    'group_name' => $announcement->group->name,
                    'group_description' => $announcement->group->description,
                    'announcement_title' => $announcement->title,
                    'announcement_content' => $announcement->content,
                    'announcement_date' => $announcement->date,
                    'posted_by' => $announcement->user->name,
                    'attachments' => $announcement->attachments->map(function ($attachment) {
                        return [
                            'url' => asset('storage/' . $attachment->file_path),
                            'file_name' => $attachment->file_name,
                        ];
                    }),
                ];
            });

        return response()->json([
            'user' => $user->name,
            'announcements' => $announcements,
        ]);
    }
}

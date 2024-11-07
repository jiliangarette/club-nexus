<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\PostResource;
use App\Models\PostAttachment;
use Illuminate\Support\Str;
use App\Models\Group;
use App\Models\Post;
use Inertia\Inertia;


class PostController extends Controller
{

    public function index($groupId)
    {
        $group = Group::find($groupId);

        if (!$group) {
            return response()->json(['message' => 'Group not found.'], 404);
        }

        $posts = Post::with([
            'user' => function ($query) {
                $query->select('id', 'name', 'avatar', 'is_admin');
            },
            'attachments' => function ($query) {
                $query->select('id', 'post_id', 'name', 'path', 'mime', 'size', 'created_at', 'updated_at');
            }
        ])->where('group_id', $groupId)
          ->orderBy('created_at', 'DESC')
          ->get();

        if ($posts->isEmpty()) {
            return response()->json([
                'selectedClub' => $group->toConversationArray(),
                'message' => 'No posts found for this group.'
            ], 404);
        }

        $posts = $posts->map(function ($post) {
            return [
                'id' => $post->id,
                'content' => $post->content,
                'user_id' => $post->user_id,
                'group_id' => $post->group_id,
                'created_at' => $post->created_at,
                'user' => [
                    'id' => $post->user->id,
                    'is_admin' => $post->user->is_admin,
                    'name' => $post->user->name,
                    'avatar_url' => $post->user->avatar ? '/storage/' . $post->user->avatar : null,
                ],
                'attachments' => $post->attachments->map(function ($attachment) {
                    return [
                        'id' => $attachment->id,
                        'name' => $attachment->name,
                        'url' => '/storage/' . $attachment->path,
                        'mime' => $attachment->mime,
                        'size' => $attachment->size,
                        'created_at' => $attachment->created_at,
                        'updated_at' => $attachment->updated_at,
                    ];
                }),
            ];
        });

        return response()->json([
            'selectedClub' => $group->toConversationArray(),
            'posts' => $posts,
        ]);
    }

    public function byGroup(Group $group)
    {
        $posts = Post::with('user')->where('group_id', $group->id)->get();

        return Inertia::render('Home', [
            'selectedClub' => $group->toConversationArray(),
            'groupId' => $group->id,
            'posts' => $posts,
        ]);
    }

    public function store(StorePostRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = auth()->id();

        $files = $data['attachments'] ?? [];

        $post = Post::create($data);
        $attachments = [];

        if ($files) {
            foreach ($files as $file) {
                $directory = 'attachments/' . Str::random(32);
                Storage::makeDirectory($directory);

                $model = [
                    'post_id' => $post->id,
                    'name' => $file->getClientOriginalName(),
                    'mime' => $file->getClientMimeType(),
                    'size' => $file->getSize(),
                    'path' => $file->store($directory, 'public')
                ];
                $attachment = PostAttachment::create($model);
                $attachments[] = $attachment;
            }
            $post->attachments()->saveMany($attachments);
        }

        $post->load(['user:id,name,avatar,is_admin', 'attachments']);

        return new PostResource($post);
    }

}

<?php

namespace App\Events;

use App\Http\Resources\PostResource;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Models\Post;

class SocketPost implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(public Post $post)
    {
        //
    }

    public function broadcastWith(): array
    {
        return [
            'message' => new PostResource($this->post),
        ];
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        $m = $this->post;
        $channels = [];

        if ($m->group_id) {
            $channels[] = new PrivateChannel('post.group.' . $m->group_id);
        } else {
            $channels[] =  new PrivateChannel('post.user.' . collect([$m->user_id])->sort()->implode('-'));
        }

        return $channels;
    }
}

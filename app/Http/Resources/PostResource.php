<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
  // In PostResource.php
// public function toArray($request)
// {
//     return [
//         'id' => $this->id,
//         'user_id' => $this->user_id,
//         'group_id' => $this->group_id,
//         'content' => $this->content,
//         'created_at' => $this->created_at,
//         'updated_at' => $this->updated_at,
//         'attachments' => $this->whenLoaded('attachments'),  // Make sure attachments are included if loaded
//     ];
// }
public function toArray($request)
{
    return [
        'id' => $this->id,
        'content' => $this->content,
        'user_id' => $this->user_id,
        'group_id' => $this->group_id,
        'created_at' => $this->created_at,
        'updated_at' => $this->updated_at,

        'user' => [
            'id' => $this->user->id,
            'is_admin' => $this->user->is_admin,
            'name' => $this->user->name,
            'avatar_url' => $this->user->avatar ? '/storage/' . $this->user->avatar : null,
        ],

        'attachments' => $this->attachments->map(function ($attachment) {
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
}

}



<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class PostAttachmentResource extends JsonResource
{
    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'post_id' => $this->post_id, // Links attachment to specific post
            'name' => $this->name, // Original file name
            'mime' => $this->mime, // MIME type (e.g., image/jpeg)
            'size' => $this->size, // File size in bytes
            'url' => Storage::url($this->path), // Public URL of the attachment
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}

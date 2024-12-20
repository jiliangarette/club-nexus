<?php

// PostAttachment.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostAttachment extends Model
{
    use HasFactory;

    protected $fillable = [
        'post_id',
        'name',
        'path',
        'mime',
        'size',
    ];

    public function post()
    {
        return $this->belongsTo(Post::class, 'post_id'); // Specify 'post_id' if needed
    }
}

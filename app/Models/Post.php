<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',  // The ID of the user who created the post
        'group_id', // The ID of the group where the post is made
        'content',  // The content of the post
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function group(){
        return $this->belongsTo(Group::class);
    }
    public function attachments(){
        return $this->hasMany(PostAttachment::class);
    }
}

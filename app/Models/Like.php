<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    use HasFactory;

    // If you want to allow mass assignment for certain attributes
    protected $fillable = [
        'user_id',  // The ID of the user who liked the post
        'post_id',  // The ID of the post being liked
    ];

    // Relationship to the User who made the like
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relationship to the Post (or Message) being liked
    public function post()
    {
        return $this->belongsTo(Post::class); // Change to Message::class if you are liking messages instead
    }
}

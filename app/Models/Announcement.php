<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'group_id',
        'title',
        'content',
        'date',
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }


    public function group()
    {
        return $this->belongsTo(Group::class);
    }


    public function attachments()
    {
        return $this->hasMany(AnnouncementAttachment::class, 'announcement_id');
    }
}

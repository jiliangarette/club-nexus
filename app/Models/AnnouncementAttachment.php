<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnnouncementAttachment extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'announcement_id',
        'file_path',
        'file_name',
        'file_size',
        'mime_type',
    ];
}

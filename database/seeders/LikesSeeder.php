<?php

namespace Database\Seeders;

use App\Models\Like;
use App\Models\Post; // Assuming your messages or posts are in this model
use App\Models\User;
use Illuminate\Database\Seeder;

class LikesSeeder extends Seeder
{
    /**
     * Seed the likes table.
     */
    public function run()
    {
        // Get all users
        $users = User::all();

        // Get all posts/messages (change this to your specific model if necessary)
        $posts = Post::all();

        // Seed likes for random users on random posts
        foreach ($posts as $post) {
            // Randomly determine the number of likes for each post
            $numberOfLikes = rand(1, count($users) / 2); // Like up to half of the users

            // Get random users to like the post
            $likedUsers = $users->random($numberOfLikes)->pluck('id');

            foreach ($likedUsers as $userId) {
                Like::create([
                    'user_id' => $userId,
                    'post_id' => $post->id,
                ]);
            }
        }
    }
}

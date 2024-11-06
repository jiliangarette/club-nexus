<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker; // Use Faker for generating dummy data

class PostSeeder extends Seeder
{
    /**
     * Seed the post's table.
     */
   public function run()
    {
        $faker = Faker::create();

        // Create 10 sample posts
        for ($i = 0; $i < 10; $i++) {
            DB::table('posts')->insert([
                'user_id' => rand(1, 5), // Assuming you have at least 5 users
                'group_id' => rand(1, 5), // Assuming you have at least 5 groups
                'content' => $faker->text(200), // Random text content
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}

<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Seed the user's table.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Jilian Garette A. Abangan',
            'email' => 'jiliangarette@gmail.com',
            'avatar' => 'avatars/jilian.png',
            'password' => bcrypt('password'),
            'is_admin' => true,
        ]);
        User::factory()->create([
            'name' => 'Thomas Shelby',
            'email' => 'peakyblinders@gmail.com',
            'avatar' => 'avatars/shelby.jpg',
            'password' => bcrypt('password'),
        ]);
        User::factory()->create([
            'name' => 'Robert C. Martin',
            'email' => 'cleancode@gmail.com',
            'avatar' => 'avatars/bob.jfif',
            'password' => bcrypt('password'),
            'is_admin' => true,
        ]);
        User::factory()->create([
            'name' => 'Taylor Swift',
            'email' => 'enchanted@gmail.com',
            'avatar' => 'avatars/taylor.jpg',
            'password' => bcrypt('password'),
        ]);
        User::factory()->create([
            'name' => 'Elon Musk',
            'email' => 'tesla@gmail.com',
            'avatar' => 'avatars/cyber.jpg',
            'password' => bcrypt('password'),
            'is_admin' => true,
        ]);
        User::factory()->create([
            'name' => 'Mark Zuckerberg',
            'email' => 'facebook@gmail.com',
            'avatar' => 'avatars/thread.jpg',
            'password' => bcrypt('password'),
        ]);
        User::factory()->create([
            'name' => 'Walter White',
            'email' => 'heisenberg@gmail.com',
            'avatar' => 'avatars/walter.jpg',
            'password' => bcrypt('password'),
        ]);
        User::factory()->create([
            'name' => 'Ragnar Lothbrok',
            'email' => 'ragnar@gmail.com',
            'avatar' => 'avatars/ragnar.jpg',
            'password' => bcrypt('password'),
        ]);
    }
}

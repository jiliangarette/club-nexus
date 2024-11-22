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
            'avatar' => 'avatars/jilian.jpg',
            'password' => bcrypt('password'),
            'is_admin' => true,
        ]);
        User::factory()->create([
            'name' => 'John Doe',
            'email' => 'john@gmail.com',
            'avatar' => 'avatars/avatar1.png',
            'password' => bcrypt('password'),
        ]);
        User::factory()->create([
            'name' => 'Robert C. Martin',
            'email' => 'cleancode@gmail.com',
            'avatar' => 'avatars/avatar2.png',
            'password' => bcrypt('password'),
            'is_admin' => true,
        ]);
        User::factory()->create([
            'name' => 'Jane Smith',
            'email' => 'jane@gmail.com',
            'avatar' => 'avatars/avatar3.png',
            'password' => bcrypt('password'),
        ]);
        User::factory()->create([
            'name' => 'Michael Lee',
            'email' => 'michael@gmail.com',
            'avatar' => 'avatars/avatar4.png',
            'password' => bcrypt('password'),
            'is_admin' => true,
        ]);
        User::factory()->create([
            'name' => 'Sarah Brown',
            'email' => 'sarah@gmail.com',
            'avatar' => 'avatars/avatar5.png',
            'password' => bcrypt('password'),
        ]);
        User::factory()->create([
            'name' => 'Chris Wilson',
            'email' => 'chris@gmail.com',
            'avatar' => 'avatars/avatar6.png',
            'password' => bcrypt('password'),
        ]);

    }
}

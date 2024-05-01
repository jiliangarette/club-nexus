<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Jilian Abangan',
            'email' => 'jilian@gmail.com',
            'password' => bcrypt('password'),
            'is_admin' => true
        ]);
        User::factory()->create([
            'name' => 'Garette Abadia',
            'email' => 'garette@gmail.com',
            'password' => bcrypt('password'),
        ]);
    }
}
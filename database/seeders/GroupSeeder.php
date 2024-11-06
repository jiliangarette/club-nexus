<?php

namespace Database\Seeders;

use App\Models\Group;
use Illuminate\Database\Seeder;

class GroupSeeder extends Seeder
{
    /**
     * Seed the group's table.
     */
    public function run(): void
    {
        // Create 5 groups with the owner set to user with ID 1
        for ($i = 0; $i < 5; $i++) {
            Group::factory()->create([
                'owner_id' => 1, // Set owner_id to 1
            ]);
        }
    }
}

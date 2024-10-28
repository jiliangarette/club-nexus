<?php

namespace Database\Seeders;

use Carbon\Carbon;
use App\Models\Conversation;
use App\Models\User;
use App\Models\Group;
use App\Models\Message;
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
            'name' => 'Jilian Garette A. Abangan',
            'email' => 'jiliangarette@gmail.com',
            'avatar' => 'avatars/jilian.png',
            'password' => bcrypt('password'),
            'is_admin' => true
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
            'is_admin' => true
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
            'is_admin' => true
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




        // User::factory(10)->create();

        // for ($i = 0; $i < 5; $i++){
        //     $group = Group::factory()->create([
        //         'owner_id' => 1,
        //     ]);
        //     $users = User::inRandomOrder()->limit(rand(2, 5))->pluck('id');
        //     $group->users()->attach(array_unique([1 , ...$users]));
        // }
        // Message::factory(100)->create();
        // $messages = Message::whereNull('group_id')->orderBy('created_at')->get();

        // $conversations = $messages->groupBy(function ($message) {
        //     return collect([$message->sender_id, $message->receiver_id])->sort()->implode('_');
        // })->map(function ($groupMessages){
        //     return [
        //         'user_id1' => $groupMessages->first()->sender_id,
        //         'user_id2' => $groupMessages->first()->receiver_id,
        //         'last_message_id' => $groupMessages->last()->id,
        //         'created_at' => new Carbon(),
        //         'updated_at' => new Carbon(),
        //     ];
        // })->values();

        // Conversation::insertOrIgnore($conversations->toArray());
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Http\Requests\StoreGroupRequest;
use App\Http\Requests\UpdateGroupRequest;
use App\Jobs\DeleteGroupJob;

class GroupController extends Controller
{

    public function store(StoreGroupRequest $request)
    {
      $data = $request->validated();
      $user_ids = $data['user_ids'] ?? [];
      $group = Group::create($data);
      $group->users()->attach(array_unique([$request->user()->id, ...$user_ids]));

      return redirect()->back();
    }

    public function update(UpdateGroupRequest $request, Group $group)
    {
      $data = $request->validated();
      $user_ids = $data['user_ids'] ?? [];
      $group->update($data);
      $group->users()->detach();
      $group->users()->attach(array_unique([$request->user()->id, ...$user_ids]));

      return redirect()->back();
    }

    public function destroy(Group $group)
    {
        if ($group->owner_id !== auth()->user()->id) {
        abort(403);
    }


      DeleteGroupJob::dispatch($group)->delay(now()->addSeconds(1));

      return response()->json(['message'=> 'Group delete was scheduled and will be deleted soon']);

    }
}


/**
* index
* Display a listing of the resource.
*
* create
* Show the form for creating a new resource.
*
*store
* Store a newly created resource in storage.
*
*show
* Display the specified resource.
*
*edit
* Show the form for editing the specified resource.
*
*update
* Update the specified resource in storage.
*
*destroy
* Remove the specified resource from storage.
*/

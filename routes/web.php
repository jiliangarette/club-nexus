<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'active'])->group(function () {
    Route::get('/',[HomeController::class, 'home'])->name('dashboard');
    Route::get('/chat',[ChatController::class, 'chat'])->name('chat');
    Route::get('chat/member/{user}', [MessageController::class, 'byUser'])->name('chat.user');
    Route::get('chat/club/{group}', [MessageController::class, 'byGroup'])->name('chat.group');
    Route::get('feed/club/{group}', [MessageController::class, 'byGroup'])->name('feed.group');
    Route::post('/message', [MessageController::class, 'store'])->name('message.store');
    Route::delete('/message/{message}', [MessageController::class, 'destroy'])->name('message.destroy');
    Route::get('/message/older/{message}', [MessageController::class, 'loadOlder'])->name('message.loadOlder');

    Route::post('/group', [GroupController::class, 'store'])->name('group.store');
    Route::put('/group/{group}', [GroupController::class, 'update'])->name('group.update');
    Route::delete('/group/{group}', [GroupController::class, 'destroy'])->name('group.destroy');

    Route::middleware(['admin'])->group(function() {
       Route::post('/user', [UserController::class, 'store'])->name('user.store');
       Route::post('/user/change-role/{user}', [UserController::class, 'changeRole'])->name('user.changeRole');
       Route::post('/user/block-unblock/{user}', [UserController::class, 'blockUnblock'])->name('user.blockUnblock');
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class ConfirmablePasswordController extends Controller
{
    /**
     * Show the confirm password view.
     */
    public function show(): Response
    {
        return Inertia::render('Auth/ConfirmPassword');
    }

    /**
     * Confirm the user's password.
     */
    // public function store(Request $request): RedirectResponse
    // {
    //     if (! Auth::guard('web')->validate([
    //         'email' => $request->user()->email,
    //         'password' => $request->password,
    //     ])) {
    //         throw ValidationException::withMessages([
    //             'password' => __('auth.password'),
    //         ]);
    //     }

    //     $request->session()->put('auth.password_confirmed_at', time());

    //     return redirect()->intended(route('dashboard', absolute: false));
    // }
    public function store(Request $request): RedirectResponse
{
    // Since no password is required, just confirm the user based on email
    if ($request->user()->email) {
        // Store the confirmation timestamp
        $request->session()->put('auth.password_confirmed_at', time());

        // Redirect to the intended page or dashboard
        return redirect()->intended(route('dashboard'));
    }

    // If something went wrong (no email), throw an error
    return redirect()->back()->withErrors([
        'email' => 'Unable to confirm your account.',
    ]);
}

}

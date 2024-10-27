<x-mail::message>
Hello {{ $user->name }},

@if ($user->blocked_at)
Your account has been suspended. You will no longer be able to log in.
@else
Your account has been activated. You can now use the system normally.

Login to Your Account: {{ route('login') }}
    @endif



Thank you,
<br>
{{ config('app.name') }}
</x-mail::message>


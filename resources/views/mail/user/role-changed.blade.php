<x-mail::message>
Hello {{ $user->name }},

@if ($user->is_admin)
Congratulations! You are now an Admin. You have the ability to add and block users, manage content, and oversee system operations.
@else
Your role has been changed to a Regular User. You can access your account and use the system normally, but you will not have admin privileges.
@endif

 <br>

Thank you,
<br>
{{ config('app.name') }}
</x-mail::message>


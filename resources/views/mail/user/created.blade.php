<x-mail::message>
Hi {{ $user->name }},

Your account has been successfully created. Here are your login details:

**Email:** {{ $user->email }}  
**Password:** {{ $password }}

For your security, we recommend changing your password after your first login. Please keep this information safe. If you have any questions, feel free to reach out to our support team.

<x-mail::button url="{{ route('login') }}">
Login to Your Account
</x-mail::button>

Thank you,  
{{ config('app.name') }}
</x-mail::message>

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
        'content' => 'nullable | string',
        'group_id' => 'required_without:receiver_id|nullable|exists:groups,id',
        'attachments' => 'nullable|array|max:10',
        'attachments.*' => 'file|max:1024000'
        ];
    }
}

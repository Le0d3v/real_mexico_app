<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rules\Password as PasswordRules;
use Illuminate\Foundation\Http\FormRequest;

class PasswordRequest extends FormRequest
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
            "current_password" => ["required"],
            "password" => [
                "required",
                "confirmed",
                // PasswordRules::min(8)->letters()->numbers()
            ]
        ];
    }

    public function messages()
    {
        return [
            "current_password" => "La contraeña actual es requerida",
            "password.required" => "La contraseña nueva es requerida",
            "password.min" => "La contraseña debe contener mínimo 8 caracteres",
            "password.confirmed" => "Las contraseñas nuevas no coinciden",
            // "password.password" => "La contraseña nueva debe incluir números y letras"
        ];
    }
}

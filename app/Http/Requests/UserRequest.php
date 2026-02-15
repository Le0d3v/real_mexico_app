<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
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
            "name" => "required|string",
            "apellido_paterno" => "required|string",
            "apellido_materno" => "required|string",
            "fecha_nacimiento" => "required|date",
            "curp" => "required|string|min:18|max:18",
            "genero" => "required|string",
            "email" => "required|email|unique:users,email",
            "telefono" => "required|numeric|unique:users,telefono",
        ];
    }

    public function messages()
    {
        return [
            "name.required" => "El nombre es requerido",
            "name.string" => "El nombre debe conformar solo letras",
            "apellido_paterno.required" => "El apellido paterno es requerido",
            "apellido_paterno.string" => "El apellido paterno debe conformar solo letras",
            "apellido_matenrno.required" => "El apellido materno es requerido",
            "apellido_matenrno.string" => "El apellido materno debe conformar solo letras",
            "fecha_nacimiento" => "La fecha de nacimiento es requerida",
            "fecha_nacimiento.date" => "La fecha de nacimiento debe ser una fecha",
            "curp.reuired" => "La CURP es requerida",
            "curp.string" => "La CURP debe ser una cadena de texto",
            "curp.min" => "La CURP debe contener 18 caracteres",
            "curp.max" => "La CURP debe contener 18 caracteres",
            "genero.required" => "El genero es requerido",
            "genero.string" => "El genero proporcionado no es válido",
            "email.required" => "El nombre es requerido",
            "email.email" => "Correo elecrónico no válido",
            "email.unique" => "El correo electrónico ya existe, pruebe con otro",
            "telefono.required" => "El número de teléfono es requerido",
            "telefono.numeric" => "El número de teléfono debe estar conformado solo por números",
            "telefono.unique" => "El número de teléfono ya existe, pruebe con otro",
        ];
    }
}

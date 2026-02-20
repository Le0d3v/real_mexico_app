<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TutorRequest extends UserRequest
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
        return array_merge(parent::rules(), [
            'ocupacion' => 'required|string|max:255',
            'nivel_estudios' => 'required|string|max:255',
            "calle" => ["required", "string"],
            "numero_interior" => ["nullable", "string"],
            "numero_exterior" => ["required", "string"],
            "localidad" => ["required", "string"],
            "municipio" => ["required", "string"],
            "entidad" => ["required", "string"],
            "cp" => ["required", "string", "size:5"],
        ]);
    }

    public function messages()
    {
        return array_merge(parent::messages(), [
            'ocupacion.required' => 'La ocupación es requerida',
            'nivel_estudios.required' => 'El nivel de estudios es requerido',
        ]);
    }
}

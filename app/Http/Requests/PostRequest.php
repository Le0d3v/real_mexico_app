<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostRequest extends FormRequest
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
            "titulo" => ["required", "string"],
            "descripcion" => ["required", "string"],
            "contenido_multimedia" => [
                $this->isMethod('post') ? 'required' : 'nullable',
                'image',
                'mimes:jpg,jpeg,png',
            ],
        ];
    }

    public function messages()
    {
        return [
            "titulo.required" => "El titulo es requerido",
            "titulo.string" => "Titulo no valido",
            "descripcion.required" => "La descripcion es requerida",
            "descripcion.string" => "Descripción no valida",
            "contenido_multimedia.required" => "Debes seleccionar una Imágen",
            "contenido_multimedia.image" => "La imágen no es válida",
        ];
    }
}

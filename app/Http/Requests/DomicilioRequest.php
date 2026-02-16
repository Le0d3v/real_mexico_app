<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class DomicilioRequest extends FormRequest
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
            "calle" => ["required", "string"],
            "numero_interior" => ["nullable", "string"],
            "numero_exterior" => ["required", "string"],
            "localidad" => ["required", "string"],
            "municipio" => ["required", "string"],
            "entidad" => ["required", "string"],
            "cp" => ["required", "string"],
        ];
    }


    public function messages()
    {
        return [
            "calle.required" => "La calle es requerida",
            "calle.string" => "La calle no es válida, prueba nuevamente",
            "numero_interior.string" => "El número interior no es válido, intente nuevamente",
            "numero_exterior.required" => "El número exterior es requerido",
            "numero_exterior.string" => "El número exterior no es válido, intente nuevamente",
            "localidad.string" => "La localidad no es válida, intente nuevamente",
            "localidad.required" => "La localidad es requerida",
            "municipio.string" => "El municipio no es válido, intente nuevamente",
            "municipio.required" => "El municipio es requerido",
            "entidad.string" => "La entidad no es válida, intente nuevamente",
            "entidad.required" => "La Entidad Federativa es requerida",
            "cp.string" => "El código postal no es válida, intente nuevamente",
            "cp.required" => "El código postal es requerido",
        ];
    }
}

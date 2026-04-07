<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PagoRequest extends FormRequest
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
            "colegiatura_id" => "required|array|min:1",
            "colegiatura_id.*" => "integer|exists:colegiaturas,id",
            "estudiante_id" => "required|numeric",
            "tutor_id" => "required|numeric",
            "asunto" => "required|string",
            "fecha_pago" => "required|date",
            "monto" => "required|numeric",
            "metodo_pago" => "required",
            "referencia" => "string|nullable",
            "observaciones" => "string|nullable",
        ];

    }

    public function messages()
    {
        return [
            "colegiatura_id.required" => "Debes seleccionar al menos una colegiatura",
            "colegiatura_id.array" => "Formato de colegiatura inválido",
            "colegiatura_id.*.integer" => "ID de colegiatura inválido",
            "colegiatura_id.*.exists" => "Una de las colegiaturas no existe",
            "estudiante_id.required" => "Debes seleccionar un estudiante",
            "estudiante_id.numeric" => "Error al capturar el estudiante. Intente nuevamente",
            "tutor_id.required" => "Debes seleccionar un tutor",
            "tutor_id.numeric" => "Error al capturar el tutor. Intente nuevamente",
            "asunto.required" => "El asunto es requerido",
            "asunto.string" => "Asunto no válido, intente nuevamente",
            "fecha_pago.required" => "La fecha del registro es requerida",
            "fecha_pago.date" => "Fecha de registro no válida. Intente nuevamente",
            "monto.required" => "El monto es requerido",
            "monto.numeric" => "Asunto no válido. Intente nuevamente",
            "metodo_pago.required" => "El método de pago es requerido",
            "metodo_pago.string" => "Método de pago no válido. Intente nuevamente",
            "referencia.string" => "Referencia No válida. Intente nuevamente",
            "observaciones.string" => "Formato para observaciones no válido. Intente nuevamente",
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'colegiatura_id' => is_array($this->colegiatura_id)
                ? $this->colegiatura_id
                : [$this->colegiatura_id],
        ]); 
    }
}

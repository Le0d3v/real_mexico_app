<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EstudianteRequest extends FormRequest
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

            /* =========================
            ESTUDIANTE
            ========================= */
            "student.nombre" => "required|string|max:255",
            "student.apellido_paterno" => "required|string|max:255",
            "student.apellido_materno" => "required|string|max:255",
            "student.fecha_nacimiento" => "required|date",
            "student.curp" => "required|string|max:18|unique:estudiantes,curp," . $this->route('estudiante'),
            "student.genero" => "required|string",
            "student.entidad_nacimiento" => "required|string|max:255",
            "student.tipo_sangre" => "required|string|max:3",
            "student.lengua_materna" => "required|string|max:255",
            "student.discapacidad" => "required|string|max:255",
            "student.grado" => "required|exists:grados,id",
            "student.grupo" => "required|exists:grupos,id",

            /* =========================
            DOMICILIO
            ========================= */
            "address.calle" => "required|string|max:255",
            "address.numero_exterior" => "required|string|max:50",
            "address.colonia" => "required|string|max:255",
            "address.municipio" => "required|string|max:255",
            "address.entidad" => "required|string|max:255",
            "address.cp" => "required|string|max:10",

            /* =========================
            TUTOR (RELACIÓN)
            ========================= */
            "tutor.relacion.parentesco" => "required|string",
            "tutor.relacion.responsable_pagos" => "required|boolean",
            "tutor.relacion.contacto_principal" => "required|boolean",

            /* =========================
            TUTOR EXISTENTE
            ========================= */
            "tutor.tutor_id" => "nullable|exists:tutores,id",

            /* =========================
            NUEVO TUTOR (CONDICIONAL)
            ========================= */
            "tutor.new_tutor.name" => "required_without:tutor.tutor_id|string|max:255",
            "tutor.new_tutor.apellido_paterno" => "required_without:tutor.tutor_id|string|max:255",
            "tutor.new_tutor.apellido_materno" => "required_without:tutor.tutor_id|string|max:255",
            "tutor.new_tutor.telefono" => "required_without:tutor.tutor_id|string|max:20",
            "tutor.new_tutor.genero" => "required_without:tutor.tutor_id|string",
        ];
    }

    public function messages()
    {
        return [

            /* =========================
            ESTUDIANTE
            ========================= */
            "student.nombre.required" => "El nombre del estudiante es obligatorio.",
            "student.nombre.string" => "El nombre debe contener texto válido.",
            "student.nombre.max" => "El nombre no puede exceder los 255 caracteres.",

            "student.apellido_paterno.required" => "El apellido paterno es obligatorio.",
            "student.apellido_paterno.string" => "El apellido paterno debe contener texto válido.",
            "student.apellido_paterno.max" => "El apellido paterno no puede exceder los 255 caracteres.",

            "student.apellido_materno.required" => "El apellido materno es obligatorio.",
            "student.apellido_materno.string" => "El apellido materno debe contener texto válido.",
            "student.apellido_materno.max" => "El apellido materno no puede exceder los 255 caracteres.",

            "student.fecha_nacimiento.required" => "La fecha de nacimiento es obligatoria.",
            "student.fecha_nacimiento.date" => "La fecha de nacimiento no tiene un formato válido.",

            "student.curp.required" => "El CURP es obligatorio.",
            "student.curp.string" => "El CURP debe ser texto válido.",
            "student.curp.max" => "El CURP no puede exceder los 18 caracteres.",
            "student.curp.unique" => "El CURP ya está registrado en otro estudiante.",

            "student.genero.required" => "El género es obligatorio.",

            "student.entidad_nacimiento.required" => "La entidad de nacimiento es obligatoria.",
            "student.entidad_nacimiento.max" => "La entidad de nacimiento es demasiado larga.",

            "student.tipo_sangre.required" => "El tipo de sangre es obligatorio.",
            "student.tipo_sangre.max" => "El tipo de sangre no es válido.",

            "student.lengua_materna.required" => "La lengua materna es obligatoria.",

            "student.discapacidad.required" => "Debe indicar si el estudiante presenta alguna discapacidad.",

            "student.grado.required" => "Debe seleccionar un grado.",
            "student.grado.exists" => "El grado seleccionado no es válido.",

            "student.grupo.required" => "Debe seleccionar un grupo.",
            "student.grupo.exists" => "El grupo seleccionado no es válido.",

            /* =========================
            DOMICILIO
            ========================= */
            "address.calle.required" => "La calle del domicilio es obligatoria.",
            "address.calle.max" => "El nombre de la calle es demasiado largo.",

            "address.numero.required" => "El número del domicilio es obligatorio.",
            "address.numero.max" => "El número del domicilio es demasiado largo.",

            "address.colonia.required" => "La colonia es obligatoria.",

            "address.municipio.required" => "El municipio es obligatorio.",

            "address.estado.required" => "El estado es obligatorio.",
                "address.cp.required" => "El código postal es obligatorio.",
                "address.cp.max" => "El código postal es demasiado largo.",

            /* =========================
            TUTOR - RELACIÓN
            ========================= */
            "tutor.relacion.parentesco.required" => "Debe especificar el parentesco del tutor con el estudiante.",

            "tutor.relacion.responsable_pagos.required" => "Debe indicar si el tutor es responsable de pagos.",
            "tutor.relacion.responsable_pagos.boolean" => "El valor de responsable de pagos no es válido.",

            "tutor.relacion.contacto_principal.required" => "Debe indicar si es el contacto principal.",
            "tutor.relacion.contacto_principal.boolean" => "El valor de contacto principal no es válido.",

            /* =========================
            TUTOR EXISTENTE
            ========================= */
            "tutor.tutor_id.exists" => "El tutor seleccionado no existe en el sistema.",

            /* =========================
            NUEVO TUTOR
            ========================= */
            "tutor.new_tutor.name.required_without" => "Debe registrar un tutor nuevo o seleccionar uno existente.",
            "tutor.new_tutor.name.max" => "El nombre del tutor es demasiado largo.",

            "tutor.new_tutor.apellido_paterno.required_without" => "El apellido paterno del tutor es obligatorio.",
            "tutor.new_tutor.apellido_materno.required_without" => "El apellido materno del tutor es obligatorio.",

            "tutor.new_tutor.telefono.required_without" => "El teléfono del tutor es obligatorio.",
            "tutor.new_tutor.telefono.max" => "El teléfono del tutor es demasiado largo.",

            "tutor.new_tutor.genero.required_without" => "El género del tutor es obligatorio.",
        ];
    }
}

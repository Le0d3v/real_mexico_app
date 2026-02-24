import React from "react";
import { GraduationCap, User, Users } from "lucide-react";

export default function EstudianteCard({ estudiante }) {
    const nombreCompleto = `${estudiante.nombre} ${estudiante.apellido_paterno} ${estudiante.apellido_materno}`;

    return (
        <div className="bg-white border border-indigo-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 space-y-5">
            {/* Nombre del Estudiante */}
            <div className="text-center border-b border-b-indigo-200 pb-4">
                <div className="flex justify-center">
                    <div className="flex justify-center items-center p-2 bg-indigo-300 text-indigo-600 rounded-full">
                        <User className="h-8 w-8" />
                    </div>
                </div>
                <h2 className="text-xl md:text-xl font-semibold text-gray-800 mt-1">
                    {nombreCompleto}
                </h2>
            </div>

            {/* Datos Académicos */}
            <div className="flex justify-center gap-10">
                {/* Grado */}
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2 text-indigo-600 mb-2">
                        <GraduationCap size={18} />
                        <span className="text-sm font-medium text-gray-600">
                            Grado
                        </span>
                    </div>

                    <span className="px-4 py-2 rounded-xl bg-indigo-100 text-indigo-700 font-semibold text-lg shadow-sm">
                        {estudiante.grado}
                    </span>
                </div>

                {/* Grupo */}
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2 text-violet-600 mb-2">
                        <Users size={18} />
                        <span className="text-sm font-medium text-gray-600">
                            Grupo
                        </span>
                    </div>

                    <span className="px-4 py-2 rounded-xl bg-violet-100 text-violet-700 font-semibold text-lg shadow-sm">
                        {estudiante.grupo}
                    </span>
                </div>
            </div>
            {/* Información de Relación */}
            <div className="border-t border-indigo-100 pt-5 space-y-4">
                <h3 className="text-sm font-semibold text-gray-600 tracking-wide text-center">
                    Información de Relación
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Parentesco */}
                    <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-center">
                        <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                            Parentesco
                        </p>
                        <p className="font-semibold text-indigo-700">
                            {estudiante.relacion?.parentesco || "—"}
                        </p>
                    </div>

                    {/* Responsable de Pagos */}
                    <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-center">
                        <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                            Responsable de Pagos
                        </p>
                        <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold mt-1${
                                estudiante.relacion?.responsable_pagos
                                    ? "bg-emerald-200 text-emerald-700"
                                    : "bg-gray-200 text-gray-600"
                            }`}
                        >
                            {estudiante.relacion?.responsable_pagos
                                ? "Sí"
                                : "No"}
                        </span>
                    </div>

                    {/* Contacto Principal */}
                    <div className="bg-sky-50 border border-sky-100 rounded-xl p-4 text-center">
                        <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                            Contacto Principal
                        </p>
                        <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold $ mt-1 {
                                estudiante.relacion?.contacto_principal
                                    ? "bg-sky-200 text-sky-700"
                                    : "bg-gray-200 text-gray-600"
                            }`}
                        >
                            {estudiante.relacion?.contacto_principal
                                ? "Sí"
                                : "No"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

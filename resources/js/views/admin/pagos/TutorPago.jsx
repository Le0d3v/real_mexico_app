import { User, Phone, Mail } from "lucide-react";

export default function TutorPago({ tutor, selected }) {
    const nombreCompleto = `${tutor.usuario.name} ${tutor.usuario.apellido_paterno} ${tutor.usuario.apellido_materno}`;

    return (
        <>
            <div
                className={`rounded-2xl p-6 shadow-sm transition-all duration-300 space-y-5 cursor-pointer
                    ${
                        selected
                            ? "bg-indigo-50 border-4 border-indigo-600 ring-2 ring-indigo-300 scale-105 shadow-xl"
                            : "bg-white border border-indigo-200 hover:shadow-md hover:scale-105"
                    }
                `}
            >
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

                <div className="border-t border-indigo-100 pt-5 space-y-4">
                    <h3 className="text-sm font-semibold text-gray-600 tracking-wide text-center">
                        Información de Relación
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-center">
                            <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                                Parentesco
                            </p>
                            <p className="font-semibold text-indigo-700">
                                {tutor?.relacion?.parentesco || "—"}
                            </p>
                        </div>
                        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-center">
                            <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                                Responsable de Pagos
                            </p>
                            <span
                                className={`px-3 py-1 rounded-full text-sm font-semibold mt-1${
                                    tutor?.relacion?.responsable_pagos
                                        ? "bg-emerald-200 text-emerald-700"
                                        : "bg-gray-200 text-gray-600"
                                }`}
                            >
                                {tutor?.relacion?.responsable_pagos
                                    ? "Sí"
                                    : "No"}
                            </span>
                        </div>
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
                                {tutor?.relacion?.contacto_principal
                                    ? "Sí"
                                    : "No"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

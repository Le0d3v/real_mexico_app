import { Phone, Mail, User } from "lucide-react";

export default function TutorCard({ tutor }) {
    const nombreCompleto = `${tutor.usuario.name} ${tutor.usuario.apellido_paterno} ${tutor.usuario.apellido_materno}`;

    return (
        <>
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
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-2 text-indigo-600 mb-2">
                            <Phone size={18} />
                            <span className="text-sm font-medium text-gray-600">
                                Número Telefónico
                            </span>
                        </div>

                        <span className="px-4 py-2 rounded-xl bg-indigo-100 text-indigo-700 font-semibold text-lg shadow-sm">
                            {tutor.usuario.telefono}
                        </span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-2 text-violet-600 mb-2">
                            <Mail size={18} />
                            <span className="text-sm font-medium text-gray-600">
                                Correo Electrónico
                            </span>
                        </div>

                        <span className="px-4 py-2 rounded-xl bg-violet-100 text-violet-700 font-semibold text-lg shadow-sm">
                            {tutor.usuario.email}
                        </span>
                    </div>
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

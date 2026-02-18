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
        </div>
    );
}

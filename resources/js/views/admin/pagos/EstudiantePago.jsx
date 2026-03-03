import { User, IdCard, GraduationCap, Users, CheckCircle } from "lucide-react";

export default function EstudiantePago({ estudiante, seleccionado }) {
    return (
        <div
            className={`
                relative p-5 rounded-2xl border-2 shadow-md transition-all duration-300 cursor-pointer
                ${
                    seleccionado
                        ? "border-red-600 bg-gradient-to-br from-red-50 to-white shadow-red-200 "
                        : "border-gray-200 bg-white hover:border-red-400 hover:shadow-lg "
                }
            `}
        >
            {/* Indicador visual de selección */}
            {seleccionado && (
                <div className="absolute top-3 right-3 text-red-600">
                    <CheckCircle size={22} />
                </div>
            )}

            {/* Avatar */}
            <div className="flex justify-center mb-4">
                <div
                    className={`
                        flex items-center justify-center w-14 h-14 rounded-full shadow-inner
                        ${
                            seleccionado
                                ? "bg-red-600 text-white"
                                : "bg-amber-100 text-amber-600"
                        }
                    `}
                >
                    <User size={26} />
                </div>
            </div>

            {/* Nombre completo */}
            <h1 className="text-center font-semibold text-gray-800 text-lg leading-tight">
                {estudiante.nombre} {estudiante.apellido_paterno}{" "}
                {estudiante.apellido_materno}
            </h1>

            {/* Matrícula */}
            <div className="flex items-center justify-center gap-2 mt-2 text-sm text-gray-600">
                <IdCard size={16} />
                <span className="font-medium">
                    Matrícula: {estudiante.matricula}
                </span>
            </div>

            {/* División académica */}
            <div className="flex justify-center gap-6 mt-4 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                    <GraduationCap size={16} className="text-red-500" />
                    <span>
                        <strong>Grado:</strong> {estudiante.grado}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <Users size={16} className="text-red-500" />
                    <span>
                        <strong>Grupo:</strong> {estudiante.grupo}
                    </span>
                </div>
            </div>
        </div>
    );
}

import {
    User,
    GraduationCap,
    Hash,
    Users,
    Calendar,
    IdCard,
    VenusAndMars,
} from "lucide-react";
import { formatDate } from "../../../helpers/helpers";

export default function StudentCard({ student }) {
    return (
        <div className="border border-gray-200 bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition flex flex-col md:flex-row gap-8">
            {/* Perfil */}
            <div className="flex flex-col items-center md:w-1/3 border-b md:border-b-0 md:border-r border-gray-200 pb-6 md:pb-0 md:pr-8">
                <div className="p-4 rounded-full bg-red-100 flex items-center justify-center">
                    <User className="w-16 h-16 text-red-600" />
                </div>

                <p className="text-lg font-semibold text-gray-800 mt-4 text-center leading-snug">
                    {student.nombre} {student.apellido_paterno}{" "}
                    {student.apellido_materno}
                </p>

                <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                    <Hash size={16} />
                    {student.matricula}
                </p>
            </div>

            {/* Datos Personales */}
            <div className="flex-1 space-y-3">
                <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2 border-b pb-2">
                    <IdCard size={18} />
                    Datos Personales
                </h2>

                <p className="flex items-center gap-2 text-gray-600 text-sm">
                    <Calendar size={16} />
                    <span className="font-medium text-gray-700">
                        Nacimiento:
                    </span>
                    {formatDate(student.fecha_nacimiento)}
                </p>

                <p className="flex items-center gap-2 text-gray-600 text-sm">
                    <Hash size={16} />
                    <span className="font-medium text-gray-700">CURP:</span>
                    {student.curp}
                </p>

                <p className="flex items-center gap-2 text-gray-600 text-sm">
                    <VenusAndMars size={16} />
                    <span className="font-medium text-gray-700">Género:</span>
                    {student.genero}
                </p>
            </div>

            {/* Datos Académicos */}
            <div className="flex-1 space-y-3">
                <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2 border-b pb-2">
                    <GraduationCap size={18} />
                    Datos Académicos
                </h2>

                <p className="flex items-center gap-2 text-gray-600 text-sm">
                    <Hash size={16} />
                    <span className="font-medium text-gray-700">
                        Matrícula:
                    </span>
                    {student.matricula}
                </p>

                <p className="flex items-center gap-2 text-gray-600 text-sm">
                    <GraduationCap size={16} />
                    <span className="font-medium text-gray-700">Grado:</span>
                    {student.grado}
                </p>

                <p className="flex items-center gap-2 text-gray-600 text-sm">
                    <Users size={16} />
                    <span className="font-medium text-gray-700">Grupo:</span>
                    {student.grupo}
                </p>
            </div>
        </div>
    );
}

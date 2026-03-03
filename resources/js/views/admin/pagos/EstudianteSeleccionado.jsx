import {
    GraduationCap,
    IdCard,
    Users,
    User,
    XCircle,
    BookOpen,
    UserCheck,
} from "lucide-react";

import ColegiaturaPago from "./ColegiaturaPago";
import TutorPago from "./TutorPago";

export default function EstudianteSeleccionado({ estudiante, onClear }) {
    const nombreCompleto = `${estudiante.nombre} ${estudiante.apellido_paterno} ${estudiante.apellido_materno}`;

    return (
        <div className="space-y-6">
            {/* ===============================
                INFORMACIÓN DEL ESTUDIANTE
            =============================== */}
            <div className="w-full p-6 rounded-2xl border-2 border-red-600 bg-gradient-to-br from-red-50 to-white shadow-md flex flex-col md:flex-row gap-6">
                {/* Identidad */}
                <div className="flex items-center gap-4 md:w-2/3">
                    <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow">
                        <User size={28} />
                    </div>

                    <div>
                        <h1 className="text-xl font-semibold text-gray-800">
                            {nombreCompleto}
                        </h1>

                        <div className="flex flex-wrap gap-6 mt-3 text-sm text-gray-700">
                            <div className="flex items-center gap-2">
                                <IdCard size={18} className="text-red-500" />
                                <span>
                                    <strong>Matrícula:</strong>{" "}
                                    {estudiante.matricula}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <GraduationCap
                                    size={18}
                                    className="text-red-500"
                                />
                                <span>
                                    <strong>Grado:</strong> {estudiante.grado}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Users size={18} className="text-red-500" />
                                <span>
                                    <strong>Grupo:</strong> {estudiante.grupo}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Acción */}
                <div className="md:w-1/3 flex justify-end items-start">
                    <button
                        type="button"
                        onClick={onClear}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-400 transition cursor-pointer"
                    >
                        <XCircle size={18} />
                        Descartar
                    </button>
                </div>
            </div>

            {/* ===============================
                COLEGIATURAS
            =============================== */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
                <div className="flex items-center gap-3 border-b border-gray-200 pb-3 mb-5">
                    <div className="p-2 rounded-full bg-red-100">
                        <BookOpen className="text-red-600" size={22} />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">
                        Seleccione la Colegiatura
                    </h2>
                </div>
                <p>Seleccione una colegiatura dando clic</p>

                {estudiante.colegiaturas?.length === 0 ? (
                    <p className="text-gray-400 text-sm">
                        No hay colegiaturas registradas para este estudiante.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                        {estudiante.colegiaturas.map((colegiatura) => (
                            <ColegiaturaPago colegiatura={colegiatura} />
                        ))}
                    </div>
                )}
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
                <div className="flex items-center gap-3 border-b border-gray-200 pb-3 mb-5">
                    <div className="p-2 rounded-full bg-red-100">
                        <UserCheck className="text-red-600" size={22} />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">
                        Seleccione un Tutor
                    </h2>
                </div>
                <p>
                    El tutor seleccionado se registrará como el resonsable del
                    pago
                </p>

                {estudiante.tutores?.length === 0 ? (
                    <p className="text-gray-400 text-sm">
                        No hay colegiaturas registradas para este estudiante.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                        {estudiante.tutores.map((tutor) => (
                            <TutorPago tutor={tutor} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

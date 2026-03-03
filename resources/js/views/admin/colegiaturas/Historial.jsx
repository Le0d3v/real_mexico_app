import {
    Calendar,
    GraduationCap,
    Hash,
    IdCard,
    User,
    Users,
} from "lucide-react";
import InfoItem from "../components/InfoItem";
import ColegiaturaCard from "./ColegiaturaCard";

export default function Historial({ colegiaturas, student, onClose }) {
    console.log(colegiaturas);

    return (
        <>
            <div className="space-y-8">
                <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
                    <div className="flex items-center gap-3 border-b border-b-gray-300 pb-4">
                        <div className="p-2 flex items-center justify-center rounded-full bg-red-200">
                            <User className="w-8 h-8 text-red-600" />
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Alumno
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InfoItem
                            icon={<User size={18} />}
                            label="Nombre Completo"
                            value={
                                student.estudiante.nombre +
                                " " +
                                student.estudiante.apellido_paterno +
                                " " +
                                student.estudiante.apellido_materno
                            }
                        />
                        <InfoItem
                            icon={<IdCard size={18} />}
                            label="Matricula"
                            value={student.estudiante.matricula}
                        />
                        <InfoItem
                            icon={<GraduationCap size={18} />}
                            label="Grado"
                            value={student.estudiante.grado}
                        />
                        <InfoItem
                            icon={<Users size={18} />}
                            label="Grupo"
                            value={student.estudiante.grupo}
                        />
                    </div>
                </section>
                <section className="bg-gray-50 rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">
                    <div className="flex items-center gap-3 border-b border-b-gray-300 pb-4">
                        <div className="p-2 flex items-center justify-center rounded-full bg-red-200">
                            <Calendar className="w-8 h-8 text-red-600" />
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Colegiaturas
                        </h2>
                    </div>

                    <div className="grid grid-cols-subgrid md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {colegiaturas.map((e) => (
                            <ColegiaturaCard key={e.id} colegiatura={e} />
                        ))}
                    </div>
                </section>
                <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex justify-between gap-4 items-center">
                    <h1 className="text-3xl font-semibold text-red-400">
                        Acciones
                    </h1>
                    <div className="flex gap-5">
                        <button
                            type="button"
                            className="px-6 py-2 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
                            onClick={() => onClose(false)}
                        >
                            Cerrar
                        </button>
                    </div>
                </section>
            </div>
        </>
    );
}

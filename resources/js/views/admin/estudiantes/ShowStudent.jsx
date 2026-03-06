import {
    User,
    Calendar,
    VenusAndMars,
    MapPin,
    Hash,
    Users,
    Home,
    Droplet,
    School,
    Binary,
    GraduationCap,
} from "lucide-react";
import InfoItem from "../components/InfoItem";
import TutorCard from "./TutorCard";
import { formatDate } from "../../../helpers/helpers";

export default function ShowStudent({ student, onClose }) {
    const domicilio = student.domicilio;

    return (
        <>
            <div className="space-y-8">
                <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
                    <div className="flex items-center gap-3 border-b border-b-gray-300 pb-4">
                        <div className="p-2 flex items-center justify-center rounded-full bg-red-200">
                            <User className="w-8 h-8 text-red-600" />
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Datos Personales
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InfoItem
                            icon={<User size={18} />}
                            label="Nombre"
                            value={student.nombre}
                        />
                        <InfoItem
                            icon={<User size={18} />}
                            label="Apellido Paterno"
                            value={student.apellido_paterno}
                        />
                        <InfoItem
                            icon={<User size={18} />}
                            label="Apellido Materno"
                            value={student.apellido_materno}
                        />
                        <InfoItem
                            icon={<Calendar size={18} />}
                            label="Fecha de Nacimiento"
                            value={formatDate(student.fecha_nacimiento)}
                        />
                        <InfoItem
                            icon={<Hash size={18} />}
                            label="CURP"
                            value={student.curp}
                        />
                        <InfoItem
                            icon={<VenusAndMars size={18} />}
                            label="Genero"
                            value={student.genero}
                        />
                        <InfoItem
                            icon={<Droplet size={18} />}
                            label="Tipo de Sangre"
                            value={student.tipo_sangre}
                        />
                        <InfoItem
                            icon={<MapPin size={18} />}
                            label="Entidad de Nacimiento"
                            value={student.entidad_nacimiento}
                        />
                    </div>
                </section>
                <section className="bg-gray-50 rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">
                    <div className="flex items-center gap-3 border-b border-b-gray-300 pb-4">
                        <div className="p-2 flex items-center justify-center rounded-full bg-red-200">
                            <School className="w-8 h-8 text-red-600" />
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Datos Escolares
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InfoItem
                            icon={<Binary size={18} />}
                            label="Matricula"
                            value={student.matricula}
                        />

                        <InfoItem
                            icon={<User size={18} />}
                            label="Estado"
                            value={student.estado}
                        />

                        <InfoItem
                            icon={<GraduationCap size={18} />}
                            label="Gardo"
                            value={student.grado}
                        />

                        <InfoItem
                            icon={<Users size={18} />}
                            label="Grupo"
                            value={student.grupo}
                        />
                    </div>
                </section>
                <section className="bg-gray-50 rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">
                    <div className="flex items-center gap-3 border-b border-b-gray-300 pb-4">
                        <div className="p-2 flex items-center justify-center rounded-full bg-red-200">
                            <Home className="w-8 h-8 text-red-600" />
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Datos de Domicilio
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InfoItem
                            icon={<MapPin size={18} />}
                            label="Calle"
                            value={domicilio.calle}
                        />

                        <InfoItem
                            icon={<Hash size={18} />}
                            label="Número Exterior"
                            value={domicilio.numero_exterior}
                        />

                        <InfoItem
                            icon={<Hash size={18} />}
                            label="Número Interior"
                            value={domicilio.numero_interior || "Sin Número"}
                        />

                        <InfoItem
                            icon={<MapPin size={18} />}
                            label="Colonia"
                            value={domicilio.colonia}
                        />

                        <InfoItem
                            icon={<MapPin size={18} />}
                            label="Localidad"
                            value={domicilio.localidad}
                        />

                        <InfoItem
                            icon={<MapPin size={18} />}
                            label="Municipio"
                            value={domicilio.municipio}
                        />

                        <InfoItem
                            icon={<MapPin size={18} />}
                            label="Estado"
                            value={domicilio.entidad}
                        />

                        <InfoItem
                            icon={<Hash size={18} />}
                            label="Código Postal"
                            value={domicilio.cp}
                        />
                    </div>
                </section>
                <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
                    <div className="flex items-center gap-3 border-b border-b-gray-300 pb-4">
                        <div className="p-2 flex items-center justify-center rounded-full bg-red-200">
                            <Users className="w-6 h-6 text-red-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800">
                            Tutores Asociados
                        </h2>
                    </div>

                    {student?.tutores?.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {student.tutores.map((tutor, i) => (
                                <TutorCard tutor={tutor} key={i} />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-500">
                            No hay Tutores asociados a este Estudiante.
                        </div>
                    )}
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

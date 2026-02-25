import {
    User,
    Calendar,
    Phone,
    Mail,
    MapPin,
    Home,
    Hash,
    Users,
    VenusAndMars,
} from "lucide-react";
import EstudianteCard from "./EstudianteCard";
import Swal from "sweetalert2";
import useTutor from "../../../hooks/useTutor";
import InfoItem from "../components/InfoItem";

export default function ShowTutor({ tutor, onClose }) {
    if (!tutor) return null;

    const domicilio = tutor.domicilio || {};

    const { deleteTutor } = useTutor();

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Al eliminar el tutor, se perderán las relaciones con estudiantes asociados al tutor. Esta acción no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Sí, eliminar",
            reverseButtons: true,
        });

        if (!result.isConfirmed) return;

        try {
            const data = await deleteTutor(id);

            await Swal.fire({
                title: "Eliminado",
                text: data.message,
                icon: "success",
            });

            onClose(false);
        } catch (error) {
            await Swal.fire({
                title: "Error",
                text: "No se pudo eliminar.",
                icon: "error",
            });
        }
    };

    return (
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
                        label="Nombre Completo"
                        value={`${tutor.name} ${tutor.apellido_paterno} ${tutor.apellido_materno}`}
                    />

                    <InfoItem
                        icon={<Calendar size={18} />}
                        label="Fecha de Nacimiento"
                        value={tutor.fecha_nacimiento}
                    />

                    <InfoItem
                        icon={<Hash size={18} />}
                        label="CURP"
                        value={tutor.curp}
                    />

                    <InfoItem
                        icon={<VenusAndMars size={18} />}
                        label="Genero"
                        value={tutor.genero}
                    />

                    <InfoItem
                        icon={<Hash size={18} />}
                        label="Ocupación"
                        value={tutor.tutor.ocupacion}
                    />
                    <InfoItem
                        icon={<Hash size={18} />}
                        label="Nivel de Estudios"
                        value={tutor.tutor.nivel_estudios}
                    />

                    <InfoItem
                        icon={<Phone size={18} />}
                        label="Teléfono"
                        value={tutor.telefono}
                    />

                    <InfoItem
                        icon={<Mail size={18} />}
                        label="Correo Electrónico"
                        value={tutor.email}
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
                        value={domicilio.numero_interior || "—"}
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
                        Estudiantes Asociados
                    </h2>
                </div>

                {tutor?.tutor?.estudiantes?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {tutor.tutor.estudiantes.map((estudiante) => (
                            <EstudianteCard estudiante={estudiante} />
                        ))}
                    </div>
                ) : (
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-500">
                        No hay estudiantes asociados a este tutor.
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
                        className="px-6 py-2 rounded-xl border bg-red-500 text-white hover:bg-red-600 transition cursor-pointer font-semibold"
                        onClick={() => handleDelete(tutor.id)}
                    >
                        Eliminar Tutor
                    </button>
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
    );
}

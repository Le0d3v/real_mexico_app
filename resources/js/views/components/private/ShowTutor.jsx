import {
    User,
    Calendar,
    Phone,
    Mail,
    MapPin,
    Home,
    Hash,
    Users,
} from "lucide-react";

export default function ShowTutor({ tutor }) {
    if (!tutor) return null;

    const domicilio = tutor.domicilio || {};

    return (
        <div className="space-y-8">
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
                <div className="flex items-center gap-3 border-b pb-4">
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
                        icon={<Hash size={18} />}
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
                <div className="flex items-center gap-3 border-b pb-4">
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
                <div className="flex items-center gap-3 border-b pb-4">
                    <Users className="w-6 h-6 text-red-600" />
                    <h2 className="text-xl font-semibold text-gray-800">
                        Estudiantes Asociados
                    </h2>
                </div>

                {tutor?.tutor?.estudiantes?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {tutor.tutor.estudiantes.map((estudiante) => (
                            <div
                                key={estudiante.id}
                                className="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:shadow-sm transition"
                            >
                                <p className="font-semibold text-gray-800">
                                    {estudiante.nombre}{" "}
                                    {estudiante.apellido_paterno}{" "}
                                    {estudiante.apellido_materno}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-500">
                        No hay estudiantes asociados a este tutor.
                    </div>
                )}
            </section>
        </div>
    );
}

function InfoItem({ icon, label, value }) {
    return (
        <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-sm transition">
            <div className="text-red-600 mt-1">{icon}</div>
            <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-base font-semibold text-gray-800 break-words">
                    {value || "N/A"}
                </p>
            </div>
        </div>
    );
}

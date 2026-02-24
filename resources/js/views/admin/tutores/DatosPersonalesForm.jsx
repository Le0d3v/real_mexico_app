import { User, Calendar, Phone, Mail, Hash, VenusAndMars } from "lucide-react";
import InputField from "./InputField";

export default function DatosPersonalesForm({ form, handleChange }) {
    return (
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
            <div className="flex items-center gap-3 border-b border-gray-300 pb-4">
                <div className="p-2 flex items-center justify-center rounded-full bg-red-200">
                    <User className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">
                    Datos Personales
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                    icon={<User size={18} />}
                    label="Nombre(s)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <InputField
                    icon={<User size={18} />}
                    label="Apellido Paterno"
                    value={apellidoPaterno}
                    onChange={(e) => setApellidoPaterno(e.target.value)}
                />
                <InputField
                    icon={<User size={18} />}
                    label="Apellido Materno"
                    value={apellidoMaterno}
                    onChange={(e) => setApellidoMaterno(e.target.value)}
                />
                <InputField
                    icon={<Calendar size={18} />}
                    label="Fecha de Nacimiento"
                    type="date"
                    value={fechaNacimiento}
                    onChange={(e) => setFechaNacimiento(e.target.value)}
                />
                <InputField
                    icon={<Hash size={18} />}
                    label="CURP"
                    value={curp}
                    onChange={(e) => setCurp(e.target.value)}
                />

                <SelectField
                    icon={<VenusAndMars size={18} />}
                    label="Género"
                    options={["M", "F"]}
                    value={genero}
                    onChange={(e) => setGenero(e.target.value)}
                />

                <InputField
                    icon={<Hash size={18} />}
                    label="Ocupación"
                    value={ocupacion}
                    onChange={(e) => setOcupacion(e.target.value)}
                />
                <SelectField
                    icon={<Hash size={18} />}
                    label="Nivel de Estudios"
                    value={nivelEstudios}
                    onChange={(e) => setNivelEstudios(e.target.value)}
                    options={[
                        "Primaria",
                        "Secundaria",
                        "Preparatoria",
                        "Licenciatura",
                        "Postgrado",
                    ]}
                />
                <InputField
                    icon={<Phone size={18} />}
                    label="Teléfono"
                    type="tel"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                />
                <InputField
                    icon={<Mail size={18} />}
                    label="Correo Electrónico"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
        </section>
    );
}

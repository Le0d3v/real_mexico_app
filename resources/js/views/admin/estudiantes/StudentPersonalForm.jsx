import {
    User,
    Calendar,
    Hash,
    VenusAndMars,
    GraduationCap,
    Users,
    MapPin,
    Droplet,
    Speech,
    Accessibility,
} from "lucide-react";

import InputField from "../components/InputField";
import SelectField from "../components/SelectField";

import {
    estados,
    tiposDeSangre,
    discapacidades,
    lenguasMaternas,
    grados,
    grupos,
} from "../../../helpers/data";

export default function StudentPersonalForm({ form, onChange }) {
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
                    value={form.nombre}
                    onChange={(e) => onChange("nombre", e.target.value)}
                />

                <InputField
                    icon={<User size={18} />}
                    label="Apellido Paterno"
                    value={form.apellido_paterno}
                    onChange={(e) =>
                        onChange("apellido_paterno", e.target.value)
                    }
                />

                <InputField
                    icon={<User size={18} />}
                    label="Apellido Materno"
                    value={form.apellido_materno}
                    onChange={(e) =>
                        onChange("apellido_materno", e.target.value)
                    }
                />

                <InputField
                    icon={<Calendar size={18} />}
                    label="Fecha de Nacimiento"
                    type="date"
                    value={form.fecha_nacimiento}
                    onChange={(e) =>
                        onChange("fecha_nacimiento", e.target.value)
                    }
                />

                <InputField
                    icon={<Hash size={18} />}
                    label="CURP"
                    value={form.curp}
                    onChange={(e) => onChange("curp", e.target.value)}
                />

                <SelectField
                    icon={<VenusAndMars size={18} />}
                    label="Género"
                    options={["Masculino", "Femenino"]}
                    value={form.genero}
                    onChange={(e) => onChange("genero", e.target.value)}
                />

                <SelectField
                    icon={<GraduationCap size={18} />}
                    label="Grado"
                    options={grados}
                    value={form.grado}
                    onChange={(e) => onChange("grado", Number(e.target.value))}
                />

                <SelectField
                    icon={<Users size={18} />}
                    label="Grupo"
                    options={grupos}
                    value={form.grupo}
                    onChange={(e) => onChange("grupo", Number(e.target.value))}
                />

                <SelectField
                    icon={<MapPin size={18} />}
                    label="Entidad de Nacimiento"
                    options={estados}
                    value={form.entidad_nacimiento}
                    onChange={(e) =>
                        onChange("entidad_nacimiento", e.target.value)
                    }
                />

                <SelectField
                    icon={<Droplet size={18} />}
                    label="Tipo de Sangre"
                    options={tiposDeSangre}
                    value={form.tipo_sangre}
                    onChange={(e) => onChange("tipo_sangre", e.target.value)}
                />

                <SelectField
                    icon={<Speech size={18} />}
                    label="Lengua Materna"
                    options={lenguasMaternas}
                    value={form.lengua_materna}
                    onChange={(e) => onChange("lengua_materna", e.target.value)}
                />

                <SelectField
                    icon={<Accessibility size={18} />}
                    label="Discapacidad"
                    options={discapacidades}
                    value={form.discapacidad}
                    onChange={(e) => onChange("discapacidad", e.target.value)}
                />
            </div>
        </section>
    );
}

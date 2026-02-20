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
import useTutor from "../../../hooks/useTutor";
import { toast } from "react-toastify";
import SubmitButton from "../SubmitButton";
import estados from "../../../helpers/estados";
import { useState } from "react";

export default function CrearTutor({ onClose }) {
    const { crearTutor } = useTutor();

    const [cargando, setCargando] = useState(false);

    const [nombre, setNombre] = useState("");
    const [apellidoPaterno, setApellidoPaterno] = useState("");
    const [apellidoMaterno, setApellidoMaterno] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [curp, setCurp] = useState("");
    const [genero, setGenero] = useState("");
    const [ocupacion, setOcupacion] = useState("");
    const [nivelEstudios, setNivelEstudios] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");

    return (
        <form className="space-y-8">
            {/* ================= DATOS PERSONALES ================= */}
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
                    <InputField icon={<User size={18} />} label="Nombre(s)" />
                    <InputField
                        icon={<User size={18} />}
                        label="Apellido Paterno"
                    />
                    <InputField
                        icon={<User size={18} />}
                        label="Apellido Materno"
                    />
                    <InputField
                        icon={<Calendar size={18} />}
                        label="Fecha de Nacimiento"
                        type="date"
                    />
                    <InputField icon={<Hash size={18} />} label="CURP" />

                    <SelectField
                        icon={<VenusAndMars size={18} />}
                        label="Género"
                        options={["Masculino", "Femenino"]}
                    />

                    <InputField icon={<Hash size={18} />} label="Ocupación" />
                    <SelectField
                        icon={<Hash size={18} />}
                        label="Nivel de Estudios"
                        options={[
                            "Primaria",
                            "Secundaria",
                            "Bachillerato",
                            "Ingenieria / Licenciatura",
                            "Postgrado",
                        ]}
                    />
                    <InputField
                        icon={<Phone size={18} />}
                        label="Teléfono"
                        type="tel"
                    />
                    <InputField
                        icon={<Mail size={18} />}
                        label="Correo Electrónico"
                        type="email"
                    />
                </div>
            </section>

            {/* ================= DOMICILIO ================= */}
            <section className="bg-gray-50 rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-300 pb-4">
                    <div className="p-2 flex items-center justify-center rounded-full bg-red-200">
                        <Home className="w-8 h-8 text-red-600" />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Datos de Domicilio
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField icon={<MapPin size={18} />} label="Calle" />
                    <InputField
                        icon={<Hash size={18} />}
                        label="Número Exterior"
                    />
                    <InputField
                        icon={<Hash size={18} />}
                        label="Número Interior"
                    />
                    <InputField icon={<MapPin size={18} />} label="Colonia" />
                    <InputField icon={<MapPin size={18} />} label="Localidad" />
                    <InputField icon={<MapPin size={18} />} label="Municipio" />
                    <SelectField
                        icon={<MapPin size={18} />}
                        label="Estado"
                        options={estados}
                    />
                    <InputField
                        icon={<Hash size={18} />}
                        label="Código Postal"
                    />
                </div>
            </section>

            {/* ================= BOTONES ================= */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex justify-end gap-4">
                <button
                    type="button"
                    className="px-6 py-2 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
                    onClick={() => onClose(false)}
                >
                    Cerrar
                </button>

                <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition shadow-sm cursor-pointer"
                >
                    Guardar Tutor
                </button>
            </section>
        </form>
    );
}

function InputField({ icon, label, type = "text" }) {
    return (
        <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-200 focus-within:ring-2 focus-within:ring-red-500 transition">
            <div className="text-red-600 mt-1">{icon}</div>
            <div className="w-full">
                <label className="text-sm text-gray-500 block mb-1">
                    {label}
                </label>
                <input
                    type={type}
                    className="w-full bg-transparent outline-none text-gray-800 font-medium"
                    placeholder={`Ingrese ${label.toLowerCase()}`}
                />
            </div>
        </div>
    );
}

function SelectField({ icon, label, options }) {
    return (
        <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-200 focus-within:ring-2 focus-within:ring-red-500 transition">
            <div className="text-red-600 mt-1">{icon}</div>
            <div className="w-full">
                <label className="text-sm text-gray-500 block mb-1">
                    {label}
                </label>
                <select className="w-full bg-transparent outline-none text-gray-800 font-medium rounded">
                    <option value="">Seleccione una opción</option>
                    {options.map((opt, index) => (
                        <option key={index} value={opt} className="p-1 rounded">
                            {opt}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

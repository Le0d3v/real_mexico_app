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
import { ClipLoader } from "react-spinners";

export default function CrearTutor({ onClose }) {
    const { createTutor } = useTutor();

    const [cargando, setCargando] = useState(false);

    const [name, setName] = useState("");
    const [apellidoPaterno, setApellidoPaterno] = useState("");
    const [apellidoMaterno, setApellidoMaterno] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [curp, setCurp] = useState("");
    const [genero, setGenero] = useState("");
    const [ocupacion, setOcupacion] = useState("");
    const [nivelEstudios, setNivelEstudios] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");

    const [calle, setCalle] = useState("");
    const [numeroExterior, setNumeroExterior] = useState("");
    const [numeroInterior, setNumeroInterior] = useState("");
    const [colonia, setColonia] = useState("");
    const [localidad, setLocalidad] = useState("");
    const [municipio, setMunicipio] = useState("");
    const [entidad, setEntidad] = useState("");
    const [cp, setCp] = useState("");

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        setCargando(true);

        const datos = {
            name,
            apellido_paterno: apellidoPaterno,
            apellido_materno: apellidoMaterno,
            fecha_nacimiento: fechaNacimiento,
            curp,
            genero,
            ocupacion,
            nivel_estudios: nivelEstudios,
            telefono,
            email,
            calle,
            numero_exterior: numeroExterior,
            numero_interior: numeroInterior,
            colonia,
            localidad,
            municipio,
            entidad,
            cp,
        };

        console.log(datos);
        try {
            const response = await createTutor(datos);
            toast.success(response.message);
            onClose(false);
        } catch (error) {
            if (error?.status === 422) {
                Object.values(error.data.errors).forEach((messages) =>
                    messages.forEach((message) => toast.error(message)),
                );
            } else {
                toast.error("Error inesperado al registrar el tutor.");
            }
            console.log(error);
        } finally {
            setCargando(false);
        }
    };

    return (
        <form className="space-y-8" onSubmit={handleSubmitForm}>
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
                            "Bachillerato",
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
                    <InputField
                        icon={<MapPin size={18} />}
                        label="Calle"
                        value={calle}
                        onChange={(e) => setCalle(e.target.value)}
                    />
                    <InputField
                        icon={<Hash size={18} />}
                        label="Número Exterior"
                        value={numeroExterior}
                        onChange={(e) => setNumeroExterior(e.target.value)}
                    />
                    <InputField
                        icon={<Hash size={18} />}
                        label="Número Interior"
                        value={numeroInterior}
                        onChange={(e) => setNumeroInterior(e.target.value)}
                    />
                    <InputField
                        icon={<MapPin size={18} />}
                        label="Colonia"
                        value={colonia}
                        onChange={(e) => setColonia(e.target.value)}
                    />
                    <InputField
                        icon={<MapPin size={18} />}
                        label="Localidad"
                        value={localidad}
                        onChange={(e) => setLocalidad(e.target.value)}
                    />
                    <InputField
                        icon={<MapPin size={18} />}
                        label="Municipio"
                        value={municipio}
                        onChange={(e) => setMunicipio(e.target.value)}
                    />
                    <SelectField
                        icon={<MapPin size={18} />}
                        label="Estado"
                        options={estados}
                        value={entidad}
                        onChange={(e) => setEntidad(e.target.value)}
                    />
                    <InputField
                        icon={<Hash size={18} />}
                        label="Código Postal"
                        value={cp}
                        onChange={(e) => setCp(e.target.value)}
                    />
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

                    <button
                        type="submit"
                        className="px-6 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition shadow-sm cursor-pointer"
                    >
                        {cargando ? (
                            <ClipLoader size={20} color="white" />
                        ) : (
                            <p>Guardar Cambios</p>
                        )}
                    </button>
                </div>
            </section>
        </form>
    );
}

function InputField({ icon, label, type = "text", value, onChange }) {
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
                    value={value}
                    onChange={onChange}
                />
            </div>
        </div>
    );
}

function SelectField({ icon, label, options, value, onChange }) {
    return (
        <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-200 focus-within:ring-2 focus-within:ring-red-500 transition">
            <div className="text-red-600 mt-1">{icon}</div>
            <div className="w-full">
                <label className="text-sm text-gray-500 block mb-1">
                    {label}
                </label>
                <select
                    className="w-full bg-transparent outline-none text-gray-800 font-medium rounded"
                    value={value}
                    onChange={onChange}
                >
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

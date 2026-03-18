import SubmitButton from "../../components/SubmitButton";
import {
    Calendar,
    Hash,
    Info,
    Mail,
    MapPin,
    Phone,
    User,
    VenusAndMars,
} from "lucide-react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import api from "../../../config/axios";
import { useEffect, useState } from "react";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";

export default function DatosPersonalesForm({ user, mutate }) {
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState("");
    const [apellido_paterno, setApellidoPaterno] = useState("");
    const [apellido_materno, setApellidoMaterno] = useState("");
    const [fecha_nacimiento, setFechaNacimiento] = useState("");
    const [curp, setCurp] = useState("");
    const [genero, setGenero] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setApellidoPaterno(user.apellido_paterno || "");
            setApellidoMaterno(user.apellido_materno || "");
            setFechaNacimiento(user.fecha_nacimiento || "");
            setCurp(user.curp || "");
            setGenero(user.genero || "");
            setTelefono(user.telefono || "");
            setEmail(user.email || "");
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const datos = {
            name,
            apellido_paterno,
            apellido_materno,
            fecha_nacimiento,
            curp: curp.toUpperCase(),
            genero,
            telefono,
            email,
        };

        try {
            const { data } = await api.put(
                `/api/user/update/${user.id}`,
                datos,
            );

            toast.success("Datos actualizados correctamente");
        } catch (error) {
            if (error.response?.status === 422) {
                const errors = error.response.data.errors;

                Object.values(errors).forEach((msgArray) => {
                    toast.error(msgArray[0]);
                });
            } else {
                toast.error("Ocurrió un error inesperado.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <div className="flex gap-2">
                <div className="p-1 rounded-full h-10 w-10 bg-red-500/20 text-red-500 flex justify-center items-center">
                    <User size={30} />
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-6">
                    Datos Personales
                </h1>
            </div>
            <div className="flex gap-1 items-center">
                <Info className="text-red-500" />
                <p className="text-gray-600 text-sm">
                    Modifique cualquier dato incorrecto utilizando el siguiente
                    formulario.
                </p>
            </div>

            <form
                className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 mt-5"
                onSubmit={handleSubmit}
            >
                <InputField
                    icon={<User size={18} />}
                    label="Nombre (s)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <InputField
                    icon={<User size={18} />}
                    label="Apellido Paterno"
                    value={apellido_paterno}
                    onChange={(e) => setApellidoPaterno(e.target.value)}
                />
                <InputField
                    icon={<User size={18} />}
                    label="Apellido Materno"
                    value={apellido_materno}
                    onChange={(e) => setApellidoMaterno(e.target.value)}
                />
                <InputField
                    icon={<Calendar size={18} />}
                    type="date"
                    label="Fecha de Nacimiento"
                    value={fecha_nacimiento}
                    onChange={(e) => setFechaNacimiento(e.target.value)}
                />
                <InputField
                    label="CURP"
                    value={curp}
                    onChange={(e) => setCurp(e.target.value)}
                    icon={<Hash size={18} />}
                />

                <SelectField
                    icon={<VenusAndMars size={18} />}
                    label="Género"
                    options={["Masculino", "Femenino"]}
                    value={genero}
                    onChange={(e) => setGenero(e.target.value)}
                />

                <InputField
                    icon={<Phone size={18} />}
                    label="Teléfono"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                />
                <InputField
                    icon={<Mail size={18} />}
                    label="Correo Electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <div
                    className="w-full md:col-span-2"
                    id="driver_settings-personal-save"
                >
                    <SubmitButton>
                        {loading ? (
                            <ClipLoader size={20} color="white" />
                        ) : (
                            <p>Guardar Cambios</p>
                        )}
                    </SubmitButton>
                </div>
            </form>
        </div>
    );
}

import SubmitButton from "../SubmitButton";
import { Info } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import api from "../../../config/axios";
import { useEffect, useState } from "react";

export default function DatosPersonalesForm({ user }) {
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
                `/api/update-user/${user.id}`,
                datos,
            );

            toast.success("Datos actualizados correctamente ✅");
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
            <div className="flex gap-1 items-center">
                <Info className="text-violet-500" />
                <p className="text-gray-600 text-sm">
                    Modifique cualquier dato incorrecto utilizando el siguiente
                    formulario.
                </p>
            </div>

            <form
                className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 mt-5"
                onSubmit={handleSubmit}
            >
                <Input label="Nombre" value={name} onChange={setName} />
                <Input
                    label="Apellido Paterno"
                    value={apellido_paterno}
                    onChange={setApellidoPaterno}
                />
                <Input
                    label="Apellido Materno"
                    value={apellido_materno}
                    onChange={setApellidoMaterno}
                />
                <Input
                    type="date"
                    label="Fecha de Nacimiento"
                    value={fecha_nacimiento}
                    onChange={setFechaNacimiento}
                />
                <Input label="CURP" value={curp} onChange={setCurp} />

                <div className="flex flex-col">
                    <label className="text-gray-700 font-semibold text-lg mb-2">
                        Género
                    </label>
                    <select
                        className="h-12 px-4 rounded-xl border border-gray-300 bg-gray-600 text-white font-semibold"
                        value={genero}
                        onChange={(e) => setGenero(e.target.value)}
                    >
                        <option value="">Seleccione una opción</option>
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                        <option value="O">Otro</option>
                    </select>
                </div>

                <Input
                    label="Teléfono"
                    value={telefono}
                    onChange={setTelefono}
                />
                <Input
                    label="Correo Electrónico"
                    value={email}
                    onChange={setEmail}
                />

                <div className="w-full md:col-span-2">
                    <SubmitButton>
                        {loading ? (
                            <ClipLoader size={20} />
                        ) : (
                            <p>Guardar Cambios</p>
                        )}
                    </SubmitButton>
                </div>
            </form>
        </div>
    );
}

// Componente auxiliar
function Input({ label, value, onChange, type = "text" }) {
    return (
        <div className="flex flex-col">
            <label className="text-gray-700 font-semibold text-lg mb-2">
                {label}
            </label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="h-12 px-4 rounded-xl border border-gray-300 bg-gray-600 text-white font-semibold"
            />
        </div>
    );
}

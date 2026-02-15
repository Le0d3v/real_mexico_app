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

    useEffect(() => {}, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const datos = {};

        try {
            const { data } = await api.put(
                `/api/update-user/${user.id}`,
                datos,
            );
        } catch (error) {
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
                <div className="flex flex-col">
                    <label className="text-gray-700 font-semibold text-lg mb-2">
                        Nombre
                    </label>
                    <input
                        type="text"
                        className="h-12 px-4 rounded-xl border border-gray-300 
                                       focus:outline-none focus:ring-3 
                                       focus:ring-gray-500 focus:border-gray-300
                                       text-lg transition bg-gray-600 text-white font-semibold"
                        value={user.name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-700 font-semibold text-lg mb-2">
                        Apellido Paterno
                    </label>
                    <input
                        type="text"
                        className="h-12 px-4 rounded-xl border border-gray-300 
                                       focus:outline-none focus:ring-3 
                                       focus:ring-gray-500 focus:border-gray-300
                                       text-lg transition bg-gray-600 text-white font-semibold"
                        value={user.apellido_paterno}
                        onChange={(e) => setApellidoPaterno(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-700 font-semibold text-lg mb-2">
                        Apellido Materno
                    </label>
                    <input
                        type="text"
                        className="h-12 px-4 rounded-xl border border-gray-300 
                                       focus:outline-none focus:ring-3 
                                       focus:ring-gray-500 focus:border-gray-300
                                       text-lg transition bg-gray-600 text-white font-semibold"
                        value={user.apellido_materno}
                        onChange={(e) => setApellidoMaterno(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-700 font-semibold text-lg mb-2">
                        Fecha de Nacimiento
                    </label>
                    <input
                        type="date"
                        className="h-12 px-4 rounded-xl border border-gray-300 
                                       focus:outline-none focus:ring-3 
                                       focus:ring-gray-500 focus:border-gray-300
                                       text-lg transition bg-gray-600 text-white font-semibold"
                        value={user.fecha_nacimiento}
                        onChange={(e) => setFechaNacimiento(e.target.value)}
                    />
                </div>
                <div className="flex flex-col ">
                    <label className="text-gray-700 font-semibold text-lg mb-2">
                        CURP
                    </label>
                    <input
                        type="text"
                        className="h-12 px-4 rounded-xl border border-gray-300 
                                       focus:outline-none focus:ring-3 
                                       focus:ring-gray-500 focus:border-gray-300
                                       text-lg tracking-widest uppercase transition bg-gray-600 text-white font-semibold"
                        value={user.curp}
                        onChange={(e) => setCurp(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-700 font-semibold text-lg mb-2">
                        Género
                    </label>
                    <select
                        className="h-12 px-4 rounded-xl border border-gray-300 
                                       focus:outline-none focus:ring-3 
                                       focus:ring-gray-500 focus:border-gray-300
                                       text-lg transition bg-gray-600 text-white font-semibold"
                        value={user.genero}
                        onChange={(e) => setGenero(e.target.value)}
                    >
                        <option value="">Seleccione una opción</option>
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                        <option value="O">Otro</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-700 font-semibold text-lg mb-2">
                        Número de Teléfono
                    </label>
                    <input
                        type="text"
                        className="h-12 px-4 rounded-xl border border-gray-300 
                                       focus:outline-none focus:ring-3 
                                       focus:ring-gray-500 focus:border-gray-300
                                       text-lg tracking-widest uppercase transition bg-gray-600 text-white font-semibold"
                        value={user.telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-700 font-semibold text-lg mb-2">
                        Correo Electrónico
                    </label>
                    <input
                        type="text"
                        className="h-12 px-4 rounded-xl border border-gray-300 
                                       focus:outline-none focus:ring-3 
                                       focus:ring-gray-500 focus:border-gray-300
                                       text-lg tracking-widest transition bg-gray-600 text-white font-semibold"
                        value={user.email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Botón */}
                <div className="w-full md:col-span-2">
                    <SubmitButton>
                        {loading ? <ClipLoader /> : <p>Guardar Cambios</p>}
                    </SubmitButton>
                </div>
            </form>
        </div>
    );
}

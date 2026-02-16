import SubmitButton from "../SubmitButton";
import { Info } from "lucide-react";
import { useState, useEffect } from "react";
import api from "../../../config/axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

export default function DomicilioForm({ user }) {
    const [loading, setLoading] = useState(false);

    const [calle, setCalle] = useState("");
    const [numero_exterior, setNumeroExterior] = useState("");
    const [numero_interior, setNumeroInterior] = useState("");
    const [colonia, setColonia] = useState("");
    const [localidad, setLocalidad] = useState("");
    const [municipio, setMunicipio] = useState("");
    const [entidad, setEntidad] = useState("");
    const [cp, setCp] = useState("");

    useEffect(() => {
        if (user?.domicilio) {
            setCalle(user.domicilio.calle || "");
            setNumeroExterior(user.domicilio.numero_exterior || "");
            setNumeroInterior(user.domicilio.numero_interior || "");
            setColonia(user.domicilio.colonia || "");
            setLocalidad(user.domicilio.localidad || "");
            setMunicipio(user.domicilio.municipio || "");
            setEntidad(user.domicilio.entidad || "");
            setCp(user.domicilio.cp || "");
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const datos = {
            calle,
            numero_exterior,
            numero_interior,
            colonia,
            localidad,
            municipio,
            entidad,
            cp,
        };

        try {
            await api.put(`/api/domicilio/${user.domicilio.id}`, datos);
            toast.success("Domicilio actualizado correctamente");
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
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl shadow-xl border border-gray-100 p-10">
            <div className="flex items-center gap-2 mb-5">
                <div className="text-violet-500">
                    <Info />
                </div>
                <p className="text-gray-500 text-sm">
                    Modifique cualquier dato incorrecto utilizando el siguiente
                    formulario.
                </p>
            </div>

            <form
                className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6"
                onSubmit={handleSubmit}
            >
                <Input label="Calle" value={calle} onChange={setCalle} />
                <Input
                    label="Número Exterior"
                    value={numero_exterior}
                    onChange={setNumeroExterior}
                />
                <Input
                    label="Número Interior"
                    value={numero_interior}
                    onChange={setNumeroInterior}
                />
                <Input label="Colonia" value={colonia} onChange={setColonia} />
                <Input
                    label="Localidad"
                    value={localidad}
                    onChange={setLocalidad}
                />
                <Input
                    label="Municipio"
                    value={municipio}
                    onChange={setMunicipio}
                />
                <Input
                    label="Entidad Federativa"
                    value={entidad}
                    onChange={setEntidad}
                />
                <Input label="Código Postal" value={cp} onChange={setCp} />

                <div className="flex justify-end md:col-span-2">
                    <SubmitButton>
                        {loading ? (
                            <ClipLoader size={20} color="white" />
                        ) : (
                            <p>Actualizar Domicilio</p>
                        )}
                    </SubmitButton>
                </div>
            </form>
        </div>
    );
}

function Input({ label, value, onChange }) {
    return (
        <div className="flex flex-col">
            <label className="text-md text-gray-500 font-semibold mb-2">
                {label}
            </label>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="h-12 px-4 rounded-lg border border-gray-200 bg-white text-gray-800 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-500 transition-all duration-200"
            />
        </div>
    );
}

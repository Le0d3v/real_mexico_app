import SubmitButton from "../../components/SubmitButton";
import { Hash, Info, MapPin, Home } from "lucide-react";
import { useState, useEffect } from "react";
import api from "../../../config/axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import { estados } from "../../../helpers/data";

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
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10">
            <div className="flex gap-2">
                <div className="p-1 rounded-full h-10 w-10 bg-red-500/20 text-red-500 flex justify-center items-center">
                    <Home size={25} />
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-6">
                    Datos de Domicilio
                </h1>
            </div>
            <div className="flex items-center gap-2 mb-5">
                <div className="text-red-500">
                    <Info />
                </div>
                <p className="text-gray-500 text-sm">
                    Modifique cualquier dato erróneo utilizando el siguiente
                    formulario.
                </p>
            </div>

            <form
                className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6"
                onSubmit={handleSubmit}
            >
                <InputField
                    label="Calle"
                    value={calle}
                    onChange={(e) => setCalle(e.target.value)}
                    icon={<MapPin size={18} />}
                />
                <InputField
                    icon={<Hash size={18} />}
                    label="Número Exterior"
                    value={numero_exterior}
                    onChange={(e) => setNumeroExterior(e.target.value)}
                />
                <InputField
                    icon={<Hash size={18} />}
                    label="Número Interior"
                    value={numero_interior}
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
                    label="Código Postal"
                    value={cp}
                    onChange={(e) => setCp(e.target.value)}
                    icon={<Hash size={18} />}
                />

                <div
                    className="flex justify-end md:col-span-2"
                    id="driver_settings-domicilio-save"
                >
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

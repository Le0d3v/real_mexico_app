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
    GraduationCap,
    Accessibility,
    Speech,
    Droplet,
} from "lucide-react";
import { toast } from "react-toastify";
import {
    estados,
    tiposDeSangre,
    discapacidades,
    lenguasMaternas,
} from "../../../helpers/data";
import { useState, useEffect, useMemo } from "react";
import { ClipLoader } from "react-spinners";
import useStudent from "../../../hooks/useStudent";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";

export default function CreateStudent({ onClose }) {
    return (
        <>
            <p className="mb-3">
                Complete el siguiente formulario para inscribir a un Alumno
            </p>
            <div className="space-y-8">
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
                            // value={name}
                            // onChange={(e) => setName(e.target.value)}
                        />
                        <InputField
                            icon={<User size={18} />}
                            label="Apellido Paterno"
                            // value={apellidoPaterno}
                            // onChange={(e) => setApellidoPaterno(e.target.value)}
                        />
                        <InputField
                            icon={<User size={18} />}
                            label="Apellido Materno"
                            // value={apellidoMaterno}
                            // onChange={(e) => setApellidoMaterno(e.target.value)}
                        />
                        <InputField
                            icon={<Calendar size={18} />}
                            label="Fecha de Nacimiento"
                            type="date"
                            // value={fechaNacimiento}
                            // onChange={(e) => setFechaNacimiento(e.target.value)}
                        />
                        <InputField
                            icon={<Hash size={18} />}
                            label="CURP"
                            // value={curp}
                            // onChange={(e) => setCurp(e.target.value)}
                        />

                        <SelectField
                            icon={<VenusAndMars size={18} />}
                            label="Género"
                            options={["Masculino", "Femenino"]}
                            // value={genero}
                            // onChange={(e) => setGenero(e.target.value)}
                        />

                        <SelectField
                            icon={<MapPin size={18} />}
                            label="Entidad de Nacimiento"
                            options={estados}
                            // value={ocupacion}
                            // onChange={(e) => setOcupacion(e.target.value)}
                        />
                        <SelectField
                            icon={<Droplet size={18} />}
                            label="Tipo de Sangre"
                            // value={nivelEstudios}
                            // onChange={(e) => setNivelEstudios(e.target.value)}
                            options={tiposDeSangre}
                        />
                        <SelectField
                            icon={<Speech size={18} />}
                            label="Lengua Materna"
                            // value={nivelEstudios}
                            // onChange={(e) => setNivelEstudios(e.target.value)}
                            options={lenguasMaternas}
                        />
                        <SelectField
                            icon={<Accessibility size={18} />}
                            label="Discapacidad"
                            options={discapacidades}
                            // value={telefono}
                            // onChange={(e) => setTelefono(e.target.value)}
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
                    </div>
                </section>
            </div>
        </>
    );
}

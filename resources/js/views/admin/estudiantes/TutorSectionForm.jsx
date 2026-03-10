import { useState } from "react";
import {
    Search,
    User,
    Calendar,
    Phone,
    Mail,
    Hash,
    VenusAndMars,
    UserCheck,
} from "lucide-react";

import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import TutorRelationForm from "./TutorRelationForm";
import SearchTutor from "./SearchTutor";

export default function TutorSectionForm({ tutores }) {
    const [relacionTutor, setRelacionTutor] = useState({
        parentesco: "",
        parentesco_otro: "",
        responsable_pagos: false,
        contacto_principal: false,
    });

    const [crearTutor, setCrearTutor] = useState(false);
    const [searchTutor, setSearchTutor] = useState("");
    const [selectedTutor, setSelectedTutor] = useState(null);

    /* ===============================
       FILTRO DE TUTORES
    =============================== */

    const filteredTutores = tutores?.filter((tutor) => {
        const nombreCompleto =
            `${tutor.name} ${tutor.apellido_paterno} ${tutor.apellido_materno}`.toLowerCase();

        return nombreCompleto.includes(searchTutor.toLowerCase());
    });

    const handleRelationChange = (field, value) => {
        setRelacionTutor((prev) => {
            const updated = {
                ...prev,
                [field]: value,
            };

            if (field === "parentesco" && value !== "Otro") {
                updated.parentesco_otro = "";
            }

            return updated;
        });
    };

    return (
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
            <div className="flex items-center gap-3 border-b border-gray-300 pb-4">
                <div className="p-2 flex items-center justify-center rounded-full bg-red-200">
                    <UserCheck className="w-8 h-8 text-red-600" />
                </div>

                <h2 className="text-2xl font-semibold text-gray-800">Tutor</h2>
            </div>

            {/* Selector modo */}

            <div className="flex items-center justify-between bg-gray-50 border border-gray-200 p-4 rounded-xl">
                <div>
                    <h3 className="font-semibold text-gray-700">
                        Vinculación de Tutor
                    </h3>

                    <p className="text-sm text-gray-500">
                        Busque un tutor existente o registre uno nuevo
                    </p>
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={crearTutor}
                        onChange={() => {
                            setCrearTutor(!crearTutor);
                            setSelectedTutor(null);
                            setSearchTutor("");
                        }}
                    />

                    <span className="text-sm font-medium">
                        Registrar nuevo tutor
                    </span>
                </label>
            </div>

            {/* ===============================
               BUSCADOR
            =============================== */}

            {!crearTutor && (
                <div className="space-y-4">
                    <InputField
                        icon={<Search size={18} />}
                        label="Buscar Tutor"
                        value={searchTutor}
                        onChange={(e) => setSearchTutor(e.target.value)}
                    />

                    <div className="max-h-52 overflow-y-auto border rounded-xl p-3">
                        {filteredTutores?.length === 0 && (
                            <p className="p-4 text-sm text-gray-500">
                                No se encontraron tutores
                            </p>
                        )}

                        {filteredTutores?.map((tutor) => (
                            <SearchTutor
                                key={tutor.id}
                                tutor={tutor}
                                selected={selectedTutor?.id === tutor.id}
                                onSelect={setSelectedTutor}
                            />
                        ))}
                    </div>

                    {selectedTutor && (
                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-md mt-3">
                            Tutor seleccionado:
                            <strong>
                                {" "}
                                {selectedTutor.name}{" "}
                                {selectedTutor.apellido_paterno}{" "}
                                {selectedTutor.apellido_materno}
                            </strong>
                            <p className="text-gray-600 text-sm">
                                {selectedTutor.curp}
                            </p>
                        </div>
                    )}

                    {(selectedTutor || crearTutor) && (
                        <TutorRelationForm
                            relacion={relacionTutor}
                            onChange={handleRelationChange}
                        />
                    )}
                </div>
            )}

            {/* ===============================
               NUEVO TUTOR
            =============================== */}

            {crearTutor && (
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
                            "Preparatoria",
                            "Licenciatura",
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
            )}
        </section>
    );
}

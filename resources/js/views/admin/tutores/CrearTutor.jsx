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
} from "lucide-react";
import useTutor from "../../../hooks/useTutor";
import { toast } from "react-toastify";
import estados from "../../../helpers/estados";
import { useState, useEffect, useMemo } from "react";
import { ClipLoader } from "react-spinners";
import useStudent from "../../../hooks/useStudent";
import FindStudent from "./FindStudent";
import AssignedStudentCard from "./AssignedStudentCard";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";

export default function CrearTutor({ onClose }) {
    const { createTutor } = useTutor();
    const { estudiantes, isLoading, error } = useStudent();

    const [selectedStudents, setSelectedStudents] = useState([]);
    const [search, setSearch] = useState("");
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

    const handleAddStudent = (student) => {
        const exists = selectedStudents.find((s) => s.id === student.id);
        if (exists) return;

        const newStudent = {
            id: student.id,
            nombre: student.nombre,
            apellido_paterno: student.apellido_paterno,
            grado: student.grado,
            grupo: student.grupo,
            relacion: {
                parentesco: "",
                responsable_pagos: false,
                contacto_principal: false,
            },
        };

        setSelectedStudents((prev) => [...prev, newStudent]);
    };

    const handleRemoveStudent = (id) => {
        setSelectedStudents((prev) => prev.filter((s) => s.id !== id));
    };

    const handleRelationChange = (id, field, value) => {
        setSelectedStudents((prev) =>
            prev.map((student) => {
                if (student.id !== id) return student;

                const updatedRelacion = {
                    ...student.relacion,
                    [field]: value,
                };

                // 🔥 Si cambia parentesco y NO es "Otro", limpiar parentesco_otro
                if (field === "parentesco" && value !== "Otro") {
                    updatedRelacion.parentesco_otro = "";
                }

                return {
                    ...student,
                    relacion: updatedRelacion,
                };
            }),
        );
    };

    const filteredStudents = useMemo(() => {
        if (!search.trim()) return []; // 👈 vacío al inicio

        const term = search.toLowerCase();

        return estudiantes.filter((estudiante) => {
            const nombreCompleto =
                `${estudiante.nombre ?? ""} ${estudiante.apellido_paterno ?? ""} ${estudiante.apellido_materno ?? ""}`.toLowerCase();

            return nombreCompleto.includes(term);
        });
    }, [search, estudiantes]);

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
            estudiantes: selectedStudents.map((s) => ({
                id: s.id,
                parentesco: s.relacion.parentesco,
                parentesco_otro: s.relacion.parentesco_otro || null,
                responsable_pagos: s.relacion.responsable_pagos,
                contacto_principal: s.relacion.contacto_principal,
            })),
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
                        options={["Masculino", "Femenino"]}
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
                            "Preparatoria",
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
                        label="Número Interior (Opcional)"
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

            <section className="bg-gray-50 rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-300 pb-4">
                    <div className="p-2 flex items-center justify-center rounded-full bg-red-200">
                        <GraduationCap className="w-8 h-8 text-red-600" />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Asignar Estudiantes
                    </h2>
                </div>

                <div className="flex gap-6 w-full items-stretch">
                    <div className="w-full flex flex-col">
                        <h1 className="text-center mb-3 text-xl font-semibold text-red-500">
                            Buscar Estudiantes
                        </h1>

                        <div className="rounded-2xl border border-gray-200 p-4 bg-white shadow-sm flex flex-col h-full">
                            <input
                                type="text"
                                placeholder="Buscar por Nombre, Apellidos o Matrícula"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                            />

                            <p className="text-sm text-gray-400 mt-4">
                                Resultados:
                            </p>

                            <div className="mt-3 flex-1 max-h-66 overflow-y-scroll pr-1">
                                {search.trim() !== "" &&
                                    filteredStudents.length === 0 && (
                                        <p className="text-gray-400 text-sm">
                                            No se encontraron coincidencias
                                        </p>
                                    )}

                                {filteredStudents.map((student) => (
                                    <FindStudent
                                        student={student}
                                        handleAddStudent={handleAddStudent}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col">
                        <h1 className="text-center mb-3 text-xl font-semibold text-red-500">
                            Estudiantes Asignados
                        </h1>

                        <div className="rounded-2xl border border-gray-200 p-4 bg-white shadow-sm flex flex-col h-full">
                            <div
                                className={`flex-1 max-h-86 overflow-y-scroll pr-1 
                                    ${selectedStudents.length === 0 ? "hover:cursor-not-allowed" : ""}`}
                            >
                                {selectedStudents.length === 0 ? (
                                    <div className="hover:cursor-not-allowed">
                                        <p className="text-gray-400">
                                            Sin Estudiantes Asignados
                                        </p>
                                    </div>
                                ) : (
                                    selectedStudents.map((student) => (
                                        <AssignedStudentCard
                                            key={student.id}
                                            student={student}
                                            handleRemoveStudent={
                                                handleRemoveStudent
                                            }
                                            handleRelationChange={
                                                handleRelationChange
                                            }
                                        />
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
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
                        className="px-6 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition shadow-sm cursor-pointer w-44"
                    >
                        {cargando ? (
                            <ClipLoader size={20} color="white" />
                        ) : (
                            <p>Guardar Tutor</p>
                        )}
                    </button>
                </div>
            </section>
        </form>
    );
}

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
import Loader from "../../components/Loader";

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
            prev.map((student) =>
                student.id === id
                    ? {
                          ...student,
                          relacion: {
                              ...student.relacion,
                              [field]: value,
                          },
                      }
                    : student,
            ),
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
                    {/* BUSCAR ESTUDIANTES */}
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
                                    <div
                                        key={student.id}
                                        className="
                                group p-6 rounded-2xl bg-white
                                border border-gray-200
                                hover:border-red-400
                                hover:shadow-lg
                                transition-all duration-300
                                flex items-center justify-between
                                mb-4
                            "
                                    >
                                        <div>
                                            <p className="font-semibold text-xl text-gray-700">
                                                {student.nombre}{" "}
                                                {student.apellido_paterno}{" "}
                                                {student.apellido_materno}
                                            </p>

                                            <div className="flex gap-10 mt-5">
                                                <div className="flex flex-col items-center">
                                                    <div className="flex items-center gap-2 text-indigo-600 mb-2">
                                                        <GraduationCap
                                                            size={18}
                                                        />
                                                        <span className="text-sm font-medium text-gray-600">
                                                            Grado
                                                        </span>
                                                    </div>

                                                    <span className="px-4 py-2 rounded-xl bg-indigo-100 text-indigo-700 font-semibold text-lg shadow-sm">
                                                        {student.grado}
                                                    </span>
                                                </div>

                                                <div className="flex flex-col items-center">
                                                    <div className="flex items-center gap-2 text-violet-600 mb-2">
                                                        <Users size={18} />
                                                        <span className="text-sm font-medium text-gray-600">
                                                            Grupo
                                                        </span>
                                                    </div>

                                                    <span className="px-4 py-2 rounded-xl bg-violet-100 text-violet-700 font-semibold text-lg shadow-sm">
                                                        {student.grupo}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleAddStudent(student)
                                            }
                                            className="px-5 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition shadow-sm cursor-pointer"
                                        >
                                            Asignar
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ESTUDIANTES ASIGNADOS */}
                    <div className="w-full flex flex-col">
                        <h1 className="text-center mb-3 text-xl font-semibold text-red-500">
                            Estudiantes Asignados
                        </h1>

                        <div className="rounded-2xl border border-gray-200 p-4 bg-white shadow-sm flex flex-col h-full">
                            <div className="flex-1 max-h-86 overflow-y-scroll pr-1">
                                {selectedStudents.length === 0 ? (
                                    <p className="text-gray-400">
                                        Sin Estudiantes Asignados
                                    </p>
                                ) : (
                                    selectedStudents.map((student) => (
                                        <div
                                            key={student.id}
                                            className="
                                    p-6 rounded-2xl
                                    bg-gradient-to-br from-white to-gray-50
                                    border border-gray-200
                                    shadow-md
                                    hover:shadow-lg
                                    transition-all duration-300
                                    mb-5
                                "
                                        >
                                            <div className="flex justify-between items-start border-b border-gray-100 pb-4">
                                                <div>
                                                    <p className="font-semibold text-lg text-gray-800">
                                                        {student.nombre}{" "}
                                                        {
                                                            student.apellido_paterno
                                                        }
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {student.grado} -{" "}
                                                        {student.grupo}
                                                    </p>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleRemoveStudent(
                                                            student.id,
                                                        )
                                                    }
                                                    className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition shadow-sm cursor-pointer"
                                                >
                                                    Eliminar
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
                                                {/* Parentesco */}
                                                <div>
                                                    <label className="text-sm text-gray-600">
                                                        Parentesco
                                                    </label>
                                                    <select
                                                        value={
                                                            student.relacion
                                                                .parentesco
                                                        }
                                                        onChange={(e) =>
                                                            handleRelationChange(
                                                                student.id,
                                                                "parentesco",
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="
                                                w-full border border-gray-300
                                                rounded-xl px-4 py-2 mt-2
                                                focus:outline-none
                                                focus:ring-2
                                                focus:ring-red-500
                                                transition
                                            "
                                                    >
                                                        <option value="">
                                                            Seleccione
                                                        </option>
                                                        {[
                                                            "Padre",
                                                            "Madre",
                                                            "Abuelo",
                                                            "Abuela",
                                                            "Tío",
                                                            "Tía",
                                                            "Hermano",
                                                            "Hermana",
                                                            "Otro",
                                                        ].map((opt) => (
                                                            <option
                                                                key={opt}
                                                                value={opt}
                                                            >
                                                                {opt}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>

                                                {/* Radios */}
                                                <div className="space-y-4">
                                                    <div>
                                                        <label className="text-sm text-gray-600">
                                                            Responsable de Pagos
                                                        </label>
                                                        <div className="flex gap-6 mt-2 text-gray-700">
                                                            <label>
                                                                <input
                                                                    type="radio"
                                                                    checked={
                                                                        student
                                                                            .relacion
                                                                            .responsable_pagos ===
                                                                        true
                                                                    }
                                                                    onChange={() =>
                                                                        handleRelationChange(
                                                                            student.id,
                                                                            "responsable_pagos",
                                                                            true,
                                                                        )
                                                                    }
                                                                />{" "}
                                                                Sí
                                                            </label>
                                                            <label>
                                                                <input
                                                                    type="radio"
                                                                    checked={
                                                                        student
                                                                            .relacion
                                                                            .responsable_pagos ===
                                                                        false
                                                                    }
                                                                    onChange={() =>
                                                                        handleRelationChange(
                                                                            student.id,
                                                                            "responsable_pagos",
                                                                            false,
                                                                        )
                                                                    }
                                                                />{" "}
                                                                No
                                                            </label>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label className="text-sm text-gray-600">
                                                            Contacto Principal
                                                        </label>
                                                        <div className="flex gap-6 mt-2 text-gray-700">
                                                            <label>
                                                                <input
                                                                    type="radio"
                                                                    checked={
                                                                        student
                                                                            .relacion
                                                                            .contacto_principal ===
                                                                        true
                                                                    }
                                                                    onChange={() =>
                                                                        handleRelationChange(
                                                                            student.id,
                                                                            "contacto_principal",
                                                                            true,
                                                                        )
                                                                    }
                                                                />{" "}
                                                                Sí
                                                            </label>
                                                            <label>
                                                                <input
                                                                    type="radio"
                                                                    checked={
                                                                        student
                                                                            .relacion
                                                                            .contacto_principal ===
                                                                        false
                                                                    }
                                                                    onChange={() =>
                                                                        handleRelationChange(
                                                                            student.id,
                                                                            "contacto_principal",
                                                                            false,
                                                                        )
                                                                    }
                                                                />{" "}
                                                                No
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
                        className="px-6 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition shadow-sm cursor-pointer"
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
                    required
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
                    required
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

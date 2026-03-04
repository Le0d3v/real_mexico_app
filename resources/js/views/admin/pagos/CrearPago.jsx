import {
    Calendar,
    CreditCard,
    DollarSign,
    Eye,
    Hash,
    Info,
    NotepadText,
    User,
    UserCheck,
} from "lucide-react";

import useStudent from "../../../hooks/useStudent";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useState, useMemo } from "react";
import EstudiantePago from "./EstudiantePago";
import EstudianteSeleccionado from "./EstudianteSeleccionado";
import usePago from "../../../hooks/usePago";

export default function CrearPago({ onClose }) {
    const { estudiantes } = useStudent();
    const { createPago } = usePago();

    const [metodoPago, setMetodoPago] = useState("");
    const [cargando, setCargando] = useState(false);

    const [formData, setFormData] = useState({
        colegiatura_id: null,
        estudiante_id: null,
        tutor_id: null,
        asunto: "Pago de Colegiatura",
        fecha_pago: "",
        monto: "",
        metodo_pago: "",
        referencia: "",
        observaciones: "",
    });

    const handleMetodoPagoChange = (e) => {
        const value = e.target.value;

        setMetodoPago(value);

        setFormData((prev) => ({
            ...prev,
            metodo_pago: value,
        }));
    };

    /* ================================
       NUEVA FUNCIONALIDAD
    ==================================*/
    const [search, setSearch] = useState("");
    const [selectedStudent, setSelectedStudent] = useState(null);

    const filteredStudents = useMemo(() => {
        if (!search.trim()) return [];

        const term = search.toLowerCase();

        return estudiantes.filter((estudiante) => {
            const nombreCompleto = `${estudiante.nombre ?? ""} 
                 ${estudiante.apellido_paterno ?? ""} 
                 ${estudiante.apellido_materno ?? ""}`.toLowerCase();

            return (
                nombreCompleto.includes(term) ||
                estudiante.matricula?.toLowerCase().includes(term)
            );
        });
    }, [search, estudiantes]);

    const handleSelectStudent = (student) => {
        setSelectedStudent(student);
        setSearch("");

        setFormData((prev) => ({
            ...prev,
            estudiante_id: student.id,
            tutor_id: null,
            colegiatura_id: null,
        }));
    };

    const handleSelectColegiatura = (colegiatura) => {
        setFormData((prev) => ({
            ...prev,
            colegiatura_id: colegiatura.id,
        }));
    };

    const handleSelectTutor = (tutor) => {
        setFormData((prev) => ({
            ...prev,
            tutor_id: tutor.usuario.id,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCargando(true);

        try {
            const response = await createPago(formData);
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
        <>
            <div className="flex items-center gap-2">
                <Info />
                <p>
                    Complete el Siguiente formulario para registrar un nuevo
                    pago
                </p>
            </div>

            <form
                className="space-y-8 mt-5"
                autoComplete="off"
                onSubmit={handleSubmit}
                noValidate
            >
                {/* =======================================
                    INFORMACIÓN DEL PAGO
                ======================================== */}
                <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
                    <div className="flex items-center gap-3 border-b border-gray-300 pb-4">
                        <div className="p-2 flex items-center justify-center rounded-full bg-red-200">
                            <DollarSign className="w-8 h-8 text-red-600" />
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Información del Pago
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <SelectField
                            icon={<NotepadText size={18} />}
                            label="Asunto"
                            options={["Pago por Colegiatura"]}
                            value={formData.asunto}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    asunto: e.target.value,
                                }))
                            }
                        />

                        <InputField
                            icon={<DollarSign size={18} />}
                            label="Monto"
                            type="number"
                            value={formData.monto}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    monto: e.target.value,
                                }))
                            }
                        />

                        <InputField
                            icon={<Calendar size={18} />}
                            label="Fecha de Registro"
                            type="date"
                            value={formData.fecha_pago}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    fecha_pago: e.target.value,
                                }))
                            }
                        />

                        <SelectField
                            icon={<CreditCard size={18} />}
                            label="Método de Pago"
                            options={[
                                "Efectivo",
                                "Transferencia",
                                "Tarjeta",
                                "Deposito",
                            ]}
                            value={metodoPago}
                            onChange={handleMetodoPagoChange}
                        />

                        {(metodoPago === "Deposito" ||
                            metodoPago === "Tarjeta") && (
                            <InputField
                                icon={<Hash size={18} />}
                                label="Referencia"
                                value={formData.referencia}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        referencia: e.target.value,
                                    }))
                                }
                            />
                        )}

                        <InputField
                            icon={<Eye size={18} />}
                            label="Observaciones (Opcional)"
                            value={formData.observaciones}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    observaciones: e.target.value,
                                }))
                            }
                        />
                    </div>
                </section>

                {/* =======================================
                    ESTUDIANTE
                ======================================== */}
                <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
                    <div className="flex items-center gap-3 border-b border-gray-300 pb-4">
                        <div className="p-2 flex items-center justify-center rounded-full bg-red-200">
                            <Calendar className="w-8 h-8 text-red-600" />
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Estudiante
                        </h2>
                    </div>

                    <div className="flex items-center gap-2">
                        <Info />
                        <p>
                            Busque el estudiante relacionado a la colegiatura
                            usando el buscador
                        </p>
                    </div>

                    {/* BUSCADOR */}
                    <input
                        type="text"
                        placeholder="Buscar por nombre o matrícula"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                    />

                    {/* RESULTADOS */}
                    {search.trim() !== "" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 max-h-72 overflow-y-auto">
                            {filteredStudents.length === 0 ? (
                                <p className="text-gray-400 text-sm">
                                    No se encontraron coincidencias
                                </p>
                            ) : (
                                filteredStudents.map((student) => (
                                    <div
                                        key={student.id}
                                        onClick={() =>
                                            handleSelectStudent(student)
                                        }
                                        className="cursor-pointer"
                                    >
                                        <EstudiantePago
                                            estudiante={student}
                                            seleccionado={
                                                selectedStudent?.id ===
                                                student.id
                                            }
                                        />
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {/* ESTUDIANTE SELECCIONADO */}
                    {selectedStudent && (
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold text-gray-700 mb-3">
                                Estudiante Seleccionado:
                            </h3>

                            <EstudianteSeleccionado
                                estudiante={selectedStudent}
                                onClear={() => {
                                    setSelectedStudent(null);
                                    setFormData((prev) => ({
                                        ...prev,
                                        estudiante_id: null,
                                        tutor_id: null,
                                        colegiatura_id: null,
                                    }));
                                }}
                                onSelectColegiatura={handleSelectColegiatura}
                                onSelectTutor={handleSelectTutor}
                                selectedColegiaturaId={formData.colegiatura_id}
                                selectedTutorId={formData.tutor_id}
                            />
                        </div>
                    )}
                </section>

                {/* =======================================
                    ACCIONES
                ======================================== */}
                <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex justify-between gap-4 items-center">
                    <h1 className="text-3xl font-semibold text-red-400">
                        Acciones
                    </h1>

                    <div className="flex gap-5">
                        <button
                            type="button"
                            className="px-6 py-2 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
                            onClick={() => onClose()}
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
                                <p>Registrar Pago</p>
                            )}
                        </button>
                    </div>
                </section>
            </form>
        </>
    );
}

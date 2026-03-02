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
import useTutor from "../../../hooks/useTutor";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import { ClipLoader } from "react-spinners";
import { useState } from "react";

export default function CrearPago({ onClose }) {
    const { estudiantes } = useStudent();
    const { tutores } = useTutor();

    const [metodoPago, setMetodoPago] = useState("");
    const [cargando, setCargando] = useState(false);

    return (
        <>
            <div className="flex items-center gap-2">
                <Info />
                <p>
                    Complete el Siguiente formulario para registrar un nuevo
                    pago
                </p>
            </div>
            <form className="space-y-8 mt-5" autoComplete="off">
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
                            label="Asunto
                            "
                            options={["Pago por Colegiatura"]}
                            // value={calle}
                            // onChange={(e) => setCalle(e.target.value)}
                        />
                        <InputField
                            icon={<DollarSign size={18} />}
                            label="Monto"
                            type="number"
                            // value={calle}
                            // onChange={(e) => setCalle(e.target.value)}
                        />
                        <InputField
                            icon={<Calendar size={18} />}
                            label="Fecha de Registro"
                            type="date"
                            // value={calle}
                            // onChange={(e) => setCalle(e.target.value)}
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
                            onChange={(e) => setMetodoPago(e.target.value)}
                        />
                        {(metodoPago === "Deposito" ||
                            metodoPago === "Tarjeta") && (
                            <InputField
                                icon={<Hash size={18} />}
                                label="Referencia"
                            />
                        )}
                        <InputField
                            icon={<Eye size={18} />}
                            label="Observaciones (Opcional)"
                            // value={calle}
                            // onChange={(e) => setCalle(e.target.value)}
                        />
                    </div>
                </section>
                <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
                    <div className="flex items-center gap-3 border-b border-gray-300 pb-4">
                        <div className="p-2 flex items-center justify-center rounded-full bg-red-200">
                            <Calendar className="w-8 h-8 text-red-600" />
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Estudiante
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6"></div>
                </section>
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

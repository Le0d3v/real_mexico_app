import InfoItem from "../components/InfoItem";
import {
    User,
    Calendar,
    Hash,
    Phone,
    Mail,
    DollarSign,
    Eye,
    CreditCard,
    Info,
    GraduationCap,
    Users,
    Check,
    IdCard,
} from "lucide-react";
import { formatDate } from "../../../helpers/helpers";

export default function ShowPago({ pago, onClose }) {
    return (
        <div className="space-y-8">
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
                <div className="flex items-center gap-3 border-b border-b-gray-300 pb-4">
                    <div className="p-2 flex items-center justify-center rounded-full bg-red-200">
                        <DollarSign className="w-8 h-8 text-red-600" />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Datos del Pago
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoItem
                        icon={<DollarSign size={18} />}
                        label="Monto"
                        value={pago.monto}
                    />
                    <InfoItem
                        icon={<Check size={18} />}
                        label="Asunto"
                        value={"Pago por Colegiatura"}
                    />
                    <InfoItem
                        icon={<Calendar size={18} />}
                        label="Fecha de Registro"
                        value={formatDate(pago.fecha_pago)}
                    />
                    <InfoItem
                        icon={<CreditCard size={18} />}
                        label="Método de Pago"
                        value={pago.metodo_pago}
                    />
                    <InfoItem
                        icon={<Hash size={18} />}
                        label="Referencia"
                        value={pago.referencia}
                    />
                    <InfoItem
                        icon={<Eye size={18} />}
                        label="Observaciones"
                        value={pago.observaciones}
                    />
                </div>
            </section>
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
                <div className="flex items-center gap-3 border-b border-b-gray-300 pb-4">
                    <div className="p-2 flex items-center justify-center rounded-full bg-red-200">
                        <User className="w-8 h-8 text-red-600" />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Datos del Responsable
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoItem
                        icon={<User size={18} />}
                        label="Nombre Completo"
                        value={`${pago.tutor.name} ${pago.tutor.apellido_paterno} ${pago.tutor.apellido_paterno}`}
                    />

                    <InfoItem
                        icon={<Phone size={18} />}
                        label="Curp"
                        value={pago.tutor.curp}
                    />

                    <InfoItem
                        icon={<Calendar size={18} />}
                        label="Número de Teléfono"
                        value={pago.tutor.telefono}
                    />

                    <InfoItem
                        icon={<Mail size={18} />}
                        label="Correo Electrónico"
                        value={pago.tutor.email}
                    />
                </div>
            </section>
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
                <div className="flex items-center gap-3 border-b border-b-gray-300 pb-4">
                    <div className="p-2 flex items-center justify-center rounded-full bg-red-200">
                        <Info className="w-8 h-8 text-red-600" />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Información de la Colegiatura
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoItem
                        icon={<GraduationCap size={18} />}
                        label="Ciclo Escolar"
                        value={pago.colegiatura.ciclo_escolar.nombre}
                    />
                    <InfoItem
                        icon={<Calendar size={18} />}
                        label="Mes"
                        value={pago.colegiatura.mes}
                    />
                    <InfoItem
                        icon={<DollarSign size={18} />}
                        label="Monto"
                        value={pago.colegiatura.monto}
                    />
                    <InfoItem
                        icon={<Check size={18} />}
                        label="Estado"
                        value={pago.colegiatura.estado}
                    />
                    <InfoItem
                        icon={<User size={18} />}
                        label="Estudiante"
                        value={
                            pago.estudiante.nombre +
                            " " +
                            pago.estudiante.apellido_paterno +
                            " " +
                            pago.estudiante.apellido_materno
                        }
                    />
                    <InfoItem
                        icon={<IdCard size={18} />}
                        label="Matricula del Estudiante"
                        value={pago.estudiante.matricula}
                    />
                    <InfoItem
                        icon={<GraduationCap size={18} />}
                        label="Grado"
                        value={pago.estudiante.grado}
                    />
                    <InfoItem
                        icon={<Users size={18} />}
                        label="Grupo"
                        value={pago.estudiante.grupo}
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
                        onClick={() => onClose()}
                    >
                        Cerrar
                    </button>
                </div>
            </section>
        </div>
    );
}

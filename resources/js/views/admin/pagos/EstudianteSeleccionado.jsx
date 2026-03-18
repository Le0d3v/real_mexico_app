import {
    GraduationCap,
    IdCard,
    Users,
    User,
    XCircle,
    BookOpen,
    UserCheck,
} from "lucide-react";

import SelectField from "../components/SelectField";
import StudentCard from "../colegiaturas/StudentCard";

export default function EstudianteSeleccionado({
    estudiante,
    onClear,
    colegiaturasDisponibles,
    tutoresDisponibles,
    formData,
    onSelectColegiatura,
    onSelectTutor,
}) {
    return (
        <div className="space-y-6">
            <StudentCard
                student={estudiante}
                discard={true}
                onDiscard={onClear}
            />

            {/* 🔥 SELECTS INTEGRADOS */}
            <div className="grid md:grid-cols-2 gap-6">
                <SelectField
                    icon={<BookOpen size={18} />}
                    label="Colegiatura"
                    options={[...colegiaturasDisponibles]
                        .sort((a, b) => {
                            const pagadaA =
                                a.estado?.toLowerCase() === "pagado";
                            const pagadaB =
                                b.estado?.toLowerCase() === "pagado";
                            return pagadaA - pagadaB;
                        })
                        .map((c) => {
                            const pendiente = c.monto - c.pagado;
                            const pagada = c.estado?.toLowerCase() === "pagado";

                            return {
                                value: c.id,
                                label: pagada
                                    ? `${c.mes} — PAGADO`
                                    : `${c.mes} — Pendiente: $${pendiente.toFixed(2)}`,
                                disabled: pagada,
                                className: pagada
                                    ? "bg-gray-100 text-gray-400 hover:cursor-not-allowed"
                                    : "",
                            };
                        })}
                    value={formData.colegiatura_id ?? ""}
                    onChange={(e) => {
                        const colegiaturaId = Number(e.target.value);

                        const seleccionada = colegiaturasDisponibles.find(
                            (c) => c.id === colegiaturaId,
                        );

                        if (!seleccionada) return;

                        if (seleccionada.estado?.toLowerCase() === "pagado")
                            return;

                        const pendiente =
                            seleccionada.monto - seleccionada.pagado;

                        onSelectColegiatura(colegiaturaId, pendiente);
                    }}
                />

                <SelectField
                    icon={<UserCheck size={18} />}
                    label="Tutor"
                    options={tutoresDisponibles.map((t) => ({
                        value: t.usuario.id,
                        label: t.usuario.name,
                    }))}
                    value={formData.tutor_id ?? ""}
                    onChange={onSelectTutor}
                />
            </div>
        </div>
    );
}

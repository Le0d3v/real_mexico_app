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
      <h1 className="font-semibold text-gray-700 text-xl">
        Estudiante Seleccionado:
      </h1>
      <StudentCard student={estudiante} discard={true} onDiscard={onClear} />

      {/* 🔥 SELECTS INTEGRADOS */}
      <div className="grid md:grid-cols-2 gap-6">
        <SelectField
          icon={<BookOpen size={18} />}
          label="Colegiatura"
          options={colegiaturasDisponibles} // ✅ ya viene procesado
          value={formData.colegiatura_id ?? ""}
          onChange={(e) => onSelectColegiatura(e.target.value)}
        />

        <SelectField
          icon={<UserCheck size={18} />}
          label="Tutor"
          options={tutoresDisponibles.map((t) => ({
            value: t.usuario.id,
            label: t.usuario.name + " " + t.usuario.apellido_paterno,
          }))}
          value={formData.tutor_id ?? ""}
          onChange={onSelectTutor}
        />
      </div>
    </div>
  );
}

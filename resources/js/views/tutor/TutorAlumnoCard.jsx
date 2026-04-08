import {
  BookOpen,
  IdCard,
  User,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

export default function TutorAlumnoCard({ alumno }) {
  const estadoColor = {
    Activo: "bg-green-100 text-green-700",
    Inactivo: "bg-gray-200 text-gray-600",
    Baja: "bg-red-100 text-red-700",
  };

  const estadoIcon = {
    Activo: <CheckCircle size={14} />,
    Inactivo: <User size={14} />,
    Baja: <AlertTriangle size={14} />,
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-lg transition-all hover:-translate-y-1  border-l-4 border-indigo-400">
      {/* 🔹 Header */}
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-lg font-semibold text-slate-800 leading-tight">
            {alumno.nombre} {alumno.apellido_paterno}
          </h4>

          <p className="text-lg text-gray-500 mt-1 flex items-center gap-2">
            <BookOpen size={18} />
            {alumno.grado} • {alumno.grupo || "Sin grupo"}
          </p>
        </div>

        <div className="bg-gradient-to-br from-slate-100 to-slate-200 p-2 rounded-lg">
          <User className="text-slate-600" size={18} />
        </div>
      </div>

      {/* 🔹 Matrícula */}
      <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
        <IdCard size={18} />
        <span className="font-medium text-lg">{alumno.matricula}</span>
      </div>

      {/* 🔹 Footer */}
      <div className="mt-4 flex justify-between items-center">
        <span className="text-sm text-gray-500">Estado</span>

        <span
          className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full font-medium ${
            estadoColor[alumno.estado] || "bg-gray-100 text-gray-600"
          }`}
        >
          {estadoIcon[alumno.estado]}
          {alumno.estado}
        </span>
      </div>
    </div>
  );
}

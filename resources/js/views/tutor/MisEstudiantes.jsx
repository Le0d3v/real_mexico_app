import {
  User,
  BookOpen,
  MapPin,
  HeartPulse,
  DollarSign,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

import Loader from "../components/Loader";
import Tittle from "../components/Tittle";
import { formatCurrency } from "../../helpers/helpers";
import useAuth from "../../hooks/useAuth";

export default function MisEstudiantes() {
  const { user, loading } = useAuth({ middleware: "auth" });

  if (loading) return <Loader />;

  const estudiantes = user?.tutor?.estudiantes || [];

  return (
    <div className="bg-slate-100 min-h-screen p-4">
      {/* 🔹 HEADER */}
      <div className="mb-8">
        <Tittle>Mis Estudiantes</Tittle>

        <p className="text-gray-500 mt-2">
          Visualiza la información académica y estado financiero de los
          estudiantes bajo tu responsabilidad.
        </p>
      </div>

      {/* 🔹 GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {estudiantes.map((alumno) => {
          const colegiaturas = alumno.colegiaturas || [];

          const pendientes = colegiaturas.filter(
            (c) => c.estado === "Pendiente",
          );

          const vencidas = colegiaturas.filter((c) => c.estado === "Vencida");

          const pagadas = colegiaturas.filter((c) => c.estado === "Pagado");

          const totalPendiente = pendientes.reduce(
            (acc, c) => acc + Number(c.monto),
            0,
          );

          return (
            <div
              key={alumno.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 hover:shadow-md hover:-translate-y-1 transition-all"
            >
              {/* 🔹 HEADER */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">
                    {alumno.nombre} {alumno.apellido_paterno}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Matrícula:{" "}
                    <span className="font-mono text-xs text-slate-600">
                      {alumno.matricula}
                    </span>
                  </p>
                </div>

                <div className="bg-slate-100 p-2 rounded-lg">
                  <User size={18} className="text-slate-500" />
                </div>
              </div>

              {/* 🔹 INFO ACADÉMICA */}
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <BookOpen size={16} />
                  {alumno.grado} • {alumno.grupo || "Sin grupo"}
                </div>

                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  {alumno.domicilio?.localidad}
                </div>

                <div className="flex items-center gap-2">
                  <HeartPulse size={16} />
                  {alumno.tipo_sangre || "N/D"}
                </div>
              </div>

              {/* 🔹 ESTADO */}
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs text-gray-500">Estado</span>

                <span
                  className={`
                    text-xs px-3 py-1 rounded-full font-medium
                    ${
                      alumno.estado === "Activo"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }
                  `}
                >
                  {alumno.estado}
                </span>
              </div>

              {/* 🔹 KPIs FINANCIEROS */}
              <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-yellow-50 rounded-lg p-2">
                  <p className="text-yellow-600 font-semibold">
                    {pendientes.length}
                  </p>
                  <span className="text-gray-500">Pendientes</span>
                </div>

                <div className="bg-red-50 rounded-lg p-2">
                  <p className="text-red-600 font-semibold">
                    {vencidas.length}
                  </p>
                  <span className="text-gray-500">Vencidas</span>
                </div>

                <div className="bg-emerald-50 rounded-lg p-2">
                  <p className="text-emerald-600 font-semibold">
                    {pagadas.length}
                  </p>
                  <span className="text-gray-500">Pagadas</span>
                </div>
              </div>

              {/* 🔹 RESUMEN MONTO */}
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-gray-500 flex items-center gap-1">
                  <DollarSign size={14} />
                  Adeudo
                </span>

                <span className="font-semibold text-emerald-600">
                  {formatCurrency(totalPendiente)}
                </span>
              </div>

              {/* 🔹 ALERTA */}
              {vencidas.length > 0 && (
                <div className="mt-4 bg-red-50 text-red-700 text-xs px-3 py-2 rounded-lg flex items-center gap-2">
                  <AlertTriangle size={14} />
                  Tiene colegiaturas vencidas
                </div>
              )}

              {/* 🔹 OK */}
              {vencidas.length === 0 && pendientes.length === 0 && (
                <div className="mt-4 bg-green-50 text-green-700 text-xs px-3 py-2 rounded-lg flex items-center gap-2">
                  <CheckCircle size={14} />
                  Pagos al corriente
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

import {
  User,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Calendar,
  Clock,
  Hash,
} from "lucide-react";

import Loader from "../components/Loader";
import Tittle from "../components/Tittle";
import { formatCurrency } from "../../helpers/helpers";
import useAuth from "../../hooks/useAuth";
import TutorAlumnoCard from "./TutorAlumnoCard";
import useIRM from "../../hooks/useIRM";

export default function Inicio() {
  const { user, loading } = useAuth({ middleware: "auth" });
  const { setTutorPage, setTitulo } = useIRM();

  if (loading) return <Loader />;

  const estudiantes = user?.tutor?.estudiantes || [];
  const pagos = user?.tutor?.pagos || [];
  const colegiaturas = estudiantes.flatMap((e) => e.colegiaturas || []);

  const vencidas = colegiaturas.filter((c) => c.estado === "Vencida");
  const pendientes = colegiaturas.filter((c) => c.estado === "Pendiente");
  const pagadas = colegiaturas.filter((c) => c.estado === "Pagado");

  const totalPendiente = pendientes.reduce(
    (acc, c) => acc + Number(c.monto),
    0,
  );

  return (
    <div className="bg-slate-100 min-h-screen p-4">
      {/* 🔹 HEADER */}
      <div className="mb-8">
        <Tittle>Inicio</Tittle>

        <p className="text-gray-500 mt-2">
          Bienvenido,{" "}
          <span className="font-semibold text-slate-700">{user.name}</span>.
          Consulta el estado académico y financiero de tus estudiantes.
        </p>
      </div>

      {/* 🔹 KPIs */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6"
        id="driver_main-kpis"
      >
        {/* Estudiantes */}
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition border-l-4 border-slate-800">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Estudiantes</p>
              <h2 className="text-3xl font-bold mt-2 text-slate-800">
                {estudiantes.length}
              </h2>
            </div>
            <User className="w-10 h-10 text-slate-400" />
          </div>
        </div>

        {/* Pendientes */}
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition border-l-4 border-yellow-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Pendientes</p>
              <h2 className="text-3xl font-bold mt-2 text-yellow-500">
                {pendientes.length}
              </h2>
            </div>
            <Clock className="w-10 h-10 text-yellow-500" />
          </div>
        </div>

        {/* Vencidas */}
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition border-l-4 border-red-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Vencidas</p>
              <h2 className="text-3xl font-bold mt-2 text-red-500">
                {vencidas.length}
              </h2>
            </div>
            <AlertTriangle className="w-10 h-10 text-red-500" />
          </div>
        </div>

        {/* Total pendiente */}
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition border-l-4 border-emerald-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Total pendiente</p>
              <h2 className="text-2xl font-bold mt-2 text-emerald-600">
                {formatCurrency(totalPendiente)}
              </h2>
            </div>
            <DollarSign className="w-10 h-10 text-emerald-500" />
          </div>
        </div>
      </div>

      {/* 🔹 ESTUDIANTES */}
      <div className="mt-10" id="driver_tutor-estudiantes">
        <h3 className="text-xl font-semibold mb-5 text-slate-800">
          Mis Estudiantes
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {estudiantes.map((alumno) => (
            <TutorAlumnoCard alumno={alumno} key={alumno.id} />
          ))}
        </div>
      </div>

      <div className="mt-10" id="driver_main-pagos">
        <h3 className="text-xl font-semibold mb-5 text-slate-800">
          Últimos Pagos
        </h3>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              {/* 🔹 HEADER */}
              <thead className="bg-slate-200 text-slate-600">
                <tr>
                  <th className="p-4 text-left">
                    <div className="flex items-center gap-2">
                      <User size={16} />
                      Alumno
                    </div>
                  </th>

                  <th className="p-4 text-left">
                    <div className="flex items-center gap-2">
                      <Hash size={16} />
                      Referencia
                    </div>
                  </th>

                  <th className="p-4 text-left">
                    <div className="flex items-center gap-2">
                      <DollarSign size={16} />
                      Monto
                    </div>
                  </th>

                  <th className="p-4 text-left">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      Fecha
                    </div>
                  </th>

                  <th className="p-4 text-left">Estado</th>
                </tr>
              </thead>

              {/* 🔹 BODY */}
              <tbody>
                {pagos.slice(0, 5).map((pago, index) => (
                  <tr
                    key={pago.id}
                    className={`
                border-t border-gray-300 transition-all duration-200
                hover:bg-gray-100 
                ${index % 2 === 0 ? "bg-white" : "bg-slate-50/40"}
              `}
                  >
                    {/* Alumno */}
                    <td className="p-4 font-medium text-slate-700">
                      {pago.estudiante?.nombre}
                    </td>

                    {/* Referencia */}
                    <td className="p-4 text-gray-500 font-mono text-xs">
                      {pago.referencia}
                    </td>

                    {/* Monto */}
                    <td className="p-4">
                      <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {formatCurrency(pago.monto)}
                      </span>
                    </td>

                    {/* Fecha */}
                    <td className="p-4 text-gray-500">
                      {new Date(pago.fecha_pago).toLocaleDateString("es-MX", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    {/* Estado */}
                    <td className="p-4">
                      <span className="flex items-center gap-1 text-green-600 text-xs font-medium">
                        <CheckCircle size={14} />
                        Pagado
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 🔹 ACCESOS */}
      <div className="mt-10" id="driver_accesos-rapidos">
        <h3 className="text-xl font-semibold mb-5 text-slate-800">
          Accesos Rápidos
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            className="bg-slate-900 text-white py-4 rounded-xl hover:shadow-md hover:-translate-y-1 transition"
            onClick={() => {
              setTutorPage(1);
              setTitulo("Colegiaturas");
            }}
          >
            Ver Colegiaturas
          </button>

          <button
            className="bg-yellow-500 text-black py-4 rounded-xl hover:shadow-md hover:-translate-y-1 transition"
            onClick={() => {
              setTutorPage(3);
              setTitulo("Historial de Pagos");
            }}
          >
            Historial de Pagos
          </button>

          <button
            className="bg-slate-200 py-4 rounded-xl hover:shadow-md hover:-translate-y-1 transition"
            onClick={() => {
              setTutorPage(4);
              setTitulo("Configuración");
            }}
          >
            Mi Perfil
          </button>
        </div>
      </div>
    </div>
  );
}

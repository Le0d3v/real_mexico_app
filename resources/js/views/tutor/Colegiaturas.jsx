import {
  User,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  Calendar,
} from "lucide-react";

import Loader from "../components/Loader";
import Tittle from "../components/Tittle";
import { formatCurrency } from "../../helpers/helpers";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

export default function Colegiaturas() {
  const { user, loading } = useAuth({ middleware: "auth" });

  const [openStudentId, setOpenStudentId] = useState(null);

  const toggleStudent = (id) => {
    setOpenStudentId((prev) => (prev === id ? null : id));
  };

  if (loading) return <Loader />;

  const estudiantes = user?.tutor?.estudiantes || [];

  return (
    <div className="bg-slate-100 min-h-screen p-4">
      {/* 🔹 HEADER */}
      <div className="mb-8">
        <Tittle>Colegiaturas</Tittle>

        <p className="text-gray-500 mt-2">
          Consulta el estado de pagos por estudiante, incluyendo adeudos, pagos
          realizados y colegiaturas vencidas.
        </p>
      </div>

      {/* 🔹 LISTADO POR ESTUDIANTE */}
      <div className="space-y-8">
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
              className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition"
            >
              {/* 🔹 HEADER ALUMNO */}
              <div className="p-5 flex flex-col gap-4 bg-gradient-to-r from-slate-50 to-white">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  {/* INFO PRINCIPAL */}
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                      <User className="text-red-500" size={20} />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 leading-tight">
                        {alumno.nombre} {alumno.apellido_paterno}{" "}
                        {alumno.apellido_materno}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {alumno.grado} • {alumno.grupo || "Sin grupo"} •
                        <span className="font-semibold">
                          {" " + alumno.matricula}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* BOTÓN */}
                  <button
                    onClick={() => toggleStudent(alumno.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition w-full md:w-auto
                      ${
                        openStudentId === alumno.id
                          ? "bg-red-600 text-white hover:bg-red-700"
                          : "bg-slate-800 text-white hover:bg-slate-700"
                      }
                    `}
                  >
                    {openStudentId === alumno.id
                      ? "Ocultar colegiaturas"
                      : "Ver colegiaturas"}
                  </button>
                </div>

                {/* KPIs */}
                <div className="grid grid-cols-3 gap-3 text-sm md:text-sm mt-3">
                  <div className="bg-yellow-100 text-yellow-700 px-3 py-2 rounded-lg md:flex md:items-center gap-2">
                    <Clock size={14} className="mx-auto md:mx-0" />
                    <p className="text-center mt-1 md:text-start md:mt-0">
                      {pendientes.length} pendientes
                    </p>
                  </div>

                  <div className="bg-red-100 text-red-700 px-3 py-2 rounded-lg md:flex md:items-center gap-2">
                    <AlertTriangle size={14} className="mx-auto md:mx-0" />
                    <p className="text-center mt-1 md:text-start md:mt-0">
                      {vencidas.length} vencidas
                    </p>
                  </div>

                  <div className="bg-emerald-100 text-emerald-700 px-3 py-2 rounded-lg md:flex md:items-center gap-2">
                    <DollarSign size={14} className="mx-auto md:mx-0" />
                    <p className="text-center mt-1 md:text-start md:mt-0">
                      {formatCurrency(totalPendiente)}
                    </p>
                  </div>
                </div>
              </div>

              {/* 🔻 CONTENIDO */}
              {openStudentId === alumno.id && (
                <div className="border-t border-slate-200">
                  {/* TABLA DESKTOP */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-100 text-slate-600 text-xs uppercase tracking-wide">
                        <tr>
                          <th className="p-4 text-left">Mes</th>
                          <th className="p-4 text-left">Monto</th>
                          <th className="p-4 text-left">Pagado</th>
                          <th className="p-4 text-left">Límite</th>
                          <th className="p-4 text-left">Estado</th>
                        </tr>
                      </thead>

                      <tbody>
                        {colegiaturas.map((c, index) => (
                          <tr
                            key={c.id}
                            className="border-t hover:bg-slate-50 transition"
                          >
                            <td className="p-4 font-medium text-slate-700">
                              {c.mes} {c.anio}
                            </td>

                            <td className="p-4">{formatCurrency(c.monto)}</td>

                            <td className="p-4 text-gray-500">
                              {formatCurrency(c.pagado)}
                            </td>

                            <td className="p-4 text-gray-500">
                              {new Date(c.fecha_limite_pago).toLocaleDateString(
                                "es-MX",
                              )}
                            </td>

                            <td className="p-4">
                              {c.estado === "Pagado" && (
                                <span className="flex items-center gap-1 text-green-600 text-xs font-medium">
                                  <CheckCircle size={14} /> Pagado
                                </span>
                              )}
                              {c.estado === "Pendiente" && (
                                <span className="flex items-center gap-1 text-yellow-600 text-xs font-medium">
                                  <Clock size={14} /> Pendiente
                                </span>
                              )}
                              {c.estado === "Vencida" && (
                                <span className="flex items-center gap-1 text-red-600 text-xs font-medium">
                                  <AlertTriangle size={14} /> Vencida
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* MOBILE */}
                  <div className="md:hidden p-4 space-y-3">
                    {colegiaturas.map((c) => (
                      <div
                        key={c.id}
                        className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-slate-700">
                            {c.mes}
                          </span>

                          <span className="text-xs">
                            {c.estado === "Pagado" && (
                              <span className="text-green-600 flex items-center gap-1">
                                <CheckCircle size={14} /> Pagado
                              </span>
                            )}
                            {c.estado === "Pendiente" && (
                              <span className="text-yellow-600 flex items-center gap-1">
                                <Clock size={14} /> Pendiente
                              </span>
                            )}
                            {c.estado === "Vencida" && (
                              <span className="text-red-600 flex items-center gap-1">
                                <AlertTriangle size={14} /> Vencida
                              </span>
                            )}
                          </span>
                        </div>

                        <div className="mt-2 text-sm text-gray-600 space-y-1">
                          <p>Monto: {formatCurrency(c.monto)}</p>
                          <p>Pagado: {formatCurrency(c.pagado)}</p>
                          <p>
                            Límite:{" "}
                            {new Date(c.fecha_limite_pago).toLocaleDateString(
                              "es-MX",
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

import {
  DollarSign,
  Calendar,
  User,
  Hash,
  CreditCard,
  CheckCircle,
} from "lucide-react";

import Loader from "../components/Loader";
import Tittle from "../components/Tittle";
import { formatCurrency } from "../../helpers/helpers";
import useAuth from "../../hooks/useAuth";

export default function MisPagos() {
  const { user, loading } = useAuth({ middleware: "auth" });

  if (loading) return <Loader />;

  const pagos = user?.tutor?.pagos || [];

  // 🔹 KPIs
  const totalPagado = pagos.reduce((acc, p) => acc + Number(p.monto), 0);

  const pagosRecientes = [...pagos].sort(
    (a, b) => new Date(b.fecha_pago) - new Date(a.fecha_pago),
  );

  return (
    <div className="bg-slate-100 min-h-screen p-4">
      {/* 🔹 HEADER */}
      <div className="mb-8">
        <Tittle>Mis Pagos</Tittle>

        <p className="text-gray-500 mt-2">
          Consulta el historial de pagos realizados, incluyendo detalles de
          referencia, método y estudiante asociado.
        </p>
      </div>

      {/* 🔹 KPIs */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-10"
        id="driver_pagos-generales"
      >
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-emerald-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Total pagado</p>
              <h2 className="text-2xl font-bold text-emerald-600 mt-2">
                {formatCurrency(totalPagado)}
              </h2>
            </div>
            <DollarSign className="text-emerald-500 w-10 h-10" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-slate-800">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Pagos registrados</p>
              <h2 className="text-2xl font-bold text-slate-800 mt-2">
                {pagos.length}
              </h2>
            </div>
            <CreditCard className="text-slate-500 w-10 h-10" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-blue-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Último pago</p>
              <h2 className="text-sm font-semibold text-slate-700 mt-2">
                {pagosRecientes[0]
                  ? new Date(pagosRecientes[0].fecha_pago).toLocaleDateString(
                      "es-MX",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      },
                    )
                  : "N/D"}
              </h2>
            </div>
            <Calendar className="text-blue-500 w-10 h-10" />
          </div>
        </div>
      </div>

      {/* 🔹 TABLA DESKTOP */}
      <div
        className="hidden md:block bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
        id="driver_pagos-tabla"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
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
                    <CreditCard size={16} />
                    Método
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

            <tbody>
              {pagosRecientes.map((pago, index) => (
                <tr
                  key={pago.id}
                  className={`
                    border-t transition hover:bg-slate-50
                    ${index % 2 === 0 ? "bg-white" : "bg-slate-50/40"}
                  `}
                >
                  <td className="p-4 font-medium text-slate-700">
                    {pago.estudiante?.nombre}
                  </td>

                  <td className="p-4 text-gray-500 font-mono text-xs">
                    {pago.referencia}
                  </td>

                  <td className="p-4">
                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">
                      {formatCurrency(pago.monto)}
                    </span>
                  </td>

                  <td className="p-4 text-gray-500">{pago.metodo_pago}</td>

                  <td className="p-4 text-gray-500">
                    {new Date(pago.fecha_pago).toLocaleDateString("es-MX", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  <td className="p-4">
                    <span className="flex items-center gap-1 text-green-600 text-xs font-medium">
                      <CheckCircle size={14} />
                      Confirmado
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🔹 MOBILE */}
      <div className="md:hidden space-y-4">
        {pagosRecientes.map((pago) => (
          <div
            key={pago.id}
            className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200"
          >
            <div className="flex justify-between items-center">
              <span className="font-medium text-slate-700">
                {pago.estudiante?.nombre}
              </span>

              <span className="text-green-600 flex items-center gap-1 text-xs">
                <CheckCircle size={14} /> Confirmado
              </span>
            </div>

            <div className="mt-2 text-sm text-gray-600 space-y-1">
              <p>
                <span className="text-gray-500">Referencia:</span>{" "}
                {pago.referencia}
              </p>

              <p>
                <span className="text-gray-500">Monto:</span>{" "}
                {formatCurrency(pago.monto)}
              </p>

              <p>
                <span className="text-gray-500">Método:</span>{" "}
                {pago.metodo_pago}
              </p>

              <p>
                <span className="text-gray-500">Fecha:</span>{" "}
                {new Date(pago.fecha_pago).toLocaleDateString("es-MX")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

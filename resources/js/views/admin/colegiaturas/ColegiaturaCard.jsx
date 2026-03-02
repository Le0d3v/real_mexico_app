import React from "react";
import { formatCurrency } from "../../../helpers/helpers";

export default function ColegiaturaCard({ colegiatura }) {
    const pendiente = colegiatura.monto - colegiatura.pagado;

    const estado =
        pendiente <= 0
            ? "Pagado"
            : colegiatura.estado?.toLowerCase() === "Pendiente"
              ? "Vencido"
              : "Pendiente";

    const estadoStyles =
        estado === "Pagado"
            ? "bg-green-100 text-green-700 border-green-500"
            : estado === "Pendiente"
              ? "bg-yellow-100 text-yellow-700 border-yellow-500"
              : "bg-red-100 text-red-700 border-red-500";

    const borderIndicator =
        estado === "Pagado"
            ? "border-l-green-500"
            : estado === "Pendiente"
              ? "border-l-yellow-500"
              : "border-l-red-500";

    return (
        <div
            className={`bg-white rounded-xl shadow-md border border-gray-200 border-l-4 ${borderIndicator} p-5 hover:shadow-lg transition-all`}
        >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-lg font-bold text-gray-800">
                        {colegiatura.mes}
                    </h2>
                    <p className="text-sm text-gray-500">
                        Ciclo {colegiatura.anio}
                    </p>
                </div>

                <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full border ${estadoStyles}`}
                >
                    {estado}
                </span>
            </div>

            {/* Body */}
            <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-500">Monto</span>
                    <span className="font-semibold text-gray-800">
                        {formatCurrency(colegiatura.monto)}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-500">Pagado</span>
                    <span className="font-semibold text-green-600">
                        {formatCurrency(colegiatura.pagado)}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-500">Pendiente</span>
                    <span
                        className={`font-semibold ${
                            pendiente > 0 ? "text-red-600" : "text-gray-400"
                        }`}
                    >
                        {formatCurrency(pendiente)}
                    </span>
                </div>
            </div>

            {/* Barra de progreso */}
            <div className="mt-4">
                <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div
                        className="h-2 rounded-full bg-green-500 transition-all"
                        style={{
                            width: `${Math.min(
                                (colegiatura.pagado / colegiatura.monto) * 100,
                                100,
                            )}%`,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

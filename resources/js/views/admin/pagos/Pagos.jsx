import React from "react";
import {
    DollarSign,
    Calendar,
    Search,
    Filter,
    PlusCircle,
    ReceiptText,
    Users,
} from "lucide-react";

export default function Pagos() {
    // Datos de ejemplo (pagos ya realizados)
    const pagos = [
        {
            id: 1,
            estudiante: "Juan Pérez",
            tutor: "María López",
            fecha: "2026-02-01 10:32",
            monto: 3200,
            metodo: "Transferencia",
            referencia: "TRX-89321",
            observaciones: "Pago correspondiente a febrero",
        },
        {
            id: 2,
            estudiante: "Ana Martínez",
            tutor: "Carlos Ruiz",
            fecha: "2026-01-10 09:15",
            monto: 2800,
            metodo: "Efectivo",
            referencia: "EF-00123",
            observaciones: "Pago realizado en caja",
        },
        {
            id: 3,
            estudiante: "Luis Gómez",
            tutor: "Sofía Herrera",
            fecha: "2026-02-15 12:05",
            monto: 3500,
            metodo: "Tarjeta",
            referencia: "POS-77821",
            observaciones: "Incluye recargo por comisión",
        },
    ];

    const totalRecaudado = pagos.reduce((acc, pago) => acc + pago.monto, 0);

    return (
        <div className="bg-slate-100 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">
                        Historial de Pagos
                    </h1>
                    <p className="text-slate-500 mt-1">
                        Registro consolidado de pagos efectuados
                    </p>
                </div>

                <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-xl shadow hover:shadow-md transition">
                    <PlusCircle size={18} />
                    Registrar Nuevo Pago
                </button>
            </div>

            {/* Indicadores */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-slate-500">
                                Total Recaudado (Vista Actual)
                            </p>
                            <h2 className="text-2xl font-bold text-emerald-600 mt-2">
                                ${totalRecaudado.toLocaleString()}
                            </h2>
                        </div>
                        <DollarSign className="text-emerald-500 w-8 h-8" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-slate-500">
                                Total de Registros
                            </p>
                            <h2 className="text-2xl font-bold text-slate-800 mt-2">
                                {pagos.length}
                            </h2>
                        </div>
                        <ReceiptText className="text-slate-500 w-8 h-8" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-slate-500">
                                Promedio por Pago
                            </p>
                            <h2 className="text-2xl font-bold text-slate-800 mt-2">
                                $
                                {(
                                    totalRecaudado / pagos.length
                                ).toLocaleString()}
                            </h2>
                        </div>
                        <Users className="text-slate-500 w-8 h-8" />
                    </div>
                </div>
            </div>

            {/* Filtros */}
            <div className="bg-white p-6 rounded-2xl shadow-sm mb-6">
                <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
                    <div className="flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-xl w-full md:w-1/3">
                        <Search size={18} className="text-slate-500" />
                        <input
                            type="text"
                            placeholder="Buscar por estudiante o referencia..."
                            className="bg-transparent outline-none w-full text-sm"
                        />
                    </div>

                    <div className="flex gap-4">
                        <button className="flex items-center gap-2 bg-slate-200 px-4 py-2 rounded-xl text-sm hover:bg-slate-300 transition">
                            <Calendar size={16} />
                            Filtrar por Fecha
                        </button>

                        <button className="flex items-center gap-2 bg-slate-200 px-4 py-2 rounded-xl text-sm hover:bg-slate-300 transition">
                            <Filter size={16} />
                            Método de Pago
                        </button>
                    </div>
                </div>
            </div>

            {/* Tabla */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-slate-600 uppercase text-xs tracking-wide">
                        <tr>
                            <th className="text-left px-6 py-4">Tutor</th>
                            <th className="text-left px-6 py-4">
                                Fecha de Registro
                            </th>
                            <th className="text-left px-6 py-4">Monto</th>
                            <th className="text-left px-6 py-4">
                                Método de Pago
                            </th>
                            <th className="text-left px-6 py-4">Referencia</th>
                            <th className="text-left px-6 py-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagos.map((pago) => (
                            <tr
                                key={pago.id}
                                className="border-t hover:bg-slate-50 transition"
                            >
                                <td className="px-6 py-4">{pago.tutor}</td>
                                <td className="px-6 py-4">{pago.fecha}</td>
                                <td className="px-6 py-4 font-semibold text-emerald-600">
                                    ${pago.monto.toLocaleString()}
                                </td>
                                <td className="px-6 py-4">{pago.metodo}</td>
                                <td className="px-6 py-4 text-slate-500">
                                    {pago.referencia}
                                </td>
                                <td className="px-6 py-4 text-slate-600">
                                    <button>Ver Más</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

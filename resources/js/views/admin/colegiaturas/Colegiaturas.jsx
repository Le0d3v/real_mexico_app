import React from "react";
import Tittle from "../../components/Tittle";

export default function Colegiaturas() {
    const registros = [
        {
            id: 1,
            alumno: "Juan Pérez",
            grado: "3° A",
            mensualidad: 1800,
            pagado: 1800,
            pendiente: 0,
            estado: "Pagado",
        },
        {
            id: 2,
            alumno: "Sofía Ramírez",
            grado: "5° B",
            mensualidad: 1800,
            pagado: 1000,
            pendiente: 800,
            estado: "Pendiente",
        },
        {
            id: 3,
            alumno: "Luis Hernández",
            grado: "2° C",
            mensualidad: 1800,
            pagado: 0,
            pendiente: 1800,
            estado: "Vencido",
        },
    ];

    const totalRecaudado = registros.reduce((acc, r) => acc + r.pagado, 0);
    const totalPendiente = registros.reduce((acc, r) => acc + r.pendiente, 0);

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow border-l-4 border-black">
                    <p className="text-gray-500 text-sm">Recaudado del mes</p>
                    <h2 className="text-2xl font-bold text-gray-800">
                        ${totalRecaudado.toLocaleString()}
                    </h2>
                </div>

                <div className="bg-white p-6 rounded-xl shadow border-l-4 border-yellow-500">
                    <p className="text-gray-500 text-sm">
                        Pendiente por cobrar
                    </p>
                    <h2 className="text-2xl font-bold text-yellow-600">
                        ${totalPendiente.toLocaleString()}
                    </h2>
                </div>

                <div className="bg-white p-6 rounded-xl shadow border-l-4 border-red-600">
                    <p className="text-gray-500 text-sm">Casos vencidos</p>
                    <h2 className="text-2xl font-bold text-red-600">
                        {registros.filter((r) => r.estado === "Vencido").length}
                    </h2>
                </div>
            </div>

            {/* Filtros */}
            <div className="bg-white p-4 rounded-xl shadow-sm mb-6 border border-gray-200">
                <div className="flex gap-4 flex-wrap">
                    <input
                        type="text"
                        placeholder="Buscar por alumno..."
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />

                    <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500">
                        <option>Todos los estados</option>
                        <option>Pagado</option>
                        <option>Pendiente</option>
                        <option>Vencido</option>
                    </select>

                    <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500">
                        <option>Mes actual</option>
                        <option>Enero</option>
                        <option>Febrero</option>
                        <option>Marzo</option>
                    </select>
                </div>
            </div>

            {/* Tabla financiera */}
            <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-black text-yellow-400">
                        <tr>
                            <th className="px-6 py-3">Alumno</th>
                            <th className="px-6 py-3">Grado</th>
                            <th className="px-6 py-3 text-right">
                                Mensualidad
                            </th>
                            <th className="px-6 py-3 text-right">Pagado</th>
                            <th className="px-6 py-3 text-right">Pendiente</th>
                            <th className="px-6 py-3 text-center">Estado</th>
                            <th className="px-6 py-3 text-center">Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {registros.map((registro) => (
                            <tr
                                key={registro.id}
                                className="border-t hover:bg-gray-50 transition"
                            >
                                <td className="px-6 py-4 font-medium text-gray-800">
                                    {registro.alumno}
                                </td>

                                <td className="px-6 py-4 text-gray-600">
                                    {registro.grado}
                                </td>

                                <td className="px-6 py-4 text-right font-semibold">
                                    ${registro.mensualidad.toLocaleString()}
                                </td>

                                <td className="px-6 py-4 text-right text-green-600 font-semibold">
                                    ${registro.pagado.toLocaleString()}
                                </td>

                                <td className="px-6 py-4 text-right font-bold text-red-600">
                                    ${registro.pendiente.toLocaleString()}
                                </td>

                                <td className="px-6 py-4 text-center">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                            registro.estado === "Pagado"
                                                ? "bg-green-100 text-green-700"
                                                : registro.estado ===
                                                    "Pendiente"
                                                  ? "bg-yellow-100 text-yellow-800"
                                                  : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {registro.estado}
                                    </span>
                                </td>

                                <td className="px-6 py-4 text-center">
                                    <div className="flex justify-center gap-2">
                                        <button className="px-3 py-1 text-sm rounded-md bg-yellow-500 text-black hover:bg-yellow-600 transition">
                                            Registrar pago
                                        </button>
                                        <button className="px-3 py-1 text-sm rounded-md bg-gray-200 hover:bg-gray-300 transition">
                                            Historial
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

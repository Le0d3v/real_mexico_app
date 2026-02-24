import React from "react";
import Tittle from "../components/Tittle";

export default function Dashboard() {
    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <Tittle>Panel de Administración</Tittle>

            {/* KPIs principales */}
            <div className="grid md:grid-cols-4 gap-6 mb-8 mt-10">
                <div className="bg-white p-6 rounded-2xl shadow border-l-4 border-black">
                    <p className="text-gray-500 text-sm">Estudiantes Activos</p>
                    <h2 className="text-3xl font-bold text-gray-800">248</h2>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow border-l-4 border-yellow-500">
                    <p className="text-gray-500 text-sm">Tutores Registrados</p>
                    <h2 className="text-3xl font-bold text-gray-800">312</h2>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow border-l-4 border-red-600">
                    <p className="text-gray-500 text-sm">Pagos Vencidos</p>
                    <h2 className="text-3xl font-bold text-red-600">17</h2>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow border-l-4 border-yellow-600">
                    <p className="text-gray-500 text-sm">Pendientes del Mes</p>
                    <h2 className="text-3xl font-bold text-yellow-600">
                        $32,400
                    </h2>
                </div>
            </div>

            {/* Estado financiero visual */}
            <div className="bg-white p-8 rounded-2xl shadow mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">
                    Estado Financiero del Mes
                </h3>

                <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                    <div
                        className="bg-green-500 h-6 text-xs font-bold text-white flex items-center justify-center"
                        style={{ width: "68%" }}
                    >
                        68% Recaudado
                    </div>
                </div>

                <div className="flex justify-between mt-4 text-sm text-gray-600">
                    <span>Recaudado: $72,000</span>
                    <span>Meta mensual: $105,000</span>
                </div>
            </div>

            {/* Indicadores académicos y alertas */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Distribución académica */}
                <div className="bg-white p-6 rounded-2xl shadow">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">
                        Distribución por Nivel
                    </h3>

                    <div className="space-y-3">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span>1° a 3°</span>
                                <span>120 alumnos</span>
                            </div>
                            <div className="bg-gray-200 h-3 rounded-full">
                                <div className="bg-yellow-500 h-3 rounded-full w-3/4"></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span>4° a 6°</span>
                                <span>128 alumnos</span>
                            </div>
                            <div className="bg-gray-200 h-3 rounded-full">
                                <div className="bg-black h-3 rounded-full w-4/5"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Alertas */}
                <div className="bg-white p-6 rounded-2xl shadow border-l-4 border-red-600">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">
                        Alertas Importantes
                    </h3>

                    <ul className="space-y-3 text-sm">
                        <li className="flex justify-between">
                            <span>Pagos con más de 30 días de atraso</span>
                            <span className="font-bold text-red-600">
                                5 casos
                            </span>
                        </li>

                        <li className="flex justify-between">
                            <span>Documentación incompleta</span>
                            <span className="font-bold text-yellow-600">
                                8 alumnos
                            </span>
                        </li>

                        <li className="flex justify-between">
                            <span>Tutores sin correo registrado</span>
                            <span className="font-bold text-gray-800">
                                3 registros
                            </span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Accesos rápidos */}
            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Accesos Rápidos
                </h3>

                <div className="grid md:grid-cols-4 gap-4">
                    <button className="bg-black text-yellow-400 py-4 rounded-xl shadow hover:opacity-90 transition font-semibold">
                        Registrar Pago
                    </button>

                    <button className="bg-yellow-500 text-black py-4 rounded-xl shadow hover:opacity-90 transition font-semibold">
                        Nuevo Estudiante
                    </button>

                    <button className="bg-red-600 text-white py-4 rounded-xl shadow hover:opacity-90 transition font-semibold">
                        Nuevo Tutor
                    </button>

                    <button className="bg-gray-200 text-gray-800 py-4 rounded-xl shadow hover:bg-gray-300 transition font-semibold">
                        Nueva Noticia
                    </button>
                </div>
            </div>
        </div>
    );
}

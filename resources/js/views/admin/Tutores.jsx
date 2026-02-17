import React from "react";

export default function Tutores() {
    const tutores = [
        {
            id: 1,
            nombre: "María González",
            parentesco: "Madre",
            telefono: "55 1234 5678",
            email: "maria.gonzalez@email.com",
            alumnos: 2,
            estado: "Activo",
        },
        {
            id: 2,
            nombre: "Carlos Ramírez",
            parentesco: "Padre",
            telefono: "55 8765 4321",
            email: "carlos.ramirez@email.com",
            alumnos: 1,
            estado: "Activo",
        },
        {
            id: 3,
            nombre: "Ana López",
            parentesco: "Abuela",
            telefono: "55 2222 3344",
            email: "ana.lopez@email.com",
            alumnos: 1,
            estado: "Inactivo",
        },
    ];

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            {/* Encabezado */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Administración de Tutores
                    </h1>
                    <p className="text-gray-500">
                        Gestión de responsables legales de los alumnos
                    </p>
                </div>

                <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 rounded-lg shadow transition">
                    + Nuevo Tutor
                </button>
            </div>

            {/* Filtros */}
            <div className="bg-white p-4 rounded-xl shadow-sm mb-6 border border-gray-200">
                <div className="flex gap-4 flex-wrap">
                    <input
                        type="text"
                        placeholder="Buscar por nombre o teléfono..."
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />

                    <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500">
                        <option>Todos los estados</option>
                        <option>Activo</option>
                        <option>Inactivo</option>
                    </select>

                    <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500">
                        <option>Todos los parentescos</option>
                        <option>Padre</option>
                        <option>Madre</option>
                        <option>Abuelo(a)</option>
                        <option>Tío(a)</option>
                        <option>Tutor legal</option>
                    </select>
                </div>
            </div>

            {/* Tabla */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-black text-yellow-400">
                        <tr>
                            <th className="px-6 py-3">Nombre</th>
                            <th className="px-6 py-3">Parentesco</th>
                            <th className="px-6 py-3">Teléfono</th>
                            <th className="px-6 py-3">Correo</th>
                            <th className="px-6 py-3 text-center">Alumnos</th>
                            <th className="px-6 py-3 text-center">Estado</th>
                            <th className="px-6 py-3 text-center">Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {tutores.map((tutor) => (
                            <tr
                                key={tutor.id}
                                className="border-t hover:bg-gray-50 transition"
                            >
                                <td className="px-6 py-4 font-medium text-gray-800">
                                    {tutor.nombre}
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    {tutor.parentesco}
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    {tutor.telefono}
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    {tutor.email}
                                </td>
                                <td className="px-6 py-4 text-center font-semibold">
                                    {tutor.alumnos}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                            tutor.estado === "Activo"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {tutor.estado}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex justify-center gap-2">
                                        <button className="px-3 py-1 text-sm rounded-md bg-gray-200 hover:bg-gray-300 transition">
                                            Ver
                                        </button>
                                        <button className="px-3 py-1 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 transition">
                                            Editar
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

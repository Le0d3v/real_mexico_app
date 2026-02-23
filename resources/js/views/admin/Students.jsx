import React from "react";
import useStudent from "../../hooks/useStudent";
import Loader from "../components/private/Loader";

export default function Students() {
    const { estudiantes, isLoading, error } = useStudent();

    if (isLoading) return <Loader />;
    if (error) return <p>Error al cargar tutores</p>;

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            {/* Encabezado administrativo */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Administración de Estudiantes
                    </h2>
                    <p className="text-gray-500">
                        Registro académico y vinculación con tutores
                    </p>
                </div>

                <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition">
                    + Nuevo Estudiante
                </button>
            </div>

            {/* Filtros */}
            <div className="bg-white p-4 rounded-xl shadow-sm mb-6 border border-gray-200">
                <div className="flex gap-4 flex-wrap">
                    <input
                        type="text"
                        placeholder="Buscar por nombre o matrícula..."
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />

                    <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500">
                        <option>Todos los grados</option>
                        <option>1°</option>
                        <option>2°</option>
                        <option>3°</option>
                        <option>4°</option>
                        <option>5°</option>
                        <option>6°</option>
                    </select>

                    <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500">
                        <option>Todos los estados</option>
                        <option>Activo</option>
                        <option>Baja temporal</option>
                        <option>Egresado</option>
                    </select>
                </div>
            </div>

            {/* Tabla */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-black text-yellow-400">
                        <tr>
                            <th className="px-6 py-3">Alumno</th>
                            <th className="px-6 py-3">Matrícula</th>
                            <th className="px-6 py-3">Grado / Grupo</th>
                            <th className="px-6 py-3">Tutor principal</th>
                            <th className="px-6 py-3 text-center">Estado</th>
                            <th className="px-6 py-3 text-center">Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {estudiantes.map((alumno) => (
                            <tr
                                key={alumno.id}
                                className="border-t hover:bg-gray-50 transition"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        {/* <div className="w-10 h-10 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold">
                                            {alumno.name}
                                        </div> */}
                                        <span className="font-medium text-gray-800">
                                            {alumno.nombre}
                                        </span>
                                    </div>
                                </td>

                                <td className="px-6 py-4 text-gray-600 font-mono"></td>

                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 bg-gray-200 rounded-full text-sm font-semibold">
                                        {alumno.grado} - {alumno.grupo}
                                    </span>
                                </td>

                                <td className="px-6 py-4 text-gray-600">
                                    {alumno.tutores[0].name}
                                </td>

                                <td className="px-6 py-4 text-center">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                            alumno.estado === "Activo"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-800"
                                        }`}
                                    >
                                        {alumno.estado}
                                    </span>
                                </td>

                                <td className="px-6 py-4 text-center">
                                    <div className="flex justify-center gap-2">
                                        <button className="px-3 py-1 text-sm rounded-md bg-gray-200 hover:bg-gray-300 transition">
                                            Perfil
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

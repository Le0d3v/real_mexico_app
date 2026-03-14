import { CirclePlus, Eye, Search, User } from "lucide-react";
import useStudent from "../../../hooks/useStudent";
import Loader from "../../components/Loader";
import { useState, useMemo, useEffect } from "react";
import Modal from "../components/Modal";
import ShowStudent from "./ShowStudent";
import CreateStudent from "./CreateStudent";

export default function Students() {
    const { estudiantes, isLoading, error } = useStudent();

    const [search, setSearch] = useState("");
    const [gradoFilter, setGradoFilter] = useState("Todos");
    const [estadoFilter, setEstadoFilter] = useState("Todos");
    const [currentPage, setCurrentPage] = useState(1);

    const [showStudent, setShowStudent] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [createStudent, setCreateStudent] = useState(false);

    const itemsPerPage = 10;

    useEffect(() => {
        setCurrentPage(1);
    }, [search, gradoFilter, estadoFilter]);

    const filteredStudents = useMemo(() => {
        return estudiantes.filter((alumno) => {
            const fullName =
                `${alumno.nombre ?? ""} ${alumno.apellido_paterno ?? ""} ${alumno.apellido_materno ?? ""}`.toLowerCase();

            const matricula = alumno.matricula?.toLowerCase() ?? "";

            const matchesSearch =
                fullName.includes(search.toLowerCase()) ||
                matricula.includes(search.toLowerCase());

            const matchesGrado =
                gradoFilter === "Todos" ||
                alumno.grado?.toString() === gradoFilter;

            const matchesEstado =
                estadoFilter === "Todos" || alumno.estado === estadoFilter;

            return matchesSearch && matchesGrado && matchesEstado;
        });
    }, [search, gradoFilter, estadoFilter, estudiantes]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredStudents.length / itemsPerPage),
    );

    const paginatedStudents = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return filteredStudents.slice(start, end);
    }, [currentPage, filteredStudents]);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    if (isLoading) return <Loader />;
    if (error) return <p>Error al cargar tutores</p>;

    return (
        <>
            <div className="bg-gray-100 min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            Administración de Estudiantes
                        </h2>
                        <p
                            className="text-gray-500"
                            id="driver_estudiantes-total"
                        >
                            Estudiantes Totales:{" "}
                            <span className="font-bold text-gray-700">
                                {estudiantes.length}
                            </span>
                        </p>
                    </div>

                    <button
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition cursor-pointer"
                        onClick={() => setCreateStudent(true)}
                        id="driver_estudiantes-crear"
                    >
                        + Nuevo Estudiante
                    </button>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm mb-5 border border-gray-200">
                    <div className="flex gap-4 flex-wrap">
                        <div
                            className="relative flex-1"
                            id="driver_estudiantes-buscador"
                        >
                            <Search
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <input
                                type="text"
                                placeholder="Buscar Estudiante por Nombre o Matrícula..."
                                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <select
                            value={gradoFilter}
                            onChange={(e) => setGradoFilter(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            id="driver_estudiantes-grado"
                        >
                            <option value="Todos">Todos</option>
                            <option value="1">1°</option>
                            <option value="2">2°</option>
                            <option value="3">3°</option>
                            <option value="4">4°</option>
                            <option value="5">5°</option>
                            <option value="6">6°</option>
                        </select>

                        <select
                            value={estadoFilter}
                            onChange={(e) => setEstadoFilter(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            id="driver_estudiantes-estado"
                        >
                            <option value="Todos">Todos</option>
                            <option value="Activo">Activo</option>
                            <option value="Baja temporal">Baja temporal</option>
                            <option value="Egresado">Egresado</option>
                        </select>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <table
                        className="w-full text-left"
                        id="driver_estudiantes-tabla"
                    >
                        <thead className="bg-black text-yellow-400">
                            <tr>
                                <th className="px-6 py-3">Alumno</th>
                                <th className="px-6 py-3">Matrícula</th>
                                <th className="px-6 py-3">Grado / Grupo</th>
                                <th className="px-6 py-3">Tutor principal</th>
                                <th className="px-6 py-3 text-center">
                                    Estado
                                </th>
                                <th className="px-6 py-3 text-center">
                                    Acciones
                                </th>
                            </tr>
                        </thead>

                        <tbody id="driver_estudiantes-registros">
                            {paginatedStudents.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="text-center py-6 text-gray-500"
                                    >
                                        No se encontraron registros
                                    </td>
                                </tr>
                            ) : (
                                paginatedStudents.map((alumno) => (
                                    <tr
                                        key={alumno.id}
                                        className="border-t border-gray-300 hover:bg-gray-200 transition"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold">
                                                    <User />
                                                </div>
                                                <span className="font-medium text-gray-800">
                                                    {alumno.nombre +
                                                        " " +
                                                        alumno.apellido_paterno}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 text-gray-600 font-mono">
                                            <span className="font-semibold text-gray-700">
                                                {alumno.matricula}
                                            </span>
                                        </td>

                                        <td className="py-4 flex justify-center">
                                            <span className="px-3 py-1 bg-gray-200 rounded-full text-sm font-semibold">
                                                {alumno.grado} - {alumno.grupo}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 text-gray-600">
                                            <span className="font-medium text-gray-800">
                                                {alumno.tutores?.[0]?.usuario
                                                    ?.name +
                                                    " " +
                                                    alumno.tutores?.[0]?.usuario
                                                        ?.apellido_paterno ??
                                                    "—"}
                                            </span>
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
                                                <button
                                                    className="px-3 py-1 font-semibold rounded-md bg-yellow-400 hover:bg-yellow-500 transition cursor-pointer text-black hover:-translate-y-1 perfil"
                                                    onClick={() => {
                                                        setSelectedStudent(
                                                            alumno,
                                                        );
                                                        setShowStudent(true);
                                                    }}
                                                >
                                                    Perfil
                                                </button>
                                                <button className="px-3 py-1 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 transition hover:-translate-y-1 cursor-pointer editar">
                                                    Editar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                    <div
                        className="flex flex-col md:flex-row justify-between items-center gap-4 px-6 py-4 border-t bg-gray-50"
                        id="driver_estudiantes-paginacion"
                    >
                        <p className="text-sm text-gray-600">
                            Página <strong>{currentPage}</strong> de{" "}
                            <strong>{totalPages}</strong>
                        </p>

                        <div className="flex items-center gap-2">
                            <button
                                disabled={currentPage === 1}
                                onClick={() =>
                                    setCurrentPage((prev) => prev - 1)
                                }
                                className="px-3 py-2 rounded-lg text-sm font-medium bg-white border border-gray-300 hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer hover:-translate-y-1"
                            >
                                ←
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => {
                                const pageNumber = i + 1;
                                const isActive = currentPage === pageNumber;

                                return (
                                    <button
                                        key={pageNumber}
                                        onClick={() =>
                                            setCurrentPage(pageNumber)
                                        }
                                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition cursor-pointer hover:-translate-y-1 ${
                                            isActive
                                                ? "bg-yellow-400 text-black shadow-md"
                                                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                                        }`}
                                    >
                                        {pageNumber}
                                    </button>
                                );
                            })}

                            <button
                                disabled={currentPage === totalPages}
                                onClick={() =>
                                    setCurrentPage((prev) => prev + 1)
                                }
                                className="px-3 py-2 rounded-lg text-sm font-medium bg-white border border-gray-300 hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer hover:-translate-y-1"
                            >
                                →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={showStudent}
                title={"Ver Estudiante"}
                icon={<Eye />}
                size="full"
                onClose={() => setShowStudent(false)}
            >
                {selectedStudent && (
                    <ShowStudent
                        student={selectedStudent}
                        onClose={() => setShowStudent(false)}
                    />
                )}
            </Modal>
            <Modal
                isOpen={createStudent}
                title={"Inscribir Estudiante"}
                icon={<CirclePlus />}
                size="full"
                onClose={() => setCreateStudent(false)}
            >
                <CreateStudent onClose={() => setCreateStudent(false)} />
            </Modal>
        </>
    );
}

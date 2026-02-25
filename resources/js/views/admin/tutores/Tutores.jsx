import { useState, useMemo, useEffect } from "react";
import useTutor from "../../../hooks/useTutor";
import Loader from "../../components/Loader";
import Modal from "../components/Modal";
import { CirclePlus, Eye, Search } from "lucide-react";
import ShowTutor from "./ShowTutor";
import CrearTutor from "./CrearTutor";

export default function Tutores() {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedTutor, setSelectedTutor] = useState(null);
    const [createTutorModal, setCreateTutorModal] = useState(false);
    const [sortOrder, setSortOrder] = useState("desc");

    const itemsPerPage = 10;

    const { tutores = [], isLoading, error } = useTutor();

    useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    const filteredTutores = useMemo(() => {
        let data = [...tutores];

        if (search.trim()) {
            const term = search.toLowerCase();

            data = data.filter((tutor) => {
                const nombreCompleto =
                    `${tutor.name ?? ""} ${tutor.apellido_paterno ?? ""}`.toLowerCase();

                const telefono = tutor.telefono?.toLowerCase() || "";
                const email = tutor.email?.toLowerCase() || "";

                return (
                    nombreCompleto.includes(term) ||
                    telefono.includes(term) ||
                    email.includes(term)
                );
            });
        }

        data.sort((a, b) => {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);

            return sortOrder === "desc"
                ? dateB - dateA // más recientes primero
                : dateA - dateB; // más antiguos primero
        });

        return data;
    }, [search, tutores, sortOrder]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredTutores.length / itemsPerPage),
    );

    const paginatedTutores = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return filteredTutores.slice(start, end);
    }, [currentPage, filteredTutores]);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    if (isLoading) return <Loader />;
    if (error) return <p>Error al cargar tutores</p>;

    return (
        <>
            <div className="p-1 min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Administración de Tutores
                        </h1>
                        <p className="text-gray-500">
                            Tutores totales:{" "}
                            <span className="text-gray-700 font-bold">
                                {tutores.length}
                            </span>
                        </p>
                    </div>

                    <button
                        className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-lg shadow transition cursor-pointer"
                        onClick={() => setCreateTutorModal(true)}
                    >
                        + Nuevo Tutor
                    </button>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm mb-6 border border-gray-200 flex gap-5">
                    <div className="flex gap-4 flex-wrap w-full">
                        <div className="relative flex-1">
                            <Search
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <input
                                type="text"
                                placeholder="Buscar Tutor por nombre, teléfono o correo electrónico..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full flex-1 border border-gray-300 rounded-lg pl-10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                    </div>
                    <div>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            <option value="desc">Más recientes</option>
                            <option value="asc">Más antiguos</option>
                        </select>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-black text-yellow-400">
                            <tr>
                                <th className="px-6 py-3">Nombre</th>
                                <th className="px-6 py-3">Teléfono</th>
                                <th className="px-6 py-3">
                                    Correo Electrónico
                                </th>
                                <th className="px-6 py-3 text-center">
                                    Alumnos
                                </th>
                                <th className="px-6 py-3 text-center">
                                    Acciones
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {paginatedTutores.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="text-center py-6 text-gray-500"
                                    >
                                        No se encontraron registros
                                    </td>
                                </tr>
                            ) : (
                                paginatedTutores.map((tutor) => (
                                    <tr
                                        key={tutor.id}
                                        className="border-t border-t-gray-200 hover:bg-gray-200 transition"
                                    >
                                        <td className="px-6 py-4 font-medium text-gray-800">
                                            {tutor.name}{" "}
                                            {tutor.apellido_paterno}
                                        </td>

                                        <td className="px-6 py-4 text-gray-600">
                                            {tutor.telefono}
                                        </td>

                                        <td className="px-6 py-4 text-gray-600">
                                            {tutor.email}
                                        </td>

                                        <td className="px-6 py-4 text-center font-semibold">
                                            {tutor?.tutor?.estudiantes
                                                ?.length || 0}
                                        </td>

                                        <td className="px-6 py-4 text-center">
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    className="px-3 py-1 text-sm rounded-md bg-yellow-400 hover:bg-yellow-500 transition text-black cursor-pointer font-semibold"
                                                    onClick={() => {
                                                        setSelectedTutor(tutor);
                                                        setOpen(true);
                                                    }}
                                                >
                                                    Ver Más
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8 px-6 py-4 border-t bg-gray-50 rounded-b-2xl">
                        <p className="text-sm text-gray-500 font-medium">
                            Página{" "}
                            <span className="font-semibold text-gray-800">
                                {currentPage}
                            </span>{" "}
                            de{" "}
                            <span className="font-semibold text-gray-800">
                                {totalPages}
                            </span>
                        </p>

                        <div className="flex items-center gap-2">
                            {/* Botón Anterior */}
                            <button
                                disabled={currentPage === 1}
                                onClick={() =>
                                    setCurrentPage((prev) => prev - 1)
                                }
                                className="px-3 py-2 rounded-lg text-sm font-medium bg-white border border-gray-300 shadow-sm 
                           hover:bg-gray-100 hover:shadow transition-all duration-200
                           disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                ←
                            </button>

                            {/* Números dinámicos */}
                            {Array.from({ length: totalPages }, (_, i) => {
                                const pageNumber = i + 1;
                                const isActive = currentPage === pageNumber;

                                return (
                                    <button
                                        key={pageNumber}
                                        onClick={() =>
                                            setCurrentPage(pageNumber)
                                        }
                                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm cursor-pointer
                            ${
                                isActive
                                    ? "bg-yellow-400 text-black shadow-md scale-105"
                                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                            }`}
                                    >
                                        {pageNumber}
                                    </button>
                                );
                            })}

                            {/* Botón Siguiente */}
                            <button
                                disabled={currentPage === totalPages}
                                onClick={() =>
                                    setCurrentPage((prev) => prev + 1)
                                }
                                className="px-3 py-2 rounded-lg text-sm font-medium bg-white border border-gray-300 shadow-sm 
                                hover:bg-gray-100 hover:shadow transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                            >
                                →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={open}
                icon={<Eye className="w-12 h-12" />}
                onClose={() => {
                    setOpen(false);
                    setSelectedTutor(null);
                }}
                size="full"
                title="Ver Información del Tutor"
            >
                {selectedTutor && (
                    <ShowTutor tutor={selectedTutor} onClose={setOpen} />
                )}
            </Modal>

            <Modal
                isOpen={createTutorModal}
                icon={<CirclePlus className="w-12 h-12" />}
                onClose={() => {
                    setCreateTutorModal(false);
                }}
                size="full"
                title="Registrar un Nuevo Tutor"
            >
                <CrearTutor onClose={setCreateTutorModal} />
            </Modal>
        </>
    );
}

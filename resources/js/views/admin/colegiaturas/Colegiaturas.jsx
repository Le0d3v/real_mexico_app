import { useState, useMemo, useEffect } from "react";
import useColegiatura from "../../../hooks/useColegiatura";
import Loader from "../../components/Loader";
import meses from "../../../helpers/meses";
import { formatCurrency } from "../../../helpers/helpers";
import Modal from "../components/Modal";
import { CirclePlus, Eye } from "lucide-react";
import Historial from "./Historial";
import RegistrarPago from "./RegistrarPago";

export default function Colegiaturas() {
    const { colegiaturas, isLoading } = useColegiatura();

    const mesActual = meses[new Date().getMonth()];

    const [historialModal, setHistoialModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [colegiaturasHistorial, setColegiaturasHistorial] = useState([]);
    const [registroModal, setRegistroModal] = useState(false);

    const [search, setSearch] = useState("");
    const [estadoFiltro, setEstadoFiltro] = useState("Todos");
    const [mesFiltro, setMesFiltro] = useState(mesActual);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 8;

    const colegiaturasFiltradas = useMemo(() => {
        return colegiaturas.filter((r) => {
            const coincideNombre = r.estudiante.nombre
                .toLowerCase()
                .includes(search.toLowerCase());

            const coincideEstado =
                estadoFiltro === "Todos" ||
                r.estado.toLowerCase() === estadoFiltro.toLowerCase();

            const coincideMes = mesFiltro === "Todos" || r.mes === mesFiltro;

            return coincideNombre && coincideEstado && coincideMes;
        });
    }, [colegiaturas, search, estadoFiltro, mesFiltro]);

    // Reset página cuando cambian filtros
    useEffect(() => {
        setCurrentPage(1);
    }, [search, estadoFiltro, mesFiltro]);

    // 📄 Paginación
    const totalPages = Math.ceil(colegiaturasFiltradas.length / itemsPerPage);

    const registrosPaginados = colegiaturasFiltradas.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    );

    // 📊 Totales (solo del mes filtrado)
    const totalRecaudado = colegiaturasFiltradas.reduce(
        (acc, r) => acc + r.pagado,
        0,
    );

    const totalPendiente = colegiaturasFiltradas.reduce(
        (acc, r) => acc + (r.monto - r.pagado),
        0,
    );

    const casosVencidos = colegiaturasFiltradas.filter(
        (r) => r.estado.toLowerCase() === "Vencido",
    ).length;

    const showHistorial = (student) => {
        const studentColegiaturas = colegiaturas.filter(
            (h) => h.estudiante_id === student.estudiante.id,
        );

        setSelectedStudent(student);
        setColegiaturasHistorial(studentColegiaturas);
        setHistoialModal(true);
    };

    const registrarPago = (student) => {
        const studentColegiaturas = colegiaturas.filter(
            (h) => h.estudiante_id === student.estudiante.id,
        );

        setSelectedStudent(student);
        setColegiaturasHistorial(studentColegiaturas);
        setRegistroModal(true);
    };

    if (isLoading) return <Loader />;

    return (
        <>
            <div className="bg-gray-100 min-h-screen">
                {/* Resumen */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow border-l-4 border-black">
                        <p className="text-gray-500 text-sm">Recaudado</p>
                        <h2 className="text-2xl font-bold text-gray-800">
                            {formatCurrency(totalRecaudado)}
                        </h2>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow border-l-4 border-yellow-500">
                        <p className="text-gray-500 text-sm">Pendiente</p>
                        <h2 className="text-2xl font-bold text-yellow-600">
                            {formatCurrency(totalPendiente)}
                        </h2>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow border-l-4 border-red-600">
                        <p className="text-gray-500 text-sm">Casos vencidos</p>
                        <h2 className="text-2xl font-bold text-red-600">
                            {casosVencidos}
                        </h2>
                    </div>
                </div>

                {/* Filtros */}
                <div className="bg-white p-4 rounded-xl shadow-sm mb-6 border border-gray-200">
                    <div className="flex gap-4 flex-wrap">
                        <input
                            type="text"
                            placeholder="Buscar Colegiatura por Alumno..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        />

                        <select
                            value={estadoFiltro}
                            onChange={(e) => setEstadoFiltro(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            <option value="Todos">Todas</option>
                            <option value="Pagado">Pagadas</option>
                            <option value="Pendiente">Pendientes</option>
                            <option value="Vencido">Vencidas</option>
                        </select>

                        <select
                            value={mesFiltro}
                            onChange={(e) => setMesFiltro(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            {meses.map((mes) => (
                                <option key={mes} value={mes}>
                                    {mes}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Tabla */}
                <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-black text-yellow-400">
                            <tr>
                                <th className="px-6 py-3 text-center">
                                    Alumno
                                </th>
                                <th className="px-6 py-3 text-center">Grado</th>
                                <th className="px-6 py-3 text-center">Mes</th>
                                <th className="px-6 py-3 text-center">
                                    Pagado
                                </th>
                                <th className="px-6 py-3 text-center">
                                    Pendiente
                                </th>
                                <th className="px-6 py-3 text-center">
                                    Estado
                                </th>
                                <th className="px-6 py-3 text-center">
                                    Acciones
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {registrosPaginados.map((registro) => (
                                <tr
                                    key={registro.id}
                                    className="border-t hover:bg-gray-200 transition border-gray-200"
                                >
                                    <td className="px-6 py-4 font-medium">
                                        {registro.estudiante.nombre}
                                    </td>

                                    <td className="py-4 flex justify-center">
                                        <span className="px-3 py-1 bg-gray-200 rounded-full text-sm font-semibold">
                                            {registro.estudiante.grado} -{" "}
                                            {registro.estudiante.grupo}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        {registro.mes}
                                    </td>

                                    <td className="px-6 py-4 text-center text-green-600 font-semibold">
                                        {formatCurrency(registro.pagado)}
                                    </td>

                                    <td className="px-6 py-4 text-center text-red-600 font-semibold">
                                        {formatCurrency(
                                            registro.monto - registro.pagado,
                                        )}
                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                                registro.estado.toLowerCase() ===
                                                    "pagado" ||
                                                registro.estado.toLowerCase() ===
                                                    "Pagado"
                                                    ? "bg-green-100 text-green-700"
                                                    : registro.estado.toLowerCase() ===
                                                        "pendiente"
                                                      ? "bg-yellow-100 text-yellow-800"
                                                      : "bg-red-100 text-red-700"
                                            }`}
                                        >
                                            {registro.estado}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        <div className="flex justify-center gap-2">
                                            <button
                                                className="px-3 py-1 text-sm rounded-md bg-yellow-500 text-black hover:bg-yellow-600 transition cursor-pointer"
                                                onClick={() =>
                                                    registrarPago(registro)
                                                }
                                            >
                                                Registrar pago
                                            </button>
                                            <button
                                                className="px-3 py-1 text-sm rounded-md bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
                                                onClick={() =>
                                                    showHistorial(registro)
                                                }
                                            >
                                                Historial
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Paginación */}
                    {totalPages > 1 && (
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-6 py-4 border-t bg-gray-50">
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
                                    className="px-3 py-2 rounded-lg text-sm font-medium bg-white border border-gray-300 hover:bg-gray-100 transition disabled:opacity-40"
                                >
                                    ←
                                </button>

                                {Array.from(
                                    { length: totalPages },
                                    (_, i) => i + 1,
                                )
                                    .filter(
                                        (page) =>
                                            page === 1 ||
                                            page === totalPages ||
                                            Math.abs(page - currentPage) <= 1,
                                    )
                                    .map((page, index, array) => {
                                        if (
                                            index > 0 &&
                                            page - array[index - 1] > 1
                                        ) {
                                            return (
                                                <span
                                                    key={`dots-${page}`}
                                                    className="px-2"
                                                >
                                                    ...
                                                </span>
                                            );
                                        }

                                        return (
                                            <button
                                                key={page}
                                                onClick={() =>
                                                    setCurrentPage(page)
                                                }
                                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                                                    currentPage === page
                                                        ? "bg-yellow-400 text-black shadow-md"
                                                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                                                }`}
                                            >
                                                {page}
                                            </button>
                                        );
                                    })}

                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() =>
                                        setCurrentPage((prev) => prev + 1)
                                    }
                                    className="px-3 py-2 rounded-lg text-sm font-medium bg-white border border-gray-300 hover:bg-gray-100 transition disabled:opacity-40"
                                >
                                    →
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Modal
                isOpen={historialModal}
                onClose={() => setHistoialModal(false)}
                icon={<Eye />}
                title={"Historial de Colegiaturas"}
                size={"full"}
            >
                <Historial
                    colegiaturas={colegiaturasHistorial}
                    student={selectedStudent}
                    onClose={setHistoialModal}
                />
            </Modal>
            <Modal
                isOpen={registroModal}
                onClose={() => setRegistroModal(false)}
                icon={<CirclePlus />}
                title={"Registro de Pago por Colegiatura"}
                size={"full"}
            >
                <RegistrarPago
                    colegiaturas={colegiaturasHistorial}
                    student={selectedStudent}
                    onClose={setHistoialModal}
                />
            </Modal>
        </>
    );
}

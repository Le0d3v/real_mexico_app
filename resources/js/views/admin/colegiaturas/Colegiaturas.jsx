import { useState, useMemo, useEffect } from "react";
import useColegiatura from "../../../hooks/useColegiatura";
import Loader from "../../components/Loader";
import meses from "../../../helpers/meses";
import { formatCurrency } from "../../../helpers/helpers";
import Modal from "../components/Modal";
import { CirclePlus, Eye, Search } from "lucide-react";
import Historial from "./Historial";
import RegistrarPago from "./RegistrarPago";
import ExportExcel from "../components/ExportExcel";

export default function Colegiaturas() {
    const { colegiaturas, isLoading } = useColegiatura();

    const mesActual = meses[new Date().getMonth()];

    const columnasExcel = [
        { label: "Alumno", key: "alumno" },
        { label: "Matricula", key: "matricula" },
        { label: "Grado / Grupo", key: "grado" },
        { label: "Mes", key: "mes" },
        { label: "Monto", key: "monto" },
        { label: "Pagado", key: "pagado" },
        { label: "Pendiente", key: "pendiente" },
        { label: "Estado", key: "estado" },
    ];

    const [historialModal, setHistoialModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [colegiaturasHistorial, setColegiaturasHistorial] = useState([]);
    const [registroModal, setRegistroModal] = useState(false);

    const [search, setSearch] = useState("");
    const [estadoFiltro, setEstadoFiltro] = useState("Todos");
    const [mesFiltro, setMesFiltro] = useState(mesActual);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;

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
        (r) => r.estado === "Vencida",
    ).length;

    console.log(colegiaturasFiltradas);

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

    const datosExcel = colegiaturasFiltradas.map((registro) => ({
        alumno:
            registro.estudiante.nombre +
            " " +
            registro.estudiante.apellido_paterno,

        matricula: registro.estudiante.matricula,

        grado: registro.estudiante.grado + " - " + registro.estudiante.grupo,

        mes: registro.mes,

        monto: formatCurrency(registro.monto),

        pagado: formatCurrency(registro.pagado),

        pendiente: formatCurrency(registro.monto - registro.pagado),

        estado: registro.estado,
    }));

    if (isLoading) return <Loader />;

    return (
        <>
            <div className="bg-gray-100 min-h-screen" id="driver_colegiaturas">
                {/* Resumen */}
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8"
                    id="driver_colegiaturas-resumen"
                >
                    <div className="bg-white p-4 md:p-6 rounded-xl shadow border-l-4 border-black">
                        <p className="text-gray-500 text-xs md:text-sm">
                            Recaudado
                        </p>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                            {formatCurrency(totalRecaudado)}
                        </h2>
                    </div>

                    <div className="bg-white p-4 md:p-6 rounded-xl shadow border-l-4 border-yellow-500">
                        <p className="text-gray-500 text-xs md:text-sm">
                            Pendiente
                        </p>
                        <h2 className="text-xl md:text-2xl font-bold text-yellow-600">
                            {formatCurrency(totalPendiente)}
                        </h2>
                    </div>

                    <div className="bg-white p-4 md:p-6 rounded-xl shadow border-l-4 border-red-600">
                        <p className="text-gray-500 text-xs md:text-sm">
                            Casos vencidos
                        </p>
                        <h2 className="text-xl md:text-2xl font-bold text-red-600">
                            {casosVencidos}
                        </h2>
                    </div>
                </div>

                {/* Filtros */}
                <div
                    className="bg-white p-4 rounded-xl shadow-sm mb-6 border border-gray-200"
                    id="driver_colegiaturas-filtros"
                >
                    <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                        <div className="flex items-center gap-2 px-4 rounded-xl w-full border border-gray-300">
                            <Search size={18} className="text-slate-500" />
                            <input
                                type="text"
                                placeholder="Buscar Colegiatura por Alumno..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full md:flex-1 rounded-lg py-2 focus:outline-none "
                                id="driver_colegiaturas-buscador"
                            />
                        </div>

                        <select
                            value={estadoFiltro}
                            onChange={(e) => setEstadoFiltro(e.target.value)}
                            className="w-full md:w-auto border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                            id="driver_colegiaturas-estados"
                        >
                            <option value="Todos">Todas</option>
                            <option value="Pagado">Pagadas</option>
                            <option value="Pendiente">Pendientes</option>
                            <option value="Vencida">Vencidas</option>
                        </select>

                        <select
                            value={mesFiltro}
                            onChange={(e) => setMesFiltro(e.target.value)}
                            className="w-full md:w-auto border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                            id="driver_colegiaturas-mes"
                        >
                            <option value="Todos">Todos los meses</option>
                            {meses.map((mes) => (
                                <option key={mes} value={mes}>
                                    {mes}
                                </option>
                            ))}
                        </select>

                        <ExportExcel
                            data={datosExcel}
                            columns={columnasExcel}
                            fileName="reporte_colegiaturas"
                            sheetName="Colegiaturas"
                        >
                            <div className="flex justify-center md:block">
                                <div
                                    className="p-2 rounded border border-gray-300 cursor-pointer hover:bg-gray-100 hover:-translate-y-1 transition"
                                    title="Exportar a Excel"
                                    id="driver_export-excel"
                                >
                                    <img
                                        src="/img/xls.png"
                                        alt="Excel"
                                        className="w-8 md:w-16"
                                    />
                                </div>
                            </div>
                        </ExportExcel>
                    </div>
                </div>

                {/* Tabla */}
                <div
                    className="bg-white rounded-xl shadow border border-gray-200 overflow-x-auto"
                    id="driver_colegiaturas-tabla"
                >
                    <table className="min-w-[800px] w-full text-left">
                        <thead className="bg-black text-yellow-400">
                            <tr>
                                <th className="px-3 md:px-6 py-3 text-center">
                                    Alumno
                                </th>
                                <th className="px-3 md:px-6 py-3 text-center">
                                    Grado / Grupo
                                </th>
                                <th className="px-3 md:px-6 py-3 text-center">
                                    Mes
                                </th>
                                <th className="px-3 md:px-6 py-3 text-center">
                                    Pagado
                                </th>
                                <th className="px-3 md:px-6 py-3 text-center">
                                    Pendiente
                                </th>
                                <th className="px-3 md:px-6 py-3 text-center">
                                    Estado
                                </th>
                                <th className="px-3 md:px-6 py-3 text-center">
                                    Acciones
                                </th>
                            </tr>
                        </thead>

                        <tbody id="driver_colegiaturas-registros">
                            {registrosPaginados.map((registro) => (
                                <tr
                                    key={registro.id}
                                    className="border-t hover:bg-gray-100 transition border-gray-200"
                                >
                                    <td className="px-3 md:px-6 py-3 md:py-4 font-medium">
                                        {registro.estudiante.nombre +
                                            " " +
                                            registro.estudiante
                                                .apellido_paterno}
                                    </td>

                                    <td className="py-3 md:py-4 flex justify-center">
                                        <span className="px-3 py-1 bg-gray-200 rounded-full text-xs md:text-sm font-semibold">
                                            {registro.estudiante.grado} -{" "}
                                            {registro.estudiante.grupo}
                                        </span>
                                    </td>

                                    <td className="px-3 md:px-6 py-3 md:py-4 text-center">
                                        {registro.mes}
                                    </td>

                                    <td className="px-3 md:px-6 py-3 md:py-4 text-center text-green-600 font-semibold">
                                        {formatCurrency(registro.pagado)}
                                    </td>

                                    <td className="px-3 md:px-6 py-3 md:py-4 text-center text-red-600 font-semibold">
                                        {formatCurrency(
                                            registro.monto - registro.pagado,
                                        )}
                                    </td>

                                    <td className="px-3 md:px-6 py-3 md:py-4 text-center">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs md:text-sm font-semibold ${
                                                registro.estado.toLowerCase() ===
                                                "pagado"
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

                                    <td className="px-3 md:px-6 py-3 md:py-4 text-center">
                                        <div className="flex flex-col md:flex-row justify-center gap-2">
                                            <button
                                                className="px-3 py-1 text-xs md:text-sm rounded-md bg-yellow-500 text-black hover:bg-yellow-600 transition cursor-pointer registrar-pago"
                                                onClick={() =>
                                                    registrarPago(registro)
                                                }
                                            >
                                                Registrar pago
                                            </button>
                                            <button
                                                className="px-3 py-1 text-xs md:text-sm rounded-md bg-gray-200 hover:bg-gray-300 transition cursor-pointer historial"
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
                </div>
                {totalPages > 1 && (
                    <div
                        className="flex flex-col md:flex-row justify-between items-center gap-4 px-4 md:px-6 py-4 border-t bg-gray-50 text-center md:text-left"
                        id="driver_colegiaturas-paginacion"
                    >
                        <p
                            className="text-xs md:text-sm text-gray-600"
                            id="driver_paginacion-numero"
                        >
                            Página <strong>{currentPage}</strong> de{" "}
                            <strong>{totalPages}</strong>
                        </p>

                        <div className="flex items-center gap-2 flex-wrap justify-center">
                            <button
                                disabled={currentPage === 1}
                                onClick={() =>
                                    setCurrentPage((prev) => prev - 1)
                                }
                                className="px-3 py-2 rounded-lg text-xs md:text-sm bg-white border hover:bg-gray-100 disabled:opacity-40 cursor-pointer"
                                id="driver_paginacion-anterior"
                            >
                                ←
                            </button>

                            <div
                                className="flex flex-wrap justify-center gap-1"
                                id="driver_paginacion-botones"
                            >
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
                                            return <span key={page}>...</span>;
                                        }

                                        return (
                                            <button
                                                key={page}
                                                onClick={() =>
                                                    setCurrentPage(page)
                                                }
                                                className={`px-3 py-2 rounded-lg text-xs md:text-sm cursor-pointer boton-paginacion ${
                                                    currentPage === page
                                                        ? "bg-yellow-400 text-black"
                                                        : "bg-white border hover:bg-gray-100"
                                                }`}
                                            >
                                                {page}
                                            </button>
                                        );
                                    })}
                            </div>

                            <button
                                disabled={currentPage === totalPages}
                                onClick={() =>
                                    setCurrentPage((prev) => prev + 1)
                                }
                                className="px-3 py-2 rounded-lg text-xs md:text-sm bg-white border hover:bg-gray-100 disabled:opacity-40 cursor-pointer"
                                id="driver_paginacion-siguiente"
                            >
                                →
                            </button>
                        </div>
                    </div>
                )}
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
                    onClose={() => setRegistroModal(false)}
                />
            </Modal>
        </>
    );
}

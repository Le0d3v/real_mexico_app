import { useState, useMemo, useEffect } from "react";
import { Search, PlusCircle, Eye, CirclePlus } from "lucide-react";
import usePago from "../../../hooks/usePago";
import Loader from "../../components/Loader";
import Modal from "../components/Modal";
import ShowPago from "./ShowPago";
import CrearPago from "./CrearPago";
import { formatCurrency, formatDate } from "../../../helpers/helpers";
import ExportExcel from "../components/ExportExcel";

export default function Pagos() {
    const { pagos, isLoading, error } = usePago();

    const [search, setSearch] = useState("");
    const [metodoFiltro, setMetodoFiltro] = useState("");
    const [fechaFiltro, setFechaFiltro] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const [crearPago, setCrearPago] = useState(false);
    const [showPago, setShowPago] = useState(false);
    const [pago, setPago] = useState(null);

    const itemsPerPage = 10;

    // 🔎 FILTRADO
    const filteredPagos = useMemo(() => {
        let data = [...pagos];

        if (search.trim()) {
            const term = search.toLowerCase();

            data = data.filter((pago) => {
                const nombreTutor =
                    `${pago.tutor?.name ?? ""} ${pago.tutor?.apellido_paterno ?? ""}`.toLowerCase();

                const referencia = pago.referencia?.toLowerCase() ?? "";

                return nombreTutor.includes(term) || referencia.includes(term);
            });
        }

        if (metodoFiltro) {
            data = data.filter((pago) => pago.metodo_pago === metodoFiltro);
        }

        if (fechaFiltro) {
            data = data.filter(
                (pago) => pago.fecha_pago?.slice(0, 10) === fechaFiltro,
            );
        }

        return data;
    }, [pagos, search, metodoFiltro, fechaFiltro]);

    // ✅ TOTAL DE PÁGINAS (CORRECCIÓN CLAVE)
    const totalPages = Math.ceil(filteredPagos.length / itemsPerPage) || 1;

    // 🔁 PAGINADO
    const paginatedPagos = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return filteredPagos.slice(start, end);
    }, [filteredPagos, currentPage]);

    // 🔄 Ajustar página si filtros reducen resultados
    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    // 🔄 Resetear a página 1 cuando cambien filtros
    useEffect(() => {
        setCurrentPage(1);
    }, [search, metodoFiltro, fechaFiltro]);

    // 💰 MÉTRICAS
    const totalRecaudado = filteredPagos.reduce(
        (acc, pago) => acc + Number(pago.monto),
        0,
    );

    const promedio =
        filteredPagos.length > 0 ? totalRecaudado / filteredPagos.length : 0;

    // 📌 PAGINACIÓN INTELIGENTE
    const getPaginationRange = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];
        let lastPage = null;

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - delta && i <= currentPage + delta)
            ) {
                range.push(i);
            }
        }

        for (let i of range) {
            if (lastPage) {
                if (i - lastPage === 2) {
                    rangeWithDots.push(lastPage + 1);
                } else if (i - lastPage > 2) {
                    rangeWithDots.push("...");
                }
            }

            rangeWithDots.push(i);
            lastPage = i;
        }

        return rangeWithDots;
    };

    const columnasExcel = [
        { label: "Responsable", key: "responsable" },
        { label: "Monto", key: "monto" },
        { label: "Fecha", key: "fecha" },
        { label: "Método de Pago", key: "metodo_pago" },
        { label: "Referencia", key: "referencia" },
        { label: "Observaciones", key: "observaciones" },
        { label: "Colegiatura", key: "colegiatura" },
        { label: "Ciclo Escolar", key: "ciclo_escolar" },
    ];

    const datosExcel = filteredPagos.map((registro) => ({
        responsable:
            registro.tutor.name +
            " " +
            registro.tutor.apellido_paterno +
            " " +
            registro.tutor.apellido_materno,

        monto: formatCurrency(registro.monto),

        fecha: formatDate(registro.fecha_pago),

        metodo_pago: registro.metodo_pago,

        referencia: registro.referencia,

        observaciones: registro.observaciones,

        colegiatura: registro.colegiatura.mes,

        ciclo_escolar: registro.colegiatura.ciclo_escolar.nombre,
    }));

    if (isLoading) return <Loader />;
    if (error) return <p>Error al cargar pagos</p>;

    return (
        <>
            <div className="bg-slate-100 min-h-screen">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 md:mb-8">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                            Historial de Pagos
                        </h1>
                        <p className="text-slate-500 mt-1 text-sm md:text-base">
                            Registro consolidado de pagos efectuados
                        </p>
                    </div>

                    <button
                        className="w-full md:w-auto flex justify-center items-center gap-2 bg-slate-900 text-white px-4 md:px-5 py-2 md:py-3 rounded-xl shadow hover:shadow-md transition hover:opacity-90 md:hover:-translate-y-1 cursor-pointer"
                        id="driver_pagos-crear"
                        onClick={() => setCrearPago(true)}
                    >
                        <PlusCircle size={18} />
                        Registrar Nuevo Pago
                    </button>
                </div>

                {/* Indicadores */}
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8"
                    id="driver_pagos-indicadores"
                >
                    <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm">
                        <p className="text-xs md:text-sm text-slate-500">
                            Total Recaudado (Vista Actual)
                        </p>
                        <h2 className="text-xl md:text-2xl font-bold text-emerald-600 mt-2">
                            ${totalRecaudado.toLocaleString()}
                        </h2>
                    </div>

                    <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm">
                        <p className="text-xs md:text-sm text-slate-500">
                            Total de Registros
                        </p>
                        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-2">
                            {filteredPagos.length}
                        </h2>
                    </div>

                    <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm">
                        <p className="text-xs md:text-sm text-slate-500">
                            Promedio por Pago
                        </p>
                        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-2">
                            ${promedio.toLocaleString()}
                        </h2>
                    </div>
                </div>

                {/* Filtros */}
                <div
                    className="bg-white p-4 md:p-6 rounded-2xl shadow-sm mb-6"
                    id="driver_pagos-filtros"
                >
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row gap-3 md:gap-4 md:items-center justify-between">
                            <div
                                className="flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-xl w-full"
                                id="driver_pagos-buscador"
                            >
                                <Search size={18} className="text-slate-500" />
                                <input
                                    type="text"
                                    placeholder="Buscar por Tutor o Referencia..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="bg-transparent outline-none w-full text-sm p-1"
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                                <select
                                    value={metodoFiltro}
                                    onChange={(e) =>
                                        setMetodoFiltro(e.target.value)
                                    }
                                    className="w-full sm:w-auto bg-slate-200 px-4 py-2 rounded-xl text-sm"
                                    id="driver_pagos-metodos"
                                >
                                    <option value="">Todos los métodos</option>
                                    <option value="Efectivo">Efectivo</option>
                                    <option value="Transferencia">
                                        Transferencia
                                    </option>
                                    <option value="Tarjeta">Tarjeta</option>
                                </select>

                                <input
                                    id="driver_pagos-fecha"
                                    type="date"
                                    value={fechaFiltro}
                                    onChange={(e) =>
                                        setFechaFiltro(e.target.value)
                                    }
                                    className="w-full sm:w-auto bg-slate-200 px-4 py-2 rounded-xl text-sm"
                                />
                            </div>

                            <ExportExcel
                                data={datosExcel}
                                columns={columnasExcel}
                                fileName="reporte_pagos"
                                sheetName="Pagos"
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
                </div>

                {/* Tabla */}
                <div
                    className="bg-white rounded-2xl shadow-sm overflow-x-auto"
                    id="driver_pagos-tabla"
                >
                    <table className="min-w-[700px] w-full text-xs md:text-sm">
                        <thead className="bg-black text-white font-semibold text-sm md:text-lg">
                            <tr>
                                <th className="px-3 md:px-6 py-3 md:py-4 text-center">
                                    Sujeto
                                </th>
                                <th className="px-3 md:px-6 py-3 md:py-4 text-center">
                                    Fecha
                                </th>
                                <th className="px-3 md:px-6 py-3 md:py-4 text-center">
                                    Monto
                                </th>
                                <th className="px-3 md:px-6 py-3 md:py-4 text-center">
                                    Método
                                </th>
                                <th className="px-3 md:px-6 py-3 md:py-4 text-center">
                                    Referencia
                                </th>
                                <th className="px-3 md:px-6 py-3 md:py-4 text-center">
                                    Acciones
                                </th>
                            </tr>
                        </thead>

                        <tbody id="driver_pagos-registros">
                            {paginatedPagos.map((pago) => (
                                <tr
                                    key={pago.id}
                                    className="border-t hover:bg-gray-200 text-center border-gray-300"
                                >
                                    <td className="px-3 md:px-6 py-2 md:py-3">
                                        {pago.tutor?.name}{" "}
                                        {pago.tutor?.apellido_paterno}
                                    </td>

                                    <td className="px-3 md:px-6 py-2 md:py-3">
                                        {formatDate(pago.fecha_pago)}
                                    </td>

                                    <td className="px-3 md:px-6 py-2 md:py-3 font-semibold text-emerald-600">
                                        ${Number(pago.monto).toLocaleString()}
                                    </td>

                                    <td className="px-3 md:px-6 py-2 md:py-3">
                                        {pago.metodo_pago}
                                    </td>

                                    <td className="px-3 md:px-6 py-2 md:py-3 text-slate-700 font-semibold">
                                        {pago.referencia || "Sin Referencia"}
                                    </td>

                                    <td className="px-3 md:px-6 py-2 md:py-3">
                                        <button
                                            className="px-3 py-1 text-xs md:text-sm bg-yellow-400 rounded hover:bg-yellow-500 transition font-semibold cursor-pointer"
                                            onClick={() => {
                                                setShowPago(true);
                                                setPago(pago);
                                            }}
                                        >
                                            Ver Más
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Paginación */}
                <div
                    className="flex flex-wrap justify-center items-center gap-2 py-4 md:py-6 border-t bg-gray-50"
                    id="driver_pagos-paginación"
                >
                    {getPaginationRange().map((item, index) => {
                        if (item === "...") {
                            return (
                                <span
                                    key={index}
                                    className="px-2 text-gray-500 text-sm"
                                >
                                    ...
                                </span>
                            );
                        }

                        return (
                            <button
                                key={item}
                                onClick={() => setCurrentPage(item)}
                                className={`px-3 py-1 text-xs md:text-sm rounded cursor-pointer ${
                                    currentPage === item
                                        ? "bg-black text-white"
                                        : "bg-white border hover:bg-gray-100"
                                }`}
                            >
                                {item}
                            </button>
                        );
                    })}
                </div>
            </div>

            <Modal
                size="full"
                title={"Registrar Nuevo Pago"}
                icon={<CirclePlus />}
                onClose={() => setCrearPago(false)}
                isOpen={crearPago}
            >
                <CrearPago onClose={() => setCrearPago(false)} />
            </Modal>

            <Modal
                size="full"
                title={"Información del Pago"}
                icon={<Eye />}
                onClose={() => setShowPago(false)}
                isOpen={showPago}
            >
                <ShowPago pago={pago} onClose={() => setShowPago(false)} />
            </Modal>
        </>
    );
}

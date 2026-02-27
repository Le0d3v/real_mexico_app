import React, { useState, useMemo, useEffect } from "react";
import {
    DollarSign,
    Search,
    PlusCircle,
    ReceiptText,
    Users,
} from "lucide-react";
import usePago from "../../../hooks/usePago";
import Loader from "../../components/Loader";

export default function Pagos() {
    const { pagos, isLoading, error } = usePago();

    const [search, setSearch] = useState("");
    const [metodoFiltro, setMetodoFiltro] = useState("");
    const [fechaFiltro, setFechaFiltro] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

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

    if (isLoading) return <Loader />;
    if (error) return <p>Error al cargar pagos</p>;

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

                <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-xl shadow hover:shadow-md transition hover:opacity-90 hover:-translate-y-1">
                    <PlusCircle size={18} />
                    Registrar Nuevo Pago
                </button>
            </div>
            {/* Indicadores */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <p className="text-sm text-slate-500">
                        Total Recaudado (Vista Actual)
                    </p>
                    <h2 className="text-2xl font-bold text-emerald-600 mt-2">
                        ${totalRecaudado.toLocaleString()}
                    </h2>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <p className="text-sm text-slate-500">Total de Registros</p>
                    <h2 className="text-2xl font-bold text-slate-800 mt-2">
                        {filteredPagos.length}
                    </h2>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <p className="text-sm text-slate-500">Promedio por Pago</p>
                    <h2 className="text-2xl font-bold text-slate-800 mt-2">
                        ${promedio.toLocaleString()}
                    </h2>
                </div>
            </div>
            {/* Filtros */}{" "}
            <div className="bg-white p-6 rounded-2xl shadow-sm mb-6">
                {" "}
                <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
                    {" "}
                    <div className="flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-xl w-full md:w-2/3">
                        {" "}
                        <Search size={18} className="text-slate-500" />{" "}
                        <input
                            type="text"
                            placeholder="Buscar por estudiante o referencia..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-transparent outline-none w-full text-sm-full p-1 tex-lg"
                        />{" "}
                    </div>{" "}
                    <div className="flex gap-4">
                        {" "}
                        <select
                            value={metodoFiltro}
                            onChange={(e) => setMetodoFiltro(e.target.value)}
                            className="bg-slate-200 px-4 py-2 rounded-xl text-sm"
                        >
                            {" "}
                            <option value="">Todos los métodos</option>{" "}
                            <option value="efectivo">Efectivo</option>{" "}
                            <option value="transferencia">Transferencia</option>{" "}
                            <option value="tarjeta">Tarjeta</option>{" "}
                        </select>{" "}
                        <input
                            type="date"
                            value={fechaFiltro}
                            onChange={(e) => setFechaFiltro(e.target.value)}
                            className="bg-slate-200 px-4 py-2 rounded-xl text-sm"
                        />{" "}
                    </div>{" "}
                </div>{" "}
            </div>
            {/* Tabla */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-black text-white font-semibold text-lg">
                        <tr>
                            <th className="px-6 py-4 text-center">Sujeto</th>
                            <th className="px-6 py-4 text-center">Fecha</th>
                            <th className="px-6 py-4 text-center">Monto</th>
                            <th className="px-6 py-4 text-center">Método</th>
                            <th className="px-6 py-4 text-center">
                                Referencia
                            </th>
                            <th className="px-6 py-4 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedPagos.map((pago) => (
                            <tr
                                key={pago.id}
                                className="border-t hover:bg-gray-100 text-center"
                            >
                                <td className="px-6 py-3">
                                    {pago.tutor?.name}{" "}
                                    {pago.tutor?.apellido_paterno}
                                </td>
                                <td className="px-6 py-3">{pago.fecha_pago}</td>
                                <td className="px-6 py-3 font-semibold text-emerald-600">
                                    ${Number(pago.monto).toLocaleString()}
                                </td>
                                <td className="px-6 py-3">
                                    {pago.metodo_pago}
                                </td>
                                <td className="px-6 py-3 text-slate-500">
                                    {pago.referencia}
                                </td>
                                <td className="px-6 py-3">
                                    <button className="px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-600 transition">
                                        Ver Más
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Paginación */}
                <div className="flex justify-center items-center gap-2 py-6 border-t bg-gray-50">
                    {getPaginationRange().map((item, index) => {
                        if (item === "...") {
                            return (
                                <span
                                    key={index}
                                    className="px-3 py-1 text-gray-500"
                                >
                                    ...
                                </span>
                            );
                        }

                        return (
                            <button
                                key={item}
                                onClick={() => setCurrentPage(item)}
                                className={`px-3 py-1 rounded cursor-pointer ${
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
        </div>
    );
}

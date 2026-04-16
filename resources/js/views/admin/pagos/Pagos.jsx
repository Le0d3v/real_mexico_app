import { useState, useMemo } from "react";
import { Search, PlusCircle, Eye, CirclePlus } from "lucide-react";
import usePago from "../../../hooks/usePago";
import Loader from "../../components/Loader";
import Modal from "../components/Modal";
import ShowPago from "./ShowPago";
import CrearPago from "./CrearPago";
import { formatCurrency, formatDate } from "../../../helpers/helpers";
import ExportExcel from "../components/ExportExcel";
import usePagination from "../../../hooks/usePagination";
import Pagination from "../components/Pagination";

export default function Pagos() {
  const { pagos, isLoading, error } = usePago();

  const [search, setSearch] = useState("");
  const [metodoFiltro, setMetodoFiltro] = useState("");
  const [fechaFiltro, setFechaFiltro] = useState("");

  const [crearPago, setCrearPago] = useState(false);
  const [showPago, setShowPago] = useState(false);
  const [pago, setPago] = useState(null);

  /* =========================
     🔎 FILTRADO
  ========================= */
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

  /* =========================
     📄 PAGINACIÓN (HOOK)
  ========================= */
  const {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData: paginatedPagos,
  } = usePagination(filteredPagos, 10, [search, metodoFiltro, fechaFiltro]);

  /* =========================
     💰 MÉTRICAS
  ========================= */
  const totalRecaudado = filteredPagos.reduce(
    (acc, pago) => acc + Number(pago.monto),
    0,
  );

  const promedio =
    filteredPagos.length > 0 ? totalRecaudado / filteredPagos.length : 0;

  /* =========================
     📊 EXPORT
  ========================= */
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
        {/* HEADER */}
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
            id="driver_pagos-crear"
            className="w-full md:w-auto flex justify-center items-center gap-2 bg-slate-900 text-white px-4 md:px-5 py-2 md:py-3 rounded-xl shadow hover:shadow-md transition cursor-pointer"
            onClick={() => setCrearPago(true)}
          >
            <PlusCircle size={18} />
            Registrar Nuevo Pago
          </button>
        </div>

        {/* INDICADORES */}
        <div
          id="driver_pagos-indicadores"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8"
        >
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm">
            <p>Total Recaudado (Vista Actual)</p>
            <h2 className="text-xl md:text-2xl font-bold text-emerald-600 mt-2">
              ${totalRecaudado.toLocaleString()}
            </h2>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm">
            <p>Total de Registros</p>
            <h2 className="text-xl md:text-2xl font-bold mt-2">
              {filteredPagos.length}
            </h2>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm">
            <p>Promedio por Pago</p>
            <h2 className="text-xl md:text-2xl font-bold mt-2">
              ${promedio.toLocaleString()}
            </h2>
          </div>
        </div>

        {/* FILTROS */}
        <div
          id="driver_pagos-filtros"
          className="bg-white p-4 md:p-6 rounded-2xl shadow-sm mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div
              id="driver_pagos-buscador"
              className="flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-xl w-full"
            >
              <Search size={18} className="text-slate-500" />
              <input
                type="text"
                placeholder="Buscar por Tutor o Referencia..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none w-full text-sm"
              />
            </div>

            <select
              id="driver_pagos-metodos"
              value={metodoFiltro}
              onChange={(e) => setMetodoFiltro(e.target.value)}
              className="bg-slate-200 px-4 py-2 rounded-xl text-sm"
            >
              <option value="">Todos los métodos</option>
              <option value="Efectivo">Efectivo</option>
              <option value="Transferencia">Transferencia</option>
              <option value="Tarjeta">Tarjeta</option>
            </select>

            <input
              id="driver_pagos-fecha"
              type="date"
              value={fechaFiltro}
              onChange={(e) => setFechaFiltro(e.target.value)}
              className="bg-slate-200 px-4 py-2 rounded-xl text-sm"
            />
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
                  <img src="/img/xls.png" alt="Excel" className="w-8 md:w-16" />
                </div>
              </div>
            </ExportExcel>
          </div>
        </div>

        {/* TABLA */}
        <div
          id="driver_pagos-tabla"
          className="bg-white rounded-2xl shadow-sm overflow-x-auto"
        >
          <table className="min-w-[700px] w-full text-sm">
            <thead className="bg-black text-white">
              <tr>
                <th className="py-3 text-center">Sujeto</th>
                <th className="text-center">Fecha</th>
                <th className="text-center">Monto</th>
                <th className="text-center">Método</th>
                <th className="text-center">Referencia</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>

            <tbody id="driver_pagos-registros">
              {paginatedPagos.map((pago) => (
                <tr key={pago.id} className="border-t text-center">
                  <td className="px-4 py-3">
                    {pago.tutor?.name} {pago.tutor?.apellido_paterno}
                  </td>
                  <td className="px-4 py-3">{formatDate(pago.fecha_pago)}</td>
                  <td className="px-4 py-3 text-emerald-600 font-semibold">
                    ${Number(pago.monto).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">{pago.metodo_pago}</td>
                  <td className="px-4 py-3">
                    {pago.referencia || "Sin referencia"}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      className="bg-yellow-400 px-3 py-1 rounded cursor-pointer show-pago"
                      onClick={() => {
                        setPago(pago);
                        setShowPago(true);
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

        {/* PAGINACIÓN */}
        <div id="driver_pagos-paginacion">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            idPrefix="driver_paginacion"
          />
        </div>
      </div>

      {/* MODALES */}
      <Modal
        size="full"
        title="Registrar Nuevo Pago"
        icon={<CirclePlus />}
        onClose={() => setCrearPago(false)}
        isOpen={crearPago}
      >
        <CrearPago onClose={() => setCrearPago(false)} />
      </Modal>

      <Modal
        size="full"
        title="Información del Pago"
        icon={<Eye />}
        onClose={() => setShowPago(false)}
        isOpen={showPago}
      >
        <ShowPago pago={pago} onClose={() => setShowPago(false)} />
      </Modal>
    </>
  );
}

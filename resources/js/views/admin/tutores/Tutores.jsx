import { useState, useMemo } from "react";
import useTutor from "../../../hooks/useTutor";
import Loader from "../../components/Loader";
import Modal from "../components/Modal";
import { CirclePlus, Eye, Search } from "lucide-react";
import ShowTutor from "./ShowTutor";
import CrearTutor from "./CrearTutor";
import ExportExcel from "../components/ExportExcel";
import { formatDate } from "../../../helpers/helpers";

// 🔥 NUEVO
import usePagination from "../../../hooks/usePagination";
import Pagination from "../components/Pagination";

export default function Tutores() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [createTutorModal, setCreateTutorModal] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");

  const { tutores = [], isLoading, error } = useTutor();

  /* =========================
     🔎 FILTRADO + ORDEN
  ========================= */
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

      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

    return data;
  }, [search, tutores, sortOrder]);

  /* =========================
     📄 PAGINACIÓN (HOOK)
  ========================= */
  const {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData: paginatedTutores,
  } = usePagination(filteredTutores, 10, [search, sortOrder]);

  /* =========================
     📊 EXPORT
  ========================= */
  const columnasExcel = [
    { label: "Tutor", key: "tutor" },
    { label: "Fecha de Nacimiento", key: "fecha_nacimiento" },
    { label: "CURP", key: "curp" },
    { label: "Genero", key: "genero" },
    { label: "Ocupacion", key: "ocupacion" },
    { label: "Nivel de Estudios", key: "nivel_estudios" },
    { label: "Número de Teléfono", key: "telefono" },
    { label: "Correo Electrónico", key: "email" },
    { label: "Alumnos", key: "alumnos" },
  ];

  const datosExcel = filteredTutores.map((registro) => ({
    tutor:
      registro.name +
      " " +
      registro.apellido_paterno +
      " " +
      registro.apellido_materno,
    fecha_nacimiento: formatDate(registro.fecha_nacimiento),
    curp: registro.curp,
    genero: registro.genero,
    ocupacion: registro.tutor.ocupacion,
    nivel_estudios: registro.tutor.nivel_estudios,
    telefono: registro.telefono,
    email: registro.email,
    alumnos: registro.tutor.estudiantes.length,
  }));

  if (isLoading) return <Loader />;
  if (error) return <p>Error al cargar tutores</p>;

  console.log(tutores);

  return (
    <>
      <div className="min-h-screen">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Administración de Tutores
            </h1>
            <p
              className="text-gray-500 text-sm md:text-base"
              id="driver_tutores-total"
            >
              Tutores totales:{" "}
              <span className="text-gray-700 font-bold">{tutores.length}</span>
            </p>
          </div>

          <button
            className="w-full md:w-auto bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 md:px-6 py-2 rounded-lg shadow transition cursor-pointer hover:-translate-y-1"
            onClick={() => setCreateTutorModal(true)}
            id="driver_tutores-crear"
          >
            + Nuevo Tutor
          </button>
        </div>

        {/* Filtros */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-5 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-stretch md:items-center">
            <div className="relative w-full" id="driver_tutores-buscar">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Buscar Tutor por nombre, teléfono o correo electrónico..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full md:w-auto border border-gray-300 rounded-lg px-4 py-2 text-sm"
              id="driver_tutores-filtro"
            >
              <option value="desc">Más recientes</option>
              <option value="asc">Más antiguos</option>
            </select>

            <ExportExcel
              data={datosExcel}
              columns={columnasExcel}
              fileName="reporte_tutores"
              sheetName="Tutores"
            >
              <div className="flex justify-center md:block">
                <div
                  className="p-2 rounded border border-gray-300 cursor-pointer hover:bg-gray-100 transition"
                  title="Exportar a Excel"
                  id="driver_export-excel"
                >
                  <img src="/img/xls.png" alt="Excel" className="w-8" />
                </div>
              </div>
            </ExportExcel>
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
          <table
            className="min-w-[800px] w-full text-xs md:text-sm"
            id="driver_tutores-tabla"
          >
            <thead className="bg-black text-yellow-400">
              <tr>
                <th className="px-3 md:px-6 py-3">Nombre</th>
                <th className="px-3 md:px-6 py-3">Teléfono</th>
                <th className="px-3 md:px-6 py-3">Correo Electrónico</th>
                <th className="px-3 md:px-6 py-3 text-center">Alumnos</th>
                <th className="px-3 md:px-6 py-3 text-center">Acciones</th>
              </tr>
            </thead>

            <tbody id="driver_tutores-registros">
              {paginatedTutores.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No se encontraron registros
                  </td>
                </tr>
              ) : (
                paginatedTutores.map((tutor) => (
                  <tr
                    key={tutor.id}
                    className="border-t border-gray-200 hover:bg-gray-200 transition text-center"
                  >
                    <td className="px-3 md:px-6 py-3 md:py-4 font-medium text-gray-800">
                      {tutor.name} {tutor.apellido_paterno}
                    </td>

                    <td className="px-3 md:px-6 py-3 md:py-4 text-gray-600">
                      {tutor.telefono}
                    </td>

                    <td className="px-3 md:px-6 py-3 md:py-4 text-gray-600">
                      {tutor.email}
                    </td>

                    <td className="px-3 md:px-6 py-3 md:py-4 text-center font-semibold">
                      {tutor?.tutor?.estudiantes?.length || 0}
                    </td>

                    <td className="px-3 md:px-6 py-3 md:py-4 text-center">
                      <button
                        className="px-3 py-1 text-xs md:text-sm rounded-md bg-yellow-400 hover:bg-yellow-500 transition text-black font-semibold cursor-pointer show-tutor"
                        onClick={() => {
                          setSelectedTutor(tutor);
                          setOpen(true);
                        }}
                      >
                        Ver Más
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 🔥 NUEVA PAGINACIÓN */}
        <div id="driver_tutores-paginacion">
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
        isOpen={open}
        icon={<Eye className="w-12 h-12" />}
        onClose={() => {
          setOpen(false);
          setSelectedTutor(null);
        }}
        size="full"
        title="Ver Información del Tutor"
      >
        {selectedTutor && <ShowTutor tutor={selectedTutor} onClose={setOpen} />}
      </Modal>

      <Modal
        isOpen={createTutorModal}
        icon={<CirclePlus className="w-12 h-12" />}
        onClose={() => setCreateTutorModal(false)}
        size="full"
        title="Registrar un Nuevo Tutor"
      >
        <CrearTutor onClose={setCreateTutorModal} />
      </Modal>
    </>
  );
}

import { CirclePlus, Eye, Search, User } from "lucide-react";
import useStudent from "../../../hooks/useStudent";
import Loader from "../../components/Loader";
import { useState, useMemo, useEffect } from "react";
import Modal from "../components/Modal";
import ShowStudent from "./ShowStudent";
import CreateStudent from "./CreateStudent";
import ExportExcel from "../components/ExportExcel";
import { formatDate } from "../../../helpers/helpers";

export default function Students() {
  const { estudiantes, isLoading, error } = useStudent();

  const [search, setSearch] = useState("");
  const [gradoFilter, setGradoFilter] = useState("Todos");
  const [estadoFilter, setEstadoFilter] = useState("Todos");
  const [currentPage, setCurrentPage] = useState(1);

  const [showStudent, setShowStudent] = useState(false);
  const [editStudent, setEditStudent] = useState(false);
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
        gradoFilter === "Todos" || alumno.grado?.toString() === gradoFilter;

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

  const columnasExcel = [
    { label: "Alumno", key: "alumno" },
    { label: "Fecha de Nacimiento", key: "fecha_nacimiento" },
    { label: "CURP", key: "curp" },
    { label: "Genero", key: "genero" },
    { label: "Tipo de Sangre", key: "tipo_sangre" },
    { label: "Entidad de Nacimiento", key: "entidad_nacimiento" },
    { label: "Matricula", key: "matricula" },
    { label: "Grado", key: "grado" },
    { label: "Grupo", key: "grupo" },
    { label: "Estado", key: "estado" },
    { label: "Tutor", key: "tutor" },
  ];

  const datosExcel = filteredStudents.map((registro) => {
    const tutor = registro.tutores?.[0]?.usuario;

    return {
      alumno:
        `${registro.nombre ?? ""} ${registro.apellido_paterno ?? ""} ${registro.apellido_materno ?? ""}`.trim(),

      fecha_nacimiento: formatDate(registro.fecha_nacimiento),
      curp: registro.curp,
      genero: registro.genero,
      tipo_sangre: registro.tipo_sangre,
      entidad_nacimiento: registro.entidad_nacimiento,
      matricula: registro.matricula,
      grado: registro.grado,
      grupo: registro.grupo,
      estado: registro.estado,

      tutor: tutor
        ? [tutor.name, tutor.apellido_paterno, tutor.apellido_materno]
            .filter(Boolean)
            .join(" ")
        : "Sin tutor registrado",
    };
  });

  if (isLoading) return <Loader />;
  if (error) return <p>Error al cargar tutores</p>;

  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              Administración de Estudiantes
            </h2>
            <p
              className="text-gray-500 text-sm md:text-base"
              id="driver_estudiantes-total"
            >
              Estudiantes Totales:{" "}
              <span className="font-bold text-gray-700">
                {estudiantes.length}
              </span>
            </p>
          </div>

          <button
            className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white font-semibold px-4 md:px-6 py-2 rounded-lg shadow transition cursor-pointer hover:-translate-y-1"
            onClick={() => setCreateStudent(true)}
            id="driver_estudiantes-crear"
          >
            + Nuevo Estudiante
          </button>
        </div>

        {/* Filtros */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-5 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-3 md:gap-4">
            <div className="relative w-full" id="driver_estudiantes-buscador">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Buscar Estudiante por Nombre o Matrícula..."
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              value={gradoFilter}
              onChange={(e) => setGradoFilter(e.target.value)}
              className="w-full md:w-auto border border-gray-300 rounded-lg px-4 py-2 text-sm"
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
              className="w-full md:w-auto border border-gray-300 rounded-lg px-4 py-2 text-sm"
              id="driver_estudiantes-estado"
            >
              <option value="Todos">Todos</option>
              <option value="Activo">Activo</option>
              <option value="Baja">Baja</option>
              <option value="Egresado">Egresado</option>
            </select>

            <ExportExcel
              data={datosExcel}
              columns={columnasExcel}
              fileName="reporte_alumnos"
              sheetName="Alumnos"
            >
              <div className="flex justify-center md:block">
                <div
                  className="p-2 rounded border border-gray-300 cursor-pointer hover:bg-gray-100 transition"
                  title="Exportar a Excel"
                  id="driver_export-excel"
                >
                  <img src="/img/xls.png" alt="Excel" className="w-8 md:w-10" />
                </div>
              </div>
            </ExportExcel>
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
          <table
            className="min-w-[900px] w-full text-xs md:text-sm"
            id="driver_estudiantes-tabla"
          >
            <thead className="bg-black text-yellow-400">
              <tr>
                <th className="px-3 md:px-6 py-3">Alumno</th>
                <th className="px-3 md:px-6 py-3">Matrícula</th>
                <th className="px-3 md:px-6 py-3">Grado / Grupo</th>
                <th className="px-3 md:px-6 py-3">Tutor principal</th>
                <th className="px-3 md:px-6 py-3 text-center">Estado</th>
                <th className="px-3 md:px-6 py-3 text-center">Acciones</th>
              </tr>
            </thead>

            <tbody id="driver_estudiantes-registros">
              {paginatedStudents.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No se encontraron registros
                  </td>
                </tr>
              ) : (
                paginatedStudents.map((alumno) => (
                  <tr
                    key={alumno.id}
                    className="border-t border-gray-300 hover:bg-gray-200 transition"
                  >
                    <td className="px-3 md:px-6 py-3 md:py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold">
                          <User size={16} />
                        </div>
                        <span className="font-medium text-gray-800">
                          {alumno.nombre + " " + alumno.apellido_paterno}
                        </span>
                      </div>
                    </td>

                    <td className="px-3 md:px-6 py-3 md:py-4 text-gray-600 font-mono text-center  ">
                      <span className="font-semibold text-gray-700">
                        {alumno.matricula}
                      </span>
                    </td>

                    <td className="py-3 md:py-4 flex justify-center">
                      <span className="px-3 py-1 bg-gray-200 rounded-full text-xs md:text-sm font-semibold">
                        {alumno.grado} - {alumno.grupo}
                      </span>
                    </td>

                    <td className="px-3 md:px-6 py-3 md:py-4 text-gray-600 text-center">
                      {alumno.tutores?.length > 0 &&
                      alumno.tutores[0]?.usuario ? (
                        <span className="font-medium text-gray-800">
                          {`${alumno.tutores[0].usuario.name ?? ""} ${alumno.tutores[0].usuario.apellido_paterno ?? ""}`.trim() ||
                            "—"}
                        </span>
                      ) : (
                        <p className="text-red-500 font-semibold">
                          Sin tutor registrado
                        </p>
                      )}
                    </td>

                    <td className="px-3 md:px-6 py-3 md:py-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs md:text-sm font-semibold ${
                          alumno.estado === "Activo"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {alumno.estado}
                      </span>
                    </td>

                    <td className="px-3 md:px-6 py-3 md:py-4 text-center">
                      <div className="flex flex-col md:flex-row justify-center gap-2">
                        <button
                          className="px-3 py-1 text-xs md:text-sm font-semibold rounded-md bg-yellow-400 hover:bg-yellow-500 transition text-black cursor-pointer perfil"
                          onClick={() => {
                            setSelectedStudent(alumno);
                            setShowStudent(true);
                          }}
                        >
                          Perfil
                        </button>
                        <button
                          className="px-3 py-1 text-xs md:text-sm rounded-md bg-red-600 text-white hover:bg-red-700 transition cursor-pointer editar"
                          onClick={() => {
                            setSelectedStudent(alumno);
                            setEditStudent(true);
                          }}
                        >
                          Editar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Paginación */}
        <div
          className="flex flex-col md:flex-row justify-between items-center gap-4 px-4 md:px-6 py-4 border-t bg-gray-50 text-center md:text-left"
          id="driver_estudiantes-paginacion"
        >
          <p className="text-xs md:text-sm text-gray-600">
            Página <strong>{currentPage}</strong> de{" "}
            <strong>{totalPages}</strong>
          </p>

          <div className="flex items-center gap-2 flex-wrap justify-center">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-3 py-2 rounded-lg text-xs md:text-sm bg-white border hover:bg-gray-100 disabled:opacity-40 cursor-pointer"
            >
              ←
            </button>

            {Array.from({ length: totalPages }, (_, i) => {
              const pageNumber = i + 1;
              const isActive = currentPage === pageNumber;

              return (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm cursor-pointer ${
                    isActive
                      ? "bg-yellow-400 text-black"
                      : "bg-white border hover:bg-gray-100"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-3 py-2 rounded-lg text-xs md:text-sm bg-white border hover:bg-gray-100 disabled:opacity-40 cursor-pointer"
            >
              →
            </button>
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
      <Modal
        isOpen={editStudent}
        title={"Editar Estudiante"}
        icon={<CirclePlus />}
        size="full"
        onClose={() => setEditStudent(false)}
      >
        {selectedStudent && (
          <CreateStudent
            onClose={() => setEditStudent(false)}
            initialData={selectedStudent}
            isEdit={true}
          />
        )}
      </Modal>
    </>
  );
}

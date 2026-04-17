import {
  Calendar,
  CreditCard,
  DollarSign,
  Eye,
  Hash,
  Info,
  NotepadText,
  User,
  Search,
} from "lucide-react";

import useStudent from "../../../hooks/useStudent";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useState, useMemo } from "react";
import EstudiantePago from "./EstudiantePago";
import EstudianteSeleccionado from "./EstudianteSeleccionado";
import usePago from "../../../hooks/usePago";
import Swal from "sweetalert2";

export default function CrearPago({ onClose }) {
  const { estudiantes } = useStudent();
  const { createPago } = usePago();

  const [metodoPago, setMetodoPago] = useState("");
  const [cargando, setCargando] = useState(false);

  const [formData, setFormData] = useState({
    colegiatura_id: null,
    estudiante_id: null,
    tutor_id: null,
    asunto: "Pago de Colegiatura",
    fecha_pago: "",
    monto: "",
    metodo_pago: "",
    referencia: "",
    observaciones: "",
  });

  const handleMetodoPagoChange = (e) => {
    const value = e.target.value;

    setMetodoPago(value);

    setFormData((prev) => ({
      ...prev,
      metodo_pago: value,
    }));
  };

  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const filteredStudents = useMemo(() => {
    if (!search.trim()) return [];

    const term = search.toLowerCase();

    return estudiantes.filter((estudiante) => {
      const nombreCompleto = `${estudiante.nombre ?? ""} 
                 ${estudiante.apellido_paterno ?? ""} 
                 ${estudiante.apellido_materno ?? ""}`.toLowerCase();

      return (
        nombreCompleto.includes(term) ||
        estudiante.matricula?.toLowerCase().includes(term)
      );
    });
  }, [search, estudiantes]);

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    setSearch("");

    setFormData((prev) => ({
      ...prev,
      estudiante_id: student.id,
      tutor_id: null,
      colegiatura_id: null,
    }));
  };

  // 🔥 NUEVA LÓGICA CENTRALIZADA
  const colegiaturasDisponibles = useMemo(() => {
    if (!selectedStudent?.colegiaturas) return [];

    const options = [];

    const pendientes = selectedStudent.colegiaturas.filter(
      (c) => c.estado?.toLowerCase() !== "pagado",
    );

    const diciembre = pendientes.find((c) =>
      c.mes?.toLowerCase().includes("diciembre"),
    );

    const julio = pendientes.find((c) =>
      c.mes?.toLowerCase().includes("julio"),
    );

    // 🔥 Combo
    if (diciembre && julio) {
      const pendienteDiciembre = diciembre.monto - diciembre.pagado;
      const pendienteJulio = julio.monto - julio.pagado;

      options.push({
        value: `combo-${diciembre.id}-${julio.id}`,
        label: `Diciembre y Julio — $${(
          pendienteDiciembre + pendienteJulio
        ).toFixed(2)}`,
      });
    }

    // 🔥 Orden UX (pendientes arriba)
    const ordenadas = [...selectedStudent.colegiaturas].sort((a, b) => {
      const pagadaA = a.estado?.toLowerCase() === "pagado";
      const pagadaB = b.estado?.toLowerCase() === "pagado";
      return pagadaA - pagadaB;
    });

    ordenadas.forEach((c) => {
      const pendiente = c.monto - c.pagado;
      const pagada = c.estado?.toLowerCase() === "pagado";

      // evitar duplicar combo
      if (
        !pagada &&
        ((diciembre && c.id === diciembre.id) || (julio && c.id === julio.id))
      )
        return;

      options.push({
        value: String(c.id),
        label: pagada
          ? `${c.mes} — PAGADO`
          : `${c.mes} — Pendiente: $${pendiente.toFixed(2)}`,
        disabled: pagada,
      });
    });

    return options;
  }, [selectedStudent]);

  const tutoresDisponibles = selectedStudent?.tutores || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);

    try {
      const payload = {
        ...formData,
        monto: Number(formData.monto),
        colegiatura_id: formData.colegiatura_id?.startsWith("combo")
          ? formData.colegiatura_id.split("-").slice(1).map(Number)
          : [Number(formData.colegiatura_id)], // ⚠️ SIEMPRE ARRAY
        tutor_id: Number(formData.tutor_id),
      };

      const response = await createPago(payload);
      Swal.fire({
        icon: "success",
        title: "Pago Registrado Exitosamente",
        text: "El pago ha sido almacenado en la Base de Datos",
      });
      onClose(false);
    } catch (error) {
      if (error?.status === 422) {
        Object.values(error.data.errors).forEach((messages) =>
          messages.forEach((message) => toast.error(message)),
        );
      } else {
        toast.error("Error inesperado al registrar el pago.");
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Info />
        <p>
          Para registrar un pago por colegiatura, primero selecciona al
          estudiante, luego elige la colegiatura correspondiente y completa la
          información del pago.
        </p>
      </div>

      <form
        className="space-y-8 mt-5"
        autoComplete="off"
        onSubmit={handleSubmit}
        noValidate
      >
        {/* ================= ESTUDIANTE ================= */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
          <div>
            <div className="flex items-center gap-3 border-b border-gray-300 pb-4">
              <div className="p-2 rounded-full bg-red-200">
                <User className="text-red-600" />
              </div>
              <h2 className="text-2xl font-semibold">Estudiante</h2>
            </div>
          </div>
          <InputField
            icon={<Search />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            label={"Buscar Estudiante"}
            placeholder={"Busque por nombre o matriucla"}
          />

          {search && (
            <div className="grid md:grid-cols-2 gap-4">
              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  onClick={() => handleSelectStudent(student)}
                >
                  <EstudiantePago estudiante={student} />
                </div>
              ))}
            </div>
          )}

          {selectedStudent && (
            <EstudianteSeleccionado
              estudiante={selectedStudent}
              formData={formData}
              colegiaturasDisponibles={colegiaturasDisponibles}
              tutoresDisponibles={tutoresDisponibles}
              onClear={() => setSelectedStudent(null)}
              onSelectColegiatura={(value) => {
                const optionData = (() => {
                  const colegiaturas = selectedStudent.colegiaturas;

                  const pendientes = colegiaturas.filter(
                    (c) => c.estado?.toLowerCase() !== "pagado",
                  );

                  const diciembre = pendientes.find((c) =>
                    c.mes?.toLowerCase().includes("diciembre"),
                  );

                  const julio = pendientes.find((c) =>
                    c.mes?.toLowerCase().includes("julio"),
                  );

                  // 🔥 Combo
                  if (value.startsWith("combo") && diciembre && julio) {
                    return {
                      ids: [diciembre.id, julio.id],
                      monto:
                        diciembre.monto -
                        diciembre.pagado +
                        (julio.monto - julio.pagado),
                    };
                  }

                  // 🔥 Normal
                  const normal = colegiaturas.find(
                    (c) => c.id === Number(value),
                  );

                  if (!normal) return null;
                  if (normal.estado?.toLowerCase() === "pagado") return null;

                  return {
                    ids: [normal.id],
                    monto: normal.monto - normal.pagado,
                  };
                })();

                if (!optionData) return;

                setFormData((prev) => ({
                  ...prev,
                  colegiatura_id: value, // 🔥 string controlado
                  monto: optionData.monto.toFixed(2),
                }));
              }}
              onSelectTutor={(e) =>
                setFormData((p) => ({
                  ...p,
                  tutor_id: Number(e.target.value),
                }))
              }
            />
          )}
        </section>
        {/* ================= INFORMACIÓN DEL PAGO ================= */}
        {selectedStudent && (
          <>
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
              <div className="flex items-center gap-3 border-b border-gray-300 pb-4">
                <div className="p-2 rounded-full bg-red-200">
                  <DollarSign className="text-red-600" />
                </div>
                <h2 className="text-2xl font-semibold">Información del Pago</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <SelectField
                  icon={<NotepadText size={18} />}
                  label="Asunto"
                  options={["Pago por Colegiatura"]}
                  value={formData.asunto}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      asunto: e.target.value,
                    }))
                  }
                />

                <InputField
                  icon={<DollarSign size={18} />}
                  label="Monto"
                  type="number"
                  value={formData.monto}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      monto: e.target.value,
                    }))
                  }
                />

                <InputField
                  icon={<Calendar size={18} />}
                  label="Fecha"
                  type="date"
                  value={formData.fecha_pago}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      fecha_pago: e.target.value,
                    }))
                  }
                />

                <SelectField
                  icon={<CreditCard size={18} />}
                  label="Método de Pago"
                  options={["Efectivo", "Transferencia", "Tarjeta", "Deposito"]}
                  value={metodoPago}
                  onChange={handleMetodoPagoChange}
                />

                {(metodoPago === "Deposito" || metodoPago === "Tarjeta") && (
                  <InputField
                    icon={<Hash size={18} />}
                    label="Referencia"
                    value={formData.referencia}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        referencia: e.target.value,
                      }))
                    }
                  />
                )}

                <InputField
                  icon={<Eye size={18} />}
                  label="Observaciones"
                  value={formData.observaciones}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      observaciones: e.target.value,
                    }))
                  }
                />
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:flex md:justify-between md:items-center block">
              <h1 className="text-2xl font-semibold text-red-400 text-center md:text-start">
                Acciones
              </h1>

              <div className="flex flex-col-reverse md:flex-row gap-3 md:gap-5 justify-center py-3 md:py-0 w-full md:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition cursor-pointer w-full md:w-auto disabled:opacity-60"
                  disabled={cargando}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={cargando}
                  className="px-6 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition shadow-sm w-full md:w-44 disabled:opacity-60 hover:cursor-pointer"
                >
                  {cargando ? (
                    <ClipLoader size={20} color="white" />
                  ) : (
                    "Registrar Pago"
                  )}
                </button>
              </div>
            </section>
          </>
        )}
      </form>
    </>
  );
}

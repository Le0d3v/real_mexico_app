import { useState, useMemo } from "react";
import {
  DollarSign,
  Calendar,
  CreditCard,
  Hash,
  Eye,
  Info,
  UserCheck,
} from "lucide-react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import usePago from "../../../hooks/usePago";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import StudentCard from "./StudentCard";
import useColegiatura from "../../../hooks/useColegiatura";
import Swal from "sweetalert2";

export default function RegistrarPago({ student, colegiaturas, onClose }) {
  const { createPago } = usePago();
  const { mutate } = useColegiatura();

  const [cargando, setCargando] = useState(false);
  const [metodoPago, setMetodoPago] = useState("");

  const colegiaturasPendientes = useMemo(() => {
    return colegiaturas.filter((c) => c.estado?.toLowerCase() !== "pagado");
  }, [colegiaturas]);

  const [formData, setFormData] = useState({
    estudiante_id: student?.estudiante?.id ?? null,
    colegiatura_id: null,
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
      referencia:
        value === "Deposito" || value === "Tarjeta" ? prev.referencia : "",
    }));
  };

  const handleSelectColegiatura = (e) => {
    const colegiaturaId = Number(e.target.value);

    const seleccionada = colegiaturasPendientes.find(
      (c) => c.id === colegiaturaId,
    );

    if (!seleccionada) return;

    const pendiente = seleccionada.monto - seleccionada.pagado;

    setFormData((prev) => ({
      ...prev,
      colegiatura_id: colegiaturaId,
      monto: pendiente.toFixed(2),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    setCargando(true);

    try {
      const response = await createPago({
        ...formData,
        monto: Number(formData.monto),
        colegiatura_id: Number(formData.colegiatura_id),
        tutor_id: Number(formData.tutor_id),
      });

      await mutate();

      Swal.fire({
        icon: "success",
        title: "Pago Registrado Exitosamente",
        text: "El pago se ha guardado en la Base de Datos",
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

      console.error(error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <Info />
        <p>Registro de pago para el estudiante seleccionado</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
        autoComplete="off"
        noValidate
      >
        {/* ===============================
                    ESTUDIANTE (FIJO)
                =============================== */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-300 pb-4">
            <div className="p-2 rounded-full bg-red-200">
              <UserCheck className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Estudiante</h2>
          </div>
          <StudentCard student={student.estudiante} />
        </section>

        {/* ===============================
                    INFORMACIÓN DEL PAGO
                =============================== */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-300 pb-4">
            <div className="p-2 rounded-full bg-red-200">
              <DollarSign className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Información del Pago
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* COLEGIATURA */}
            <SelectField
              icon={<Calendar size={18} />}
              label="Colegiatura"
              options={[...colegiaturas]
                .sort((a, b) => {
                  const pagadaA = a.estado?.toLowerCase() === "pagado";
                  const pagadaB = b.estado?.toLowerCase() === "pagado";
                  return pagadaA - pagadaB;
                })
                .map((c) => {
                  const pendiente = c.monto - c.pagado;
                  const pagada = c.estado?.toLowerCase() === "pagado";

                  return {
                    value: c.id,
                    label: pagada
                      ? `${c.mes} — PAGADO`
                      : `${c.mes} — Pendiente: $${pendiente.toFixed(2)}`,
                    disabled: pagada,
                    className: pagada
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "",
                  };
                })}
              value={formData.colegiatura_id ?? ""}
              onChange={(e) => {
                const colegiaturaId = Number(e.target.value);

                const seleccionada = colegiaturas.find(
                  (c) => c.id === colegiaturaId,
                );

                if (!seleccionada) return;

                if (seleccionada.estado?.toLowerCase() === "pagado") return;

                const pendiente = seleccionada.monto - seleccionada.pagado;

                setFormData((prev) => ({
                  ...prev,
                  colegiatura_id: colegiaturaId,
                  monto: pendiente.toFixed(2),
                }));
              }}
            />
            <InputField
              icon={<DollarSign size={18} />}
              label="Monto"
              type="number"
              value={formData.monto}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  monto: e.target.value,
                }))
              }
            />

            <InputField
              icon={<Calendar size={18} />}
              label="Fecha de Registro"
              type="date"
              value={formData.fecha_pago}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
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
                  setFormData((prev) => ({
                    ...prev,
                    referencia: e.target.value,
                  }))
                }
              />
            )}

            <InputField
              icon={<Eye size={18} />}
              label="Observaciones (Opcional)"
              value={formData.observaciones}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  observaciones: e.target.value,
                }))
              }
            />

            <SelectField
              icon={<UserCheck size={18} />}
              label="Tutor Responsable"
              options={(student.estudiante.tutores || []).map((tutor) => ({
                value: tutor.usuario.id,
                label: `${tutor.usuario.name} ${
                  tutor.usuario.apellido_paterno ?? ""
                } ${tutor.usuario.apellido_materno ?? ""}`.trim(),
              }))}
              value={formData.tutor_id ?? ""}
              onChange={(e) => {
                const tutorId = Number(e.target.value);

                setFormData((prev) => ({
                  ...prev,
                  tutor_id: tutorId,
                }));
              }}
            />
          </div>
        </section>

        {/* ===============================
                    ACCIONES
                =============================== */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-red-400">Acciones</h1>

          <div className="flex gap-5">
            <button
              type="button"
              onClick={() => onClose()}
              className="px-6 py-2 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
              disabled={cargando}
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={cargando}
              className="px-6 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition shadow-sm w-44 disabled:opacity-60 hover:cursor-pointer"
            >
              {cargando ? (
                <ClipLoader size={20} color="white" />
              ) : (
                "Registrar Pago"
              )}
            </button>
          </div>
        </section>
      </form>
    </>
  );
}

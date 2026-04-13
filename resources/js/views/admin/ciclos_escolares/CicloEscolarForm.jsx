import InputField from "../components/InputField";
import { Calendar, DollarSign, Info } from "lucide-react";
import Swal from "sweetalert2";
import useCicloEscolar from "../../../hooks/useCicloEscolar";
import { useState } from "react";
import useIRM from "../../../hooks/useIRM";

export default function CicloEscolarForm({ onClose }) {
  const { cerrarCiclo } = useCicloEscolar();
  const { setAdminPage } = useIRM();

  // ✅ Estados correctamente controlados
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [monto, setMonto] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCerrarCiclo = async (e) => {
    e.preventDefault();

    /* ===============================
       VALIDACIÓN DE CAMPOS
    =============================== */

    if (!fechaInicio || !fechaFin || !monto) {
      await Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Debe completar todos los campos antes de continuar.",
        confirmButtonColor: "#DC2626",
      });
      return;
    }

    if (new Date(fechaInicio) >= new Date(fechaFin)) {
      await Swal.fire({
        icon: "warning",
        title: "Fechas inválidas",
        text: "La fecha de inicio debe ser menor a la fecha de fin.",
        confirmButtonColor: "#DC2626",
      });
      return;
    }

    if (Number(monto) <= 0) {
      await Swal.fire({
        icon: "warning",
        title: "Monto inválido",
        text: "El monto debe ser mayor a 0.",
        confirmButtonColor: "#DC2626",
      });
      return;
    }

    /* ===============================
       CONFIRMACIÓN ROBUSTA
    =============================== */

    const { isConfirmed } = await Swal.fire({
      icon: "warning",
      title: "¿Estás Seguro?",
      text: "Este proceso es irreversible. Escriba CONFIRMAR para continuar.",
      input: "text",
      inputPlaceholder: "CONFIRMAR",
      showCancelButton: true,
      confirmButtonText: "Ejecutar cierre de ciclo",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#DC2626",
      cancelButtonColor: "#6B7280",

      // ✅ Validación nativa sin DOM manual
      inputValidator: (value) => {
        if (value !== "CONFIRMAR") {
          return "Debe escribir CONFIRMAR exactamente";
        }
        return null;
      },
    });

    if (!isConfirmed) {
      onClose();
      return;
    }

    try {
      setLoading(true);

      const datos = {
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin,
        monto: Number(monto),
      };

      const { ok, message, data, error } = await cerrarCiclo(datos);

      if (!ok) throw new Error(error || message);

      await Swal.fire({
        icon: "success",
        title: "Cierre de ciclo completado",
        width: 640,
        confirmButtonText: "Entendido",
        confirmButtonColor: "#16A34A",
        html: `
          <div style="font-family:system-ui, -apple-system, sans-serif; text-align:left; font-size:14px; color:#111827;">

            <!-- ✅ HEADER -->
            <div style="
              background:linear-gradient(135deg,#ECFDF5,#D1FAE5);
              border:1px solid #86EFAC;
              padding:14px;
              border-radius:10px;
              margin-bottom:18px;
            ">
              <div style="font-weight:700; color:#065F46; font-size:15px;">
                ✔ Proceso ejecutado correctamente
              </div>
              <div style="margin-top:4px; color:#047857;">
                El sistema ha actualizado el ciclo escolar y reorganizado la información académica.
              </div>
            </div>

            <!-- 🔄 TRANSICIÓN -->
            <div style="margin-bottom:18px;">
              <div style="font-weight:600; margin-bottom:6px; color:#374151;">
                🔄 Transición de ciclo
              </div>
              <div style="
                background:#F9FAFB;
                border:1px solid #E5E7EB;
                padding:12px;
                border-radius:8px;
                text-align:center;
                font-size:15px;
                font-weight:600;
                letter-spacing:0.5px;
              ">
                ${data.ciclo_anterior} 
                <span style="color:#9CA3AF;">→</span> 
                ${data.ciclo_nuevo}
              </div>
            </div>

            <!-- 📊 MÉTRICAS -->
            <div style="margin-bottom:10px;">
              <div style="font-weight:600; margin-bottom:8px; color:#374151;">
                📊 Resultados del proceso
              </div>

              <div style="
                display:grid;
                grid-template-columns:1fr 1fr;
                gap:12px;
              ">

                <!-- CARD -->
                <div style="
                  background:#EFF6FF;
                  border:1px solid #BFDBFE;
                  border-radius:8px;
                  padding:12px;
                ">
                  <div style="font-size:12px; color:#1D4ED8; font-weight:600;">
                    👨‍🎓 EGRESADOS
                  </div>
                  <div style="font-size:20px; font-weight:700; margin-top:4px;">
                    ${data.alumnos_egresados}
                  </div>
                </div>

                <div style="
                  background:#F0FDF4;
                  border:1px solid #BBF7D0;
                  border-radius:8px;
                  padding:12px;
                ">
                  <div style="font-size:12px; color:#15803D; font-weight:600;">
                    📈 PROMOVIDOS
                  </div>
                  <div style="font-size:20px; font-weight:700; margin-top:4px;">
                    ${data.alumnos_promovidos}
                  </div>
                </div>

                <div style="
                  background:#FFFBEB;
                  border:1px solid #FDE68A;
                  border-radius:8px;
                  padding:12px;
                ">
                  <div style="font-size:12px; color:#B45309; font-weight:600;">
                    💰 COLEGIATURAS
                  </div>
                  <div style="font-size:20px; font-weight:700; margin-top:4px;">
                    ${data.colegiaturas_generadas}
                  </div>
                </div>

                <div style="
                  background:#F5F3FF;
                  border:1px solid #DDD6FE;
                  border-radius:8px;
                  padding:12px;
                ">
                  <div style="font-size:12px; color:#6D28D9; font-weight:600;">
                    💵 MONTO APLICADO
                  </div>
                  <div style="font-size:20px; font-weight:700; margin-top:4px;">
                    $${data.monto_aplicado}
                  </div>
                </div>

              </div>
            </div>

            <!-- FOOTER -->
            <div style="
              margin-top:16px;
              padding-top:10px;
              border-top:1px solid #E5E7EB;
              font-size:12px;
              color:#6B7280;
            ">
              Operación finalizada correctamente. El sistema se encuentra listo para trabajar con el nuevo ciclo escolar.
            </div>

          </div>
        `,
      });

      onClose();
      setAdminPage(0);
    } catch (err) {
      console.error("ERROR BACK:", err);

      await Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <Info size={36} className="text-gray-400" />
      </div>

      <h1 className="text-center text-gray-400 font-semibold">
        Complete el formulario con los datos del siguiente ciclo escolar
      </h1>

      <form className="mt-3 space-y-5" onSubmit={handleCerrarCiclo}>
        <InputField
          icon={<Calendar size={18} />}
          label="Fecha de inicio"
          type="date"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
        />

        <InputField
          icon={<Calendar size={18} />}
          label="Fecha de fin"
          type="date"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
        />

        <InputField
          icon={<DollarSign size={18} />}
          label="Monto mensual"
          type="number"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full p-3 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 transition disabled:opacity-50"
        >
          {loading ? "Procesando..." : "Cerrar Ciclo Escolar"}
        </button>
      </form>
    </>
  );
}

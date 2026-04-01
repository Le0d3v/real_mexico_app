import InputField from "../components/InputField";
import { Calendar, DollarSign, Info, User } from "lucide-react";
import Swal from "sweetalert2";
import useCicloEscolar from "../../../hooks/useCicloEscolar";
import { useState } from "react";
import useIRM from "../../../hooks/useIRM";

export default function CicloEscolarForm({ onClose }) {
  const { cerrarCiclo, cicloEscolar } = useCicloEscolar();
  const { setAdminPage } = useIRM();

  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [monto, setMonto] = useState(null);

  const handleCerrarCiclo = async (e) => {
    e.preventDefault();
    const result = await Swal.fire({
      icon: "warning",
      title: "¿Estás Seguro?",
      width: 600,
      html: `
    <div style="text-align:left; font-size:14px;">

      <!-- 🔴 ALERTA -->
      <div style="
        background:#FEF2F2;
        border:1px solid #FCA5A5;
        padding:12px;
        border-radius:8px;
        margin-bottom:15px;
      ">
        <b style="color:#B91C1C;">⚠️ Esta acción no se puede rebertir</b>
        <ul style="margin-top:8px; padding-left:18px;">
          <li>- Se cerrará el ciclo escolar actual</li>
          <li>- Se creará un nuevo ciclo automáticamente</li>
          <li>- Los alumnos serán promovidos al siguiente grado</li>
          <li>- Los alumnos de último grado serán egresados</li>
          <li>- Se generarán nuevas colegiaturas</li>
        </ul>
      </div>

      <!-- 🔐 CONFIRMACIÓN -->
      <div style="
        margin-top:16px;
        padding-top:12px;
        border-top:1px solid #E5E7EB;
      ">
        <label style="display:block; font-weight:600; margin-bottom:4px;">
          Confirmación de seguridad
        </label>
        <input type="text" id="confirm" class="swal2-input"
          placeholder="Escriba CONFIRMAR"
          style="width:100%; margin:0;">
        <small style="color:#9CA3AF;">
          Esta acción no se puede revertir.
        </small>
      </div>

    </div>
  `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Ejecutar cierre de ciclo",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#DC2626",
      cancelButtonColor: "#6B7280",

      preConfirm: () => {
        const confirm = document.getElementById("confirm").value;

        if (confirm !== "CONFIRMAR") {
          Swal.showValidationMessage("Debe escribir CONFIRMAR exactamente");
          return false;
        }
      },
    });

    if (!result.isConfirmed) {
      onClose();
      return;
    }

    try {
      const datos = {
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin,
        monto: monto,
      };

      const { ok, message, data, error } = await cerrarCiclo(datos);

      if (!ok) throw new Error(error || message);

      await Swal.fire({
        icon: "success",
        title: "Cierre de ciclo completado",
        width: 600,
        confirmButtonText: "Entendido",
        confirmButtonColor: "#16A34A",
        html: `
          <div style="text-align:left; font-size:14px;">

            <!-- 🟢 HEADER RESUMEN -->
            <div style="
              background:#ECFDF5;
              border:1px solid #86EFAC;
              padding:12px;
              border-radius:8px;
              margin-bottom:15px;
            ">
              <b style="color:#166534;">✔ Proceso ejecutado correctamente</b>
              <p style="margin:5px 0 0 0;">
                El sistema ha actualizado el ciclo escolar y reorganizado la información académica.
              </p>
            </div>

            <!-- 🔁 TRANSICIÓN DE CICLO -->
            <div style="margin-bottom:15px;">
              <label style="font-weight:600; display:block; margin-bottom:4px;">
                🔄 Transición de ciclo
              </label>
              <div style="
                background:#F9FAFB;
                border:1px solid #E5E7EB;
                padding:10px;
                border-radius:6px;
                text-align:center;
                font-weight:500;
              ">
                ${data.ciclo_anterior} → ${data.ciclo_nuevo}
              </div>
            </div>

            <!-- 📊 MÉTRICAS -->
            <div style="margin-bottom:15px;">
              <label style="font-weight:600; display:block; margin-bottom:6px;">
                📊 Resultados del proceso
              </label>

              <div style="
                display:grid;
                grid-template-columns:1fr 1fr;
                gap:10px;
              ">

                <div style="background:#EFF6FF; padding:10px; border-radius:6px; border:1px solid #BFDBFE;">
                  👨‍🎓 <b>Egresados</b>
                  <div style="font-size:18px; font-weight:bold;">
                    ${data.alumnos_egresados}
                  </div>
                </div>

                <div style="background:#F0FDF4; padding:10px; border-radius:6px; border:1px solid #BBF7D0;">
                  📈 <b>Promovidos</b>
                  <div style="font-size:18px; font-weight:bold;">
                    ${data.alumnos_promovidos}
                  </div>
                </div>

                <div style="background:#FFFBEB; padding:10px; border-radius:6px; border:1px solid #FDE68A;">
                  💰 <b>Colegiaturas</b>
                  <div style="font-size:18px; font-weight:bold;">
                    ${data.colegiaturas_generadas}
                  </div>
                </div>

                <div style="background:#F5F3FF; padding:10px; border-radius:6px; border:1px solid #DDD6FE;">
                  💵 <b>Monto aplicado</b>
                  <div style="font-size:18px; font-weight:bold;">
                    $${data.monto_aplicado}
                  </div>
                </div>

              </div>
            </div>

            <!-- 🧠 FOOTER INFO -->
            <div style="
              margin-top:10px;
              font-size:12px;
              color:#6B7280;
              border-top:1px solid #E5E7EB;
              padding-top:8px;
            ">
              Los datos han sido actualizados correctamente. A paritr de ahora puede continuar operando en el nuevo ciclo escolar.
            </div>

          </div>
        `,
      }).then(() => {
        onClose();
        setAdminPage(0);
      });
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
      <h1 className="text-center text-gray-400 font-semibold">
        Complete el formulario con los datos del siguiente ciclo escolar para
        realizar el cierre de ciclo
      </h1>
      <form className="mt-3 space-y-5" onSubmit={handleCerrarCiclo}>
        <InputField
          icon={<Calendar size={18} />}
          label="Fecha de inicio del nuevo ciclo"
          type="date"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
        />
        <InputField
          icon={<Calendar size={18} />}
          label="Fecha de fin del nuevo ciclo"
          type="date"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
        />
        <InputField
          icon={<DollarSign size={18} />}
          label="Monto de colegiatura mensual "
          type="number"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
        />
        <button className="w-full p-3 rounded-xl text-center font-bold text-white bg-red-600 hover:bg-red-700 hover:-translate-y-1 cursor-pointer transition">
          Cerrar Ciclo Escolar
        </button>
      </form>
    </>
  );
}

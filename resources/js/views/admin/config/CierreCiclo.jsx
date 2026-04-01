import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Settings } from "lucide-react";
import { ClipLoader } from "react-spinners";
import useCicloEscolar from "../../../hooks/useCicloEscolar";

export default function CierreCiclo() {
  const [loading, setLoading] = useState(false);

  const { cerrarCiclo, cicloEscolar } = useCicloEscolar();

  const handleCerrarCiclo = async () => {
    const result = await Swal.fire({
      title: "Configuración del nuevo ciclo escolar",
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
          <li>Se cerrará el ciclo escolar actual</li>
          <li>Se creará un nuevo ciclo automáticamente</li>
          <li>Los alumnos serán promovidos al siguiente grado</li>
          <li>Los alumnos de último grado serán egresados</li>
          <li>Se generarán nuevas colegiaturas</li>
        </ul>
      </div>

      <!-- 📅 FECHA INICIO -->
      <div style="margin-bottom:14px;">
        <label style="display:block; font-weight:600; margin-bottom:4px;">
          Fecha de inicio del nuevo ciclo
        </label>
        <input type="date" id="inicio" class="swal2-input"
          style="width:100%; margin:0;">
      </div>

      <!-- 📅 FECHA FIN -->
      <div style="margin-bottom:14px;">
        <label style="display:block; font-weight:600; margin-bottom:4px;">
          Fecha de fin del nuevo ciclo
        </label>
        <input type="date" id="fin" class="swal2-input"
          style="width:100%; margin:0;">
      </div>

      <!-- 💰 MONTO -->
      <div style="margin-bottom:14px;">
        <label style="display:block; font-weight:600; margin-bottom:4px;">
          Monto mensual de colegiatura para el nuevo ciclo
        </label>
        <input type="number" id="monto" class="swal2-input"
          placeholder="Ej: 1500"
          style="width:100%; margin:0;">
        <small style="color:#6B7280;">
          Este monto se aplicará a todas las colegiaturas del nuevo ciclo escolar.
        </small>
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
        const inicio = document.getElementById("inicio").value;
        const fin = document.getElementById("fin").value;
        const monto = document.getElementById("monto").value;
        const confirm = document.getElementById("confirm").value;

        if (!inicio || !fin || !monto) {
          Swal.showValidationMessage("Todos los campos son obligatorios");
          return false;
        }

        if (new Date(fin) <= new Date(inicio)) {
          Swal.showValidationMessage(
            "La fecha de fin debe ser posterior a la de inicio",
          );
          return false;
        }

        if (confirm !== "CONFIRMAR") {
          Swal.showValidationMessage("Debe escribir CONFIRMAR exactamente");
          return false;
        }

        return {
          fecha_inicio: inicio,
          fecha_fin: fin,
          monto: parseFloat(monto),
        };
      },
    });

    if (!result.isConfirmed) return;

    try {
      setLoading(true);

      const { ok, message, data, error } = await cerrarCiclo(result.value);

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
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8  mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center">
              <Settings size={25} />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 flex gap1">
              Cierre de Ciclo Escolar
            </h1>
          </div>
          <p className="text-gray-500 mt-2 text-sm">
            Ejecute el proceso administrativo para finalizar el ciclo actual y
            preparar el siguiente.
          </p>
          <p className="text-gray-500 mt-2 text-sm">
            Ciclo Escolar Actual:{" "}
            <span className="font-bold">{cicloEscolar.nombre}</span>
          </p>
        </div>

        <div className="mb-6 p-6 bg-yellow-50 border border-yellow-300 rounded-xl shadow-sm">
          <h2 className="font-semibold text-yellow-800 mb-3">
            ⚠️ Proceso crítico
          </h2>

          <ul className="text-sm text-gray-700 space-y-2 list-disc pl-5">
            <li>Se cerrará el ciclo escolar activo.</li>
            <li>Se creará automáticamente un nuevo ciclo.</li>
            <li>Los alumnos serán promovidos al siguiente grado.</li>
            <li>Los alumnos de último grado serán marcados como egresados.</li>
            <li>Se generarán nuevas colegiaturas para el nuevo ciclo.</li>
            <li>
              Al concluir el proceso, el sistema ejecutará una reconfiguración
              automática, inicializando los datos asociados al nuevo ciclo
              escolar.
            </li>
          </ul>

          <p className="mt-4 text-xs text-gray-500">
            Este proceso no se puede revertir. Asegúrese de que toda la
            información esté correcta antes de continuar.
          </p>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={handleCerrarCiclo}
            disabled={loading}
            className={`flex items-center gap-2 px-6 py-3 font-semibold rounded-lg shadow-md transition transform cursor-pointer ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700 hover:-translate-y-1"
            } text-white`}
            id="driver_cierre-ciclo-btn"
          >
            {loading ? <ClipLoader /> : "Cerrar ciclo escolar"}
          </button>

          <span className="text-xs text-gray-500">
            Tiempo estimado: 1 - 2 minutos
          </span>
        </div>
      </div>
    </>
  );
}

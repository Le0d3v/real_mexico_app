import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Settings } from "lucide-react";

export default function CierreCiclo() {
  const [loading, setLoading] = useState(false);

  const handleCerrarCiclo = async () => {
    const result = await Swal.fire({
      title: "Confirmar cierre de ciclo",
      html: `
        <p style="margin-bottom:10px;">Esta acción es <b>crítica</b> y no se puede deshacer.</p>
        <ul style="text-align:left; font-size:14px;">
          <li>Se cerrará el ciclo actual</li>
          <li>Se creará un nuevo ciclo</li>
          <li>Se promoverán los alumnos</li>
          <li>Se egresarán los alumnos de último grado</li>
          <li>Se generarán nuevas colegiaturas</li>
        </ul>
        <p style="margin-top:10px; font-size:12px; color:#666;">
          Escriba <b>CONFIRMAR</b> para continuar
        </p>
      `,
      input: "text",
      inputPlaceholder: "CONFIRMAR",
      inputValidator: (value) => {
        if (value !== "CONFIRMAR") {
          return "Debe escribir CONFIRMAR exactamente";
        }
      },
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, cerrar ciclo",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      setLoading(true);

      const response = await axios.post(
        "/api/ciclo-escolar/cerrar",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      await Swal.fire({
        icon: "success",
        title: "Proceso completado",
        text: response.data.message,
      });
    } catch (error) {
      console.error(error);

      await Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Error al cerrar el ciclo",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
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
          {loading ? "Procesando cierre..." : "Cerrar ciclo escolar"}
        </button>

        <span className="text-xs text-gray-500">
          Tiempo estimado: 5 - 20 segundos
        </span>
      </div>
    </div>
  );
}

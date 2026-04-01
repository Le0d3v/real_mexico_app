import { Settings } from "lucide-react";
import { ClipLoader } from "react-spinners";
import useCicloEscolar from "../../../hooks/useCicloEscolar";
import Modal from "../components/Modal";
import CicloEscolarForm from "../ciclos_escolares/CicloEscolarForm";
import { useState } from "react";

export default function CierreCiclo() {
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);

  const { cicloEscolar } = useCicloEscolar();

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
            onClick={() => setModal(true)}
            disabled={loading}
            className={`flex items-center gap-2 px-6 py-3 font-semibold rounded-lg shadow-md transition transform cursor-pointer 
            bg-red-600 hover:bg-red-700 hover:-translate-y-1 text-white`}
            id="driver_cierre-ciclo-btn"
          >
            {loading ? <ClipLoader /> : "Cerrar ciclo escolar"}
          </button>

          <span className="text-xs text-gray-500">
            Tiempo estimado: 1 - 2 minutos
          </span>
        </div>
      </div>
      <Modal
        size="md"
        title={"Cerrar Ciclo Escolar"}
        icon={<Settings />}
        onClose={() => setModal(false)}
        isOpen={modal}
      >
        <CicloEscolarForm onClose={() => setModal(false)} />
      </Modal>
    </>
  );
}

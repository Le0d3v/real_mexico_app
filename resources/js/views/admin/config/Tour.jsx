import { Video, Info } from "lucide-react";
import useAdminTour from "../../../hooks/useAdminTour";

export default function Tour() {
    const { startTour } = useAdminTour();

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <div className="flex gap-3">
                <div className="p-1 rounded-full h-10 w-10 bg-red-500/20 text-red-500 flex justify-center items-center">
                    <Video size={25} />
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-6">
                    Tour por la Aplicación
                </h1>
            </div>
            <div className="mb-5">
                <p className="text-black text-sm text-justify">
                    Este recorrido interactivo le guiará paso a paso por las
                    principales secciones de la plataforma. Durante el tour se
                    resaltarán los elementos más importantes de la interfaz,
                    explicando la función de cada módulo y cómo utilizar las
                    herramientas disponibles para gestionar estudiantes, pagos y
                    contenido dentro del sistema. Este proceso le permitirá
                    familiarizarse rápidamente con la estructura y el flujo de
                    trabajo de la aplicación.
                </p>
            </div>
            <button
                className="p-2 rounded bg-blue-600 text-white font-semibold cursor-pointer hover:bg-blue-700 text-center text-lg hover:-translate-y-1 transition"
                onClick={startTour}
            >
                Iniciar Tour
            </button>
        </div>
    );
}

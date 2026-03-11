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
            <div className="mb-6 p-6 bg-blue-50 border border-blue-200 rounded-xl shadow-sm">
                <div className="flex items-start gap-4">
                    <div className="flex-1">
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Inicie un recorrido interactivo que le mostrará las
                            principales secciones del sistema. Durante el tour
                            se resaltarán los elementos clave de la interfaz y
                            se explicará la función de cada módulo,
                            permitiéndole comprender rápidamente cómo gestionar
                            estudiantes, pagos y contenido dentro de la
                            plataforma.
                        </p>

                        <div className="mt-4 flex items-center gap-5">
                            <button
                                onClick={startTour}
                                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition transform hover:-translate-y-1 cursor-pointer"
                            >
                                Iniciar Tour
                            </button>

                            <span className="text-xs text-gray-500">
                                Duración aproximada: 1–2 minutos
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

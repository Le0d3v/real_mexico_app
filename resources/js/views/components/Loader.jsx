import { PacmanLoader } from "react-spinners";

export default function Loader() {
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-6 p-10 rounded-2xl shadow-lg border border-gray-100 bg-white">
                <PacmanLoader color="#6B7280" size={46} margin={4} />

                <div className="text-center">
                    <h1 className="text-xl font-semibold text-gray-700">
                        Cargando información
                    </h1>

                    <p className="text-md text-gray-400 mt-1 animate-pulse">
                        Estamos obteniendo los datos del servidor...
                    </p>
                </div>
            </div>
        </div>
    );
}

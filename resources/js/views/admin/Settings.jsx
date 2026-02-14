import { Home, Lock, User } from "lucide-react";
import DatosPersonalesForm from "../components/private/DatosPersonalesForm";
import useAuth from "../../hooks/useAuth";
import Loader from "../components/private/Loader";

export default function Settings() {
    const { user } = useAuth({ middleware: "auth" });
    if (!user) {
        return <Loader />;
    }
    return (
        <div className="max-w-7xl mx-auto mt-5 px-3">
            <div className="my-7">
                <div className="flex gap-2">
                    <div className="p-1 rounded-full h-10 w-10 bg-blue-500/50 text-white flex justify-center items-center">
                        <User size={30} />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-6">
                        Datos Personales
                    </h1>
                </div>
                <DatosPersonalesForm user={user} />
            </div>
            <div className="my-7">
                <div className="flex gap-2">
                    <div className="p-1 rounded-full h-10 w-10 bg-emerald-500/50 text-white flex justify-center items-center">
                        <Home size={25} />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-6">
                        Datos de Domicilio
                    </h1>
                </div>
                <DatosPersonalesForm user={user} />
            </div>
            <div className="my-7">
                <div className="flex gap-2">
                    <div className="p-1 rounded-full h-10 w-10 bg-red-500/50 text-white flex justify-center items-center">
                        <Lock size={25} />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-6">
                        Cambiar Contraseña
                    </h1>
                </div>
                <DatosPersonalesForm user={user} />
            </div>
        </div>
    );
}

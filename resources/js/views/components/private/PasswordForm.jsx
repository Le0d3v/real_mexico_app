import { Info, Lock } from "lucide-react";
import SubmitButton from "../SubmitButton";

export default function PasswordForm() {
    return (
        <>
            <div
                className="bg-gray-800/80 rounded-3xl shadow-xl border border-gray-100 
                p-10 backdrop-blur-sm"
            >
                <div className="flex items-start gap-2 mb-5">
                    <div className=" text-violet-200">
                        <Info />
                    </div>
                    <p className="text-white text-sm leading-relaxed max-w-xl">
                        Actualice su contraseña llenando el formulario
                    </p>
                </div>

                <form className="">
                    <div className="flex flex-col my-5">
                        <div className="flex gap-1 items-center">
                            <Lock size={20} className="text-white" />
                            <label className="text-md text-white font-semibold">
                                Contraseña Actual
                            </label>
                        </div>
                        <input
                            type="password"
                            className="h-12 px-4 rounded-lg border-2 border-gray-200 
                                text-white font-medium
                            shadow-sm
                            focus:outline-none focus:ring-2 
                            focus:ring-gray-200 focus:border-gray-300
                            transition-all duration-200 mt-2"
                        />
                    </div>

                    <div className="flex flex-col my-5">
                        <div className="flex gap-1 items-center">
                            <Lock size={20} className="text-white" />
                            <label className="text-md text-white font-semibold">
                                Nueva Contraseña
                            </label>
                        </div>
                        <input
                            type="password"
                            className="h-12 px-4 rounded-lg border-2 border-gray-200 
                                text-white font-medium
                                shadow-sm
                                focus:outline-none focus:ring-2 
                                focus:ring-gray-200 focus:border-gray-300
                                transition-all duration-200 mt-2"
                        />
                    </div>

                    <div className="flex flex-col my-5">
                        <div className="flex gap-1 items-center">
                            <Lock size={20} className="text-white" />
                            <label className="text-md text-white font-semibold">
                                Confirmar Nueva Contraseña
                            </label>
                        </div>
                        <input
                            type="password"
                            className="h-12 px-4 rounded-lg border-2 border-gray-200 
                                text-white font-medium
                                shadow-sm
                                focus:outline-none focus:ring-2 
                                focus:ring-gray-200 focus:border-gray-300
                                transition-all duration-200 mt-2"
                        />
                    </div>

                    <div className="flex justify-end md:col-span-2">
                        <SubmitButton>Actualizar Contraseña</SubmitButton>
                    </div>
                </form>
            </div>
        </>
    );
}

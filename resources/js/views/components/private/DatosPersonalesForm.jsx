import SubmitButton from "../SubmitButton";
import { Info } from "lucide-react";

export default function DatosPersonalesForm({ user }) {
    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <div className="flex gap-1 items-center">
                <Info className="text-violet-500" />
                <p className="text-gray-600 text-sm">
                    Modifique cualquier dato incorrecto utilizando el siguiente
                    formulario.
                </p>
            </div>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 mt-5">
                <div className="flex flex-col">
                    <label className="text-gray-700 font-semibold text-lg mb-2">
                        Nombre
                    </label>
                    <input
                        type="text"
                        className="h-12 px-4 rounded-xl border border-gray-300 
                                       focus:outline-none focus:ring-3 
                                       focus:ring-gray-500 focus:border-gray-300
                                       text-lg transition bg-gray-600 text-white font-semibold"
                        value={user.name}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-700 font-semibold text-lg mb-2">
                        Apellido Paterno
                    </label>
                    <input
                        type="text"
                        className="h-12 px-4 rounded-xl border border-gray-300 
                                       focus:outline-none focus:ring-3 
                                       focus:ring-gray-500 focus:border-gray-300
                                       text-lg transition bg-gray-600 text-white font-semibold"
                        value={user.apellido_paterno}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-700 font-semibold text-lg mb-2">
                        Apellido Materno
                    </label>
                    <input
                        type="text"
                        className="h-12 px-4 rounded-xl border border-gray-300 
                                       focus:outline-none focus:ring-3 
                                       focus:ring-gray-500 focus:border-gray-300
                                       text-lg transition bg-gray-600 text-white font-semibold"
                        value={user.apellido_materno}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-700 font-semibold text-lg mb-2">
                        Fecha de Nacimiento
                    </label>
                    <input
                        type="date"
                        className="h-12 px-4 rounded-xl border border-gray-300 
                                       focus:outline-none focus:ring-3 
                                       focus:ring-gray-500 focus:border-gray-300
                                       text-lg transition bg-gray-600 text-white font-semibold"
                        value={user.fecha_nacimiento}
                    />
                </div>
                <div className="flex flex-col ">
                    <label className="text-gray-700 font-semibold text-lg mb-2">
                        CURP
                    </label>
                    <input
                        type="text"
                        className="h-12 px-4 rounded-xl border border-gray-300 
                                       focus:outline-none focus:ring-3 
                                       focus:ring-gray-500 focus:border-gray-300
                                       text-lg tracking-widest uppercase transition bg-gray-600 text-white font-semibold"
                        value={user.curp}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-700 font-semibold text-lg mb-2">
                        Género
                    </label>
                    <select
                        className="h-12 px-4 rounded-xl border border-gray-300 
                                       focus:outline-none focus:ring-3 
                                       focus:ring-gray-500 focus:border-gray-300
                                       text-lg transition bg-gray-600 text-white font-semibold"
                        value={user.genero}
                    >
                        <option value="">Seleccione una opción</option>
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                        <option value="O">Otro</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-700 font-semibold text-lg mb-2">
                        Número de Teléfono
                    </label>
                    <input
                        type="text"
                        className="h-12 px-4 rounded-xl border border-gray-300 
                                       focus:outline-none focus:ring-3 
                                       focus:ring-gray-500 focus:border-gray-300
                                       text-lg tracking-widest uppercase transition bg-gray-600 text-white font-semibold"
                        value={user.telefono}
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-700 font-semibold text-lg mb-2">
                        Correo Electrónico
                    </label>
                    <input
                        type="text"
                        className="h-12 px-4 rounded-xl border border-gray-300 
                                       focus:outline-none focus:ring-3 
                                       focus:ring-gray-500 focus:border-gray-300
                                       text-lg tracking-widest transition bg-gray-600 text-white font-semibold"
                        value={user.email}
                    />
                </div>

                {/* Botón */}
                <div className="w-full md:col-span-2">
                    <SubmitButton>Guardar Cambios</SubmitButton>
                </div>
            </form>
        </div>
    );
}

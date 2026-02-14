import SubmitButton from "../SubmitButton";
import { Info } from "lucide-react";

export default function DomicilioForm({ user }) {
    return (
        <>
            <div
                className="bg-gradient-to-br from-gray-50 to-gray-100 
                rounded-3xl shadow-xl border border-gray-100 
                p-10 backdrop-blur-sm"
            >
                <div className="flex items-center gap-2 mb-5">
                    <div className=" text-violet-500">
                        <Info />
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-xl">
                        Modifique cualquier dato incorrecto utilizando el
                        siguiente formulario.
                    </p>
                </div>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                    {/* Input base style reutilizable visualmente */}

                    <div className="flex flex-col">
                        <label className="text-md text-gray-500 font-semibold mb-2">
                            Calle
                        </label>
                        <input
                            type="text"
                            className="h-12 px-4 rounded-lg border border-gray-200 
                           bg-white text-gray-800 font-medium
                           shadow-sm
                           focus:outline-none focus:ring-2 
                           focus:ring-violet-400 focus:border-violet-500
                           transition-all duration-200"
                            value={user.domicilio.calle}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-md text-gray-500 font-semibold mb-2">
                            Número Exterior
                        </label>
                        <input
                            type="text"
                            className="h-12 px-4 rounded-lg border border-gray-200 
                           bg-white text-gray-800 font-medium
                           shadow-sm
                           focus:outline-none focus:ring-2 
                           focus:ring-violet-400 focus:border-violet-500
                           transition-all duration-200"
                            value={user.domicilio.numero_exterior}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-md text-gray-500 font-semibold mb-2">
                            Número Interior
                        </label>
                        <input
                            type="text"
                            className="h-12 px-4 rounded-lg border border-gray-200 
                           bg-white text-gray-800 font-medium
                           shadow-sm
                           focus:outline-none focus:ring-2 
                           focus:ring-violet-400 focus:border-violet-500
                           transition-all duration-200"
                            value={user.domicilio.numero_interior}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-md text-gray-500 font-semibold mb-2">
                            Colonia
                        </label>
                        <input
                            type="text"
                            className="h-12 px-4 rounded-lg border border-gray-200 
                           bg-white text-gray-800 font-medium
                           shadow-sm
                           focus:outline-none focus:ring-2 
                           focus:ring-violet-400 focus:border-violet-500
                           transition-all duration-200"
                            value={user.domicilio.colonia}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-md text-gray-500 font-semibold mb-2">
                            Localidad
                        </label>
                        <input
                            type="text"
                            className="h-12 px-4 rounded-lg border border-gray-200 
                           bg-white text-gray-800 font-medimd
                           shadow-sm
  semi                         focus:outline-none focus:ring-2 
                           focus:ring-violet-400 focus:border-violet-500
                           transition-all duration-200"
                            value={user.domicilio.localidad}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-md text-gray-500 font-semibold mb-2">
                            Municipio
                        </label>
                        <input
                            type="text"
                            className="h-12 px-4 rounded-lg border border-gray-200 
                           bg-white text-gray-800 font-medimd
                           shadow-sm
  semi                         focus:outline-none focus:ring-2 
                           focus:ring-violet-400 focus:border-violet-500
                           transition-all duration-200"
                            value={user.domicilio.municipio}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-md text-gray-500 font-semibold mb-2">
                            Entidad Federativa
                        </label>
                        <input
                            type="text"
                            className="h-12 px-4 rounded-lg border border-gray-200 
                           bg-white text-gray-800 font-medimd
                           shadow-sm
  semi                         focus:outline-none focus:ring-2 
                           focus:ring-violet-400 focus:border-violet-500
                           transition-all duration-200"
                            value={user.domicilio.entidad}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-md text-gray-500 font-semibold mb-2">
                            Código Postal
                        </label>
                        <input
                            type="text"
                            className="h-12 px-4 rounded-lg border border-gray-200 
                           bg-white text-gray-800 font-medium
                           shadow-sm
                           focus:outline-none focus:ring-2 
                           focus:ring-violet-400 focus:border-violet-500
                           transition-all duration-200"
                            value={user.domicilio.cp}
                        />
                    </div>

                    <div className="flex justify-end md:col-span-2">
                        <SubmitButton>Actualizar Domicilio</SubmitButton>
                    </div>
                </form>
            </div>
        </>
    );
}

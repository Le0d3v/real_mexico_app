import React from "react";

export default function Cuadros() {
    return (
        <div className="w-full md:p-5 p-3">
            <div className="flex justify-start md:justify-center w-full">
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 ">
                    <div className="py-5 px-10 bg-black font-bold text-white">
                        <h1 className="text-7xl font-black text-center">30+</h1>
                        <p className="text-xl uppercase mt-3 text-center">
                            Años de Experiencia
                        </p>
                    </div>
                    <div className="py-5 px-10 bg-black font-bold text-white">
                        <h1 className="text-7xl font-black text-center">
                            850+
                        </h1>
                        <p className="text-xl uppercase mt-3 text-center">
                            Alumnos Activos
                        </p>
                    </div>
                    <div className="py-5 px-5 bg-black font-bold text-white">
                        <h1 className="text-7xl font-black text-center">45</h1>
                        <p className="text-xl uppercase mt-3 text-center">
                            Docentes Certificados
                        </p>
                    </div>
                    <div className="py-5 px-10 bg-black font-bold text-white">
                        <h1 className="text-7xl font-black text-center">99%</h1>
                        <p className="text-xl uppercase mt-3 text-center">
                            Satisfacción
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

import React from "react";
import Tittle from "../components/Tittle";
import { Phone, Download, Smartphone } from "lucide-react";

export default function Tutores() {
    return (
        <section className="w-full bg-gray-50 py-10 px-6 md:px-20">
            <div className="max-w-7xl mx-auto">
                <Tittle>Para los Padres y Tutores</Tittle>

                {/* MENSAJE DEL DIRECTOR */}
                <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mt-12 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <img
                            src="/img/director.jpg"
                            alt="Director"
                            className="rounded-2xl shadow-lg w-full object-cover"
                        />
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">
                            Mensaje del Director
                        </h2>

                        <div className="w-16 h-1 bg-red-600 mt-3 mb-6 rounded-full"></div>

                        <p className="text-gray-600 leading-relaxed text-justify">
                            En nuestro instituto, cada alumno es acompañado con
                            atención, compromiso y profesionalismo. Creemos
                            firmemente que la educación es un trabajo conjunto
                            entre escuela y familia, fortaleciendo valores y
                            excelencia académica.
                        </p>

                        <p className="text-gray-600 leading-relaxed text-justify mt-4">
                            Nuestra prioridad es brindar un entorno seguro,
                            estructurado y humano donde cada estudiante pueda
                            desarrollarse plenamente.
                        </p>

                        <div className="flex items-center gap-3 mt-6 text-red-600 font-semibold">
                            <Phone size={18} />
                            Agenda una cita informativa
                        </div>
                    </div>
                </div>

                {/* APP MOVIL */}
                <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mt-16 grid md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Aplicación Móvil Institucional
                        </h2>

                        <div className="w-16 h-1 bg-red-600 mt-3 mb-6 rounded-full"></div>

                        <p className="text-gray-600 leading-relaxed text-justify">
                            Manténgase informado en todo momento a través de
                            nuestra aplicación oficial. Consulte avisos,
                            calificaciones, comunicados y eventos desde su
                            dispositivo móvil.
                        </p>

                        <div className="mt-6 flex gap-4">
                            <button className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition shadow-md cursor-pointer">
                                <Smartphone size={18} />
                                Descargar App
                            </button>
                        </div>
                    </div>

                    <div className="order-1 md:order-2">
                        <img
                            src="/img/fondo.webp"
                            alt="Aplicación móvil"
                            className="rounded-2xl shadow-lg w-full object-cover"
                        />
                    </div>
                </div>

                {/* LISTA DE UTILES */}
                <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mt-16 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <img
                            src="/img/fondo.webp"
                            alt="Lista de útiles"
                            className="rounded-2xl shadow-lg w-full object-cover"
                        />
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">
                            Lista de Útiles Escolares
                        </h2>

                        <div className="w-16 h-1 bg-red-600 mt-3 mb-6 rounded-full"></div>

                        <p className="text-gray-600 mb-6">
                            Consulte y descargue la lista oficial de materiales
                            escolares correspondiente al ciclo actual.
                        </p>

                        <ul className="space-y-2 text-gray-600">
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                                Cuadernos profesionales
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                                Lápices y colores
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                                Material de trabajo específico por grado
                            </li>
                        </ul>

                        <button className="mt-8 flex items-center gap-2 bg-yellow-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-yellow-600 transition shadow-md cursor-pointer">
                            <Download size={18} />
                            Descargar Lista Completa
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

import React from "react";
import Tittle from "../components/Tittle";
import {
    Lightbulb,
    Medal,
    Target,
    GraduationCap,
    HeartHandshake,
    ShieldCheck,
} from "lucide-react";
import FilosofiaCard from "../components/public/FilosofiaCard";
import PersonalCard from "../components/public/PersonalCard";

export default function About() {
    return (
        <div className="">
            <section className="w-full bg-gray-900 text-white py-16 px-6 md:px-20">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                            ¿Quiénes Somos?
                        </h2>
                        <div className="w-24 h-1 bg-red-600 mx-auto mt-4 rounded-full"></div>
                        <p className="text-gray-300 mt-6 max-w-2xl mx-auto text-lg">
                            Formando generaciones con excelencia académica y
                            valores sólidos.
                        </p>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="relative w-full md:w-1/2 group">
                            <img
                                src="/img/plan-estudios.jpg"
                                alt="Instituto Real de México"
                                className="rounded-2xl shadow-2xl transform group-hover:scale-105 transition duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-2xl"></div>
                        </div>
                        <div className="w-full md:w-1/2 space-y-3">
                            <h3 className="text-3xl font-bold text-yellow-400">
                                Instituto Real de México A.C.
                            </h3>

                            <p className="text-gray-300 leading-relaxed text-justify">
                                Institución educativa fundada en Chiautzingo,
                                Puebla, con el firme compromiso de ofrecer
                                educación de calidad sustentada en principios
                                académicos rigurosos y en la formación integral
                                de valores humanos.
                            </p>

                            <p className="text-gray-300 leading-relaxed text-justify">
                                Bajo la dirección de Miss Lupita Moreno
                                Escalante, el proyecto educativo se ha
                                fortalecido manteniendo una visión orientada al
                                servicio comunitario y al desarrollo pleno de la
                                niñez.
                            </p>

                            <p className="text-gray-300 leading-relaxed text-justify">
                                Actualmente ubicados en Santa Ana Xalmimilulco,
                                continuamos consolidándonos como una institución
                                comprometida con la excelencia educativa.
                            </p>
                            <button
                                className="mt-4 bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-xl font-semibold shadow-lg
                                cursor-pointer hover:-translate-y-1"
                            >
                                Conoce Nuestra Propuesta Educativa
                            </button>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 mt-20">
                        <div className="bg-zinc-900 p-8 rounded-2xl shadow-xl hover:shadow-red-600/30 transition">
                            <GraduationCap
                                className="text-yellow-400 mb-4"
                                size={40}
                            />
                            <h4 className="font-bold text-xl mb-2">
                                Excelencia Académica
                            </h4>
                            <p className="text-gray-400">
                                Metodologías sólidas que garantizan aprendizaje
                                significativo y preparación integral.
                            </p>
                        </div>

                        <div className="bg-zinc-900 p-8 rounded-2xl shadow-xl hover:shadow-red-600/30 transition">
                            <HeartHandshake
                                className="text-yellow-400 mb-4"
                                size={40}
                            />
                            <h4 className="font-bold text-xl mb-2">
                                Formación en Valores
                            </h4>
                            <p className="text-gray-400">
                                Educación centrada en principios éticos y
                                responsabilidad social.
                            </p>
                        </div>

                        <div className="bg-zinc-900 p-8 rounded-2xl shadow-xl hover:shadow-red-600/30 transition">
                            <ShieldCheck
                                className="text-yellow-400 mb-4"
                                size={40}
                            />
                            <h4 className="font-bold text-xl mb-2">
                                Confianza y Seguridad
                            </h4>
                            <p className="text-gray-400">
                                Entorno seguro, supervisado y enfocado en el
                                bienestar infantil.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full bg-gradient-to-b from-black via-zinc-900 to-black text-white py-20 px-6 md:px-20">
                <div className="max-w-7xl mx-auto">
                    {/* Título */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                            Misión, Visión y Valores
                        </h2>
                        <div className="w-24 h-1 bg-red-600 mx-auto mt-4 rounded-full"></div>
                        <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg">
                            Principios que fundamentan nuestro compromiso
                            educativo.
                        </p>
                    </div>

                    {/* Cards */}
                    <div className="grid md:grid-cols-3 gap-10">
                        {/* MISIÓN */}
                        <div className="bg-zinc-900/80 backdrop-blur-sm p-10 rounded-3xl border border-zinc-800 shadow-xl hover:shadow-red-600/30 transition duration-500 hover:-translate-y-2">
                            <div className="flex justify-center mb-6">
                                <Target size={50} className="text-yellow-400" />
                            </div>

                            <h3 className="text-2xl font-bold text-center text-yellow-400 mb-4">
                                Misión
                            </h3>

                            <p className="text-gray-300 text-center leading-relaxed">
                                Ofrecer educación de calidad en un entorno
                                seguro, con formación académica sólida y valores
                                que impulsen el desarrollo integral del
                                estudiante.
                            </p>

                            <div className="w-full h-1 bg-red-600 mt-8 rounded-full"></div>
                        </div>

                        {/* VISIÓN */}
                        <div className="bg-zinc-900/80 backdrop-blur-sm p-10 rounded-3xl border border-zinc-800 shadow-xl hover:shadow-red-600/30 transition duration-500 hover:-translate-y-2">
                            <div className="flex justify-center mb-6">
                                <Lightbulb
                                    size={50}
                                    className="text-yellow-400"
                                />
                            </div>

                            <h3 className="text-2xl font-bold text-center text-yellow-400 mb-4">
                                Visión
                            </h3>

                            <p className="text-gray-300 text-center leading-relaxed">
                                Consolidarnos como una institución reconocida
                                por excelencia académica, compromiso social y
                                formación de líderes íntegros.
                            </p>

                            <div className="w-full h-1 bg-red-600 mt-8 rounded-full"></div>
                        </div>

                        {/* VALORES */}
                        <div className="bg-zinc-900/80 backdrop-blur-sm p-10 rounded-3xl border border-zinc-800 shadow-xl hover:shadow-red-600/30 transition duration-500 hover:-translate-y-2">
                            <div className="flex justify-center mb-6">
                                <Medal size={50} className="text-yellow-400" />
                            </div>

                            <h3 className="text-2xl font-bold text-center text-yellow-400 mb-6">
                                Valores
                            </h3>

                            <ul className="space-y-4 text-center text-gray-300">
                                <li className="flex items-center  gap-3">
                                    <span className="w-3 h-3 bg-red-600 rounded-full"></span>
                                    Respeto
                                </li>
                                <li className="flex items-center  gap-3">
                                    <span className="w-3 h-3 bg-red-600 rounded-full"></span>
                                    Honestidad
                                </li>
                                <li className="flex items-center  gap-3">
                                    <span className="w-3 h-3 bg-red-600 rounded-full"></span>
                                    Responsabilidad
                                </li>
                            </ul>

                            <div className="w-full h-1 bg-red-600 mt-8 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full bg-black text-white py-20 px-6 md:px-20">
                <div className="max-w-7xl mx-auto">
                    {/* Título */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                            Nuestro Directorio
                        </h2>
                        <div className="w-24 h-1 bg-red-600 mx-auto mt-4 rounded-full"></div>
                        <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg">
                            Equipo directivo comprometido con la excelencia
                            educativa.
                        </p>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        <PersonalCard
                            nombre="Juan Torres"
                            puesto="Director General"
                            email="correo@correo.com"
                            tel="221-223-3221"
                            img="/img/director.jpg"
                        />

                        <PersonalCard
                            nombre="María López"
                            puesto="Coordinadora Académica"
                            email="correo@correo.com"
                            tel="221-223-3221"
                            img="/img/director.jpg"
                        />

                        <PersonalCard
                            nombre="Carlos Hernández"
                            puesto="Subdirector"
                            email="correo@correo.com"
                            tel="221-223-3221"
                            img="/img/director.jpg"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}

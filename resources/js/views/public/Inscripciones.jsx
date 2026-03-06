import React from "react";
import Tittle from "../components/Tittle";
import { CheckCircle, FileText, Calendar, Users } from "lucide-react";
import TituloDark from "./components/TituloDark";
import { motion } from "framer-motion";
import AnimationSection from "./components/AnimationSection";
import useCicloEscolar from "../../hooks/useCicloEscolar";

export default function Inscripciones() {
    const { cicloEscolar } = useCicloEscolar();

    return (
        <div className="w-full">
            <section className="relative py-28 bg-gradient-to-br from-black via-[#0f0f0f] to-[#1a1a1a] overflow-hidden">
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl"></div>

                <AnimationSection>
                    <div className="relative max-w-6xl mx-auto px-6 text-center text-white">
                        <TituloDark
                            titulo={"Forma Parte de Nosotros"}
                            subtitulo={
                                "Iniciar la educación primaria es una decisión estratégica en la formación académica y humana de su hijo. Nuestro proceso de admisión está diseñado bajo criterios de claridad, transparencia y acompañamiento permanente, garantizando una experiencia estructurada y confiable."
                            }
                        />

                        <div className="mt-10 flex justify-center gap-6 flex-wrap">
                            <a
                                href="https://wa.me/522212228893?text=Quiero%20solicitar%20informes%20sobre%20el%20proceso%20de%20inscripci%C3%B3n"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-yellow-400 text-black font-semibold px-10 py-4 rounded-2xl 
                                   shadow-lg hover:bg-yellow-300 
                                   transition-all duration-300 hover:scale-105"
                            >
                                Solicitar Información
                            </a>

                            <a
                                className="border border-yellow-400 text-yellow-400 
                                   px-10 py-4 rounded-2xl font-semibold
                                   hover:bg-yellow-400 hover:text-black
                                   transition-all duration-300"
                                href="https://wa.me/522212228893?text=Quiero%20agendar%20una%20visita%20al%20Instituto"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Agendar Visita
                            </a>
                        </div>
                    </div>
                </AnimationSection>
            </section>

            <section className="py-24 bg-white">
                <AnimationSection>
                    <div className="max-w-7xl mx-auto px-6">
                        <h2 className="text-3xl font-bold text-center text-gray-900">
                            Proceso de Inscripción
                        </h2>
                        <div className="w-24 h-1 bg-yellow-400 mx-auto mt-4 rounded-full"></div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-16">
                            <Step
                                icon={FileText}
                                title="Solicitud"
                                description="Complete el formulario de preinscripción y entregue la documentación básica requerida."
                            />

                            <Step
                                icon={Users}
                                title="Entrevista"
                                description="Se agenda una entrevista con padres y alumno para conocer expectativas y resolver dudas."
                            />

                            <Step
                                icon={Calendar}
                                title="Evaluación Diagnóstica"
                                description="Aplicamos una evaluación formativa para ubicar adecuadamente al alumno."
                            />

                            <Step
                                icon={CheckCircle}
                                title="Confirmación"
                                description="Una vez aprobado el proceso, se formaliza la inscripción y asignación de grupo."
                            />
                        </div>
                    </div>
                </AnimationSection>
            </section>

            <section className="py-24 bg-gray-50">
                <AnimationSection>
                    <div className="max-w-6xl mx-auto px-6">
                        <h2 className="text-3xl font-bold text-center text-gray-900">
                            Requisitos Generales
                        </h2>
                        <div className="w-24 h-1 bg-yellow-400 mx-auto mt-4 rounded-full"></div>

                        <div className="mt-14 grid md:grid-cols-2 gap-12">
                            <ul className="space-y-4 text-gray-700">
                                <li>• Acta de nacimiento (original y copia)</li>
                                <li>• CURP del alumno</li>
                                <li>• Boleta de calificaciones anterior</li>
                                <li>• Carta de buena conducta</li>
                            </ul>

                            <ul className="space-y-4 text-gray-700">
                                <li>• Comprobante de domicilio reciente</li>
                                <li>
                                    • Identificación oficial de padres o tutores
                                </li>
                                <li>• Cartilla de vacunación</li>
                                <li>• Fotografías tamaño infantil</li>
                            </ul>
                        </div>
                    </div>
                </AnimationSection>
            </section>

            <section className="py-24 bg-gradient-to-b from-black to-[#111111] text-white">
                <AnimationSection>
                    <div className="max-w-6xl mx-auto px-6 text-center">
                        <h2 className="text-3xl font-bold">
                            Información de Colegiaturas
                        </h2>
                        <div className="w-24 h-1 bg-yellow-400 mx-auto mt-4 rounded-full"></div>

                        <p className="mt-8 text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            Ofrecemos planes de pago flexibles y descuentos por
                            pronto pago o inscripción anticipada. Nuestra
                            prioridad es brindar educación de calidad con
                            opciones accesibles para las familias.
                        </p>

                        <div className="mt-12 bg-[#1a1a1a] p-10 rounded-2xl border border-yellow-400/10 shadow-lg">
                            <p className="text-2xl font-semibold text-yellow-400">
                                Inscripciones Abiertas Ciclo Escolar{" "}
                                {cicloEscolar.nombre}
                            </p>
                            <div className="mt-8">
                                <a
                                    className="bg-yellow-400 text-black font-semibold px-8 py-4 rounded-xl hover:bg-yellow-300 transition-all duration-300"
                                    href="https://wa.me/522212228893?text=Quiero%20agendar%20una%20visita"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Agendar Cita
                                </a>
                            </div>
                        </div>
                    </div>
                </AnimationSection>
            </section>

            <section className="py-20 bg-white">
                <AnimationSection>
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <h2 className="text-3xl font-bold text-gray-900">
                            ¿Tiene alguna duda?
                        </h2>
                        <p className="mt-6 text-gray-600">
                            Nuestro equipo administrativo está disponible para
                            brindarle asesoría personalizada sobre el proceso de
                            inscripción.
                        </p>

                        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-6">
                            <a
                                className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg hover:bg-yellow-300 transition"
                                href="https://wa.me/522212228893"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Contactar por Whatsapp
                            </a>

                            <button className="border border-yellow-400 text-yellow-500 font-semibold px-6 py-3 rounded-lg hover:bg-yellow-400 hover:text-black transition">
                                Enviar Correo
                            </button>
                        </div>
                    </div>
                </AnimationSection>
            </section>
        </div>
    );
}

/* SUBCOMPONENTE PARA PASOS */

function Step({ icon: Icon, title, description }) {
    return (
        <div
            className="bg-white p-8 rounded-2xl shadow-md border border-gray-100
                        text-center transition-all duration-300
                        hover:shadow-xl hover:-translate-y-2"
        >
            <div
                className="w-16 h-16 mx-auto flex items-center justify-center
                            rounded-full bg-yellow-100 text-yellow-500 mb-6"
            >
                <Icon size={30} />
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {title}
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed">
                {description}
            </p>
        </div>
    );
}

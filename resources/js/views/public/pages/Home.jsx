import React from "react";
import { Link } from "react-router-dom";
import Tittle from "./../components/Tittle";
import { BookOpenText, Computer, ShieldCheck, UserCheck } from "lucide-react";

export default function Home() {
    return (
        <div className="h-full">
            <div className="fondo h-96 p-5">
                <div>
                    <h1 className="h-full text-6xl font-black text-white w-2/3 mb-5">
                        Formamos niños seguros, curiosos y preparados para el
                        futuro
                    </h1>
                    <p className="text-white mb-5 text-sm w-1/2">
                        En nuestra escuela impulsamos el desarrollo académico,
                        emocional y social de cada uno de nuestros alumnos
                    </p>
                    <a
                        href="#"
                        className="p-2 rounded bg-blue-400 text-white cursor-pointer hover:bg-blue-500 hover:-translate-y-1 transition font-bold text-lg"
                    >
                        Solicitar Informes
                    </a>
                </div>
            </div>
            <div className="p-5">
                <Tittle>¿Por Qué Elegirnos?</Tittle>
                <div className="mt-5 p-5">
                    <div className="flex gap-10">
                        <div className="w-full">
                            <div>
                                <ShieldCheck
                                    className="mx-auto text-blue-400"
                                    size={90}
                                />
                            </div>
                            <h1 className="text-2xl font-bold  text-center">
                                Instalaciones Seguras
                            </h1>
                            <p className="text-center text-sm">
                                Contamos con espacios diseñados bajo criterios
                                de seguridad y supervisión constante,
                                garantizando entornos limpios, controlados y
                                adecuados para el desarrollo físico y emocional
                                de nuestros alumnos.
                            </p>
                        </div>
                        <div className="w-full">
                            <div>
                                <UserCheck
                                    className="mx-auto text-blue-400"
                                    size={90}
                                />
                            </div>
                            <h1 className="text-2xl font-bold  text-center">
                                Personal Certificado
                            </h1>
                            <p className="text-center text-sm">
                                Nuestro equipo docente y administrativo cuenta
                                con la formación académica y certificaciones
                                necesarias, asegurando una educación de calidad
                                basada en profesionalismo, vocación y compromiso
                                con cada alumno.
                            </p>
                        </div>
                        <div className="w-full">
                            <div>
                                <BookOpenText
                                    className="mx-auto text-blue-400"
                                    size={90}
                                />
                            </div>
                            <h1 className="text-2xl font-bold  text-center">
                                Métodos Constructivistas
                            </h1>
                            <p className="text-center text-sm">
                                Aplicamos metodologías constructivistas que
                                promueven el aprendizaje activo, fomentando el
                                pensamiento crítico, la participación y el
                                desarrollo integral de cada alumno a partir de
                                su experiencia y entorno.
                            </p>
                        </div>
                        <div className="w-full">
                            <div>
                                <Computer
                                    className="mx-auto text-blue-400"
                                    size={90}
                                />
                            </div>
                            <h1 className="text-2xl font-bold  text-center">
                                Uso de Tecnología
                            </h1>
                            <p className="text-center text-sm">
                                Integramos la tecnología como una herramienta
                                educativa que fortalece el aprendizaje,
                                promoviendo el uso responsable, guiado y
                                adecuado a la edad para potenciar las
                                habilidades académicas y digitales de nuestros
                                alumnos.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-5 w-full p-5 bg-amber-400"></div>
            <div>
                <Tittle>¡Visita nuestras Instalaciones!</Tittle>
                <div className="w-full h-96 my-5">
                    <iframe
                        className="w-full h-full rounded-lg"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.647517292828!2d-98.38368012606392!3d19.21059184773598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfd19345a98fa7%3A0x47e247268f913e02!2sINSTITUTO%20REAL%20DE%20MEXICO%20A.C!5e0!3m2!1ses-419!2smx!4v1770147793233!5m2!1ses-419!2smx"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>
        </div>
    );
}

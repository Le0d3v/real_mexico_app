import React from "react";
import { Link } from "react-router-dom";
import Tittle from "./../components/Tittle";
import {
    BookOpenText,
    Computer,
    MapPin,
    ShieldCheck,
    UserCheck,
} from "lucide-react";
import IconContainer from "../components/IconContainer";

export default function Home() {
    return (
        <div className="h-full">
            <div className="fondo h-screen p-5">
                <div className="">
                    <h1 className="h-full w-full text-5xl text-center md:text-start md:text-6xl font-black md:w-2/3 mb-5 text-white">
                        Formamos niños seguros, curiosos y preparados para el
                        futuro
                    </h1>
                    <div className="w-full flex justify-center md:justify-start mt-10 md:mt-0">
                        <div className="flex gap-2 items-center flex-col md:flex-row">
                            <MapPin className="text-white w-20 h-20  md:w-10 md:h-10" />
                            <p className="text-white text-sm w-full text-center md:text-start">
                                Calle Industria #4. Santa Ana Xalmimilulco,
                                Huejotzingo, Puebla, México.
                            </p>
                        </div>
                    </div>
                    <div className="mt-15 flex justify-center md:justify-start w-full">
                        <a
                            href="#"
                            className="p-2 rounded bg-blue-400 text-white cursor-pointer hover:bg-blue-500 hover:-translate-y-1 transition font-bold text-lg"
                        >
                            Solicitar Informes
                        </a>
                    </div>
                </div>
            </div>
            <div className="p-5">
                <Tittle>¿Por Qué Elegirnos?</Tittle>
                <div className="mt-5 p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        <IconContainer
                            icon={ShieldCheck}
                            tittle={"Instalaciones Seguras"}
                        >
                            Contamos con espacios diseñados bajo criterios de
                            seguridad y supervisión constante, garantizando
                            entornos limpios, controlados y adecuados para el
                            desarrollo físico y emocional de nuestros alumnos.
                        </IconContainer>
                        <IconContainer
                            icon={UserCheck}
                            tittle={"Personal Certificado"}
                        >
                            Nuestro equipo docente y administrativo cuenta con
                            la formación académica y certificaciones necesarias,
                            asegurando una educación de calidad basada en
                            profesionalismo, vocación y compromiso con cada
                            alumno.
                        </IconContainer>
                        <IconContainer
                            icon={BookOpenText}
                            tittle={"Métodos Constructivistas"}
                        >
                            Aplicamos metodologías constructivistas que
                            promueven el aprendizaje activo, fomentando el
                            pensamiento crítico, la participación y el
                            desarrollo integral de cada alumno a partir de su
                            experiencia y entorno.
                        </IconContainer>
                        <IconContainer
                            icon={Computer}
                            tittle={"Uso de Tecnología"}
                        >
                            Integramos la tecnología como una herramienta
                            educativa que fortalece el aprendizaje, promoviendo
                            el uso responsable, guiado y adecuado a la edad para
                            potenciar las habilidades académicas y digitales de
                            nuestros alumnos.
                        </IconContainer>
                    </div>
                </div>
            </div>
            <div className="my-5 w-full p-5 bg-amber-400"></div>
            <div className="">
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

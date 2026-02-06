import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";

export default function Footer() {
    return (
        <footer className="bg-red-600 w-full p-5 text-white">
            <div className="flex gap-15 w-full flex-col md:flex-row">
                <div className=" w-full md:w-2/4">
                    <div className="flex gap-2 items-center flex-col lg:flex-row">
                        <img
                            src="/img/logo.png"
                            alt="imagen-logo"
                            className="max-w-36 min-w-12"
                        />
                        <div>
                            <h1 className="text-yellow-400 text-5xl md:text-3xl font-bold text-center md:text-start">
                                Instituto Real de México
                            </h1>
                            <p className="text-sm text-white text-center md:text-start mt-1 md:mt-0">
                                Escuela Primaria Paritucla Incorporada a la SEP
                            </p>
                            <p className="text-sm text-white text-center md:text-start mt-1 md:mt-0">
                                Clave: 21PPR0827N
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/4">
                    <h1 className="text-3xl md:text-2xl font-bold text-center md:text-start">
                        Conéctate
                    </h1>
                    <a
                        href=""
                        className="block my-5 md:my-3 text-gray-200 hover:text-yellow-400 hover:-translate-y-1 transition hover:font-bold text-center md:text-start"
                    >
                        Facebook
                    </a>
                    <a
                        href=""
                        className="block my-5 md:my-3 text-gray-200 hover:text-yellow-400 hover:-translate-y-1 transition hover:font-bold text-center md:text-start"
                    >
                        Instagram
                    </a>
                    <a
                        href=""
                        className="block my-5 md:my-3 text-gray-200 hover:text-yellow-400 hover:-translate-y-1 transition hover:font-bold text-center md:text-start"
                    >
                        Twitter
                    </a>
                    <a
                        href=""
                        className="block my-5 md:my-3 text-gray-200 hover:text-yellow-400 hover:-translate-y-1 transition hover:font-bold text-center md:text-start"
                    >
                        You Tube
                    </a>
                </div>
                <div className="w-full md:w-1/4">
                    <h1 className="text-3xl md:text-2xl font-bold text-center md:text-start">
                        Contáctanos
                    </h1>
                    <div className="flex gap-3 items-center my-5 flex-col md:flex-row">
                        <MapPin className="w-10 h-10 md:w-8 md:h-8" />
                        <div>
                            <p className="text-sm text-center md:text-start">
                                Calle Industria #4.
                            </p>
                            <p className="text-sm text-center md:text-start">
                                Santa Ana Xalmimilulco, Huejotzingo, Puebla
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-3 items-center my-5 flex-col md:flex-row">
                        <Phone className="w-10 h-10 md:w-5 md:h-5" />
                        <div>
                            <p className="text-sm text-center md:text-start">
                                2212228893
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-3 items-center my-5 flex-col md:flex-row">
                        <Mail className="w-10 h-10 md:w-5 md:h-5" />
                        <div>
                            <p className="text-sm text-center md:text-start">
                                contacto@realdemexicoac.com
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center w-full mt-5">
                <div className="flex gap-10">
                    <p className="">Aviso de Privacidad</p>
                    <p className="">Terminos y Condiciones</p>
                </div>
            </div>
            <p className="text-sm mt-5 text-center">
                Instituto Real de México 2025. Todos los Derechos Reservados
            </p>
        </footer>
    );
}

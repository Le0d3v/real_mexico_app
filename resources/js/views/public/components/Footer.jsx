import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";

export default function Footer() {
    return (
        <footer className="bg-red-600 w-full p-5 text-white">
            <div className="flex gap-15 w-full">
                <div className="w-2/4">
                    <div className="flex gap-2 items-center">
                        <img
                            src="/img/logo.png"
                            alt="imagen-logo"
                            className="w-36"
                        />
                        <div>
                            <h1 className="text-yellow-400 text-3xl font-bold">
                                Instituto Real de México
                            </h1>
                            <p className="text-sm text-white">
                                Escuela Primaria Paritucla Incorporada a la SEP
                            </p>
                            <p className="text-sm text-white">
                                Clave: 21PPR0827N
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-1/4">
                    <h1 className="text-2xl font-bold">Conéctate</h1>
                    <a
                        href=""
                        className="block my-3 text-gray-200 hover:text-yellow-400 hover:-translate-y-1 transition hover:font-bold"
                    >
                        Facebook
                    </a>
                    <a
                        href=""
                        className="block my-3 text-gray-200 hover:text-yellow-400 hover:-translate-y-1 transition hover:font-bold"
                    >
                        Instagram
                    </a>
                    <a
                        href=""
                        className="block my-3 text-gray-200 hover:text-yellow-400 hover:-translate-y-1 transition hover:font-bold"
                    >
                        Twitter
                    </a>
                    <a
                        href=""
                        className="block my-3 text-gray-200 hover:text-yellow-400 hover:-translate-y-1 transition hover:font-bold"
                    >
                        You Tube
                    </a>
                </div>
                <div className="w-1/4">
                    <h1 className="text-2xl font-bold">Contáctanos</h1>
                    <div className="flex gap-3 items-center my-5">
                        <MapPin size={30} />
                        <div>
                            <p className="text-sm">Calle Industria #4.</p>
                            <p className="text-sm">
                                Santa Ana Xalmimilulco, Huejotzingo, Puebla
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-3 items-center my-5">
                        <Phone size={20} />
                        <div>
                            <p className="text-sm">2212228893</p>
                        </div>
                    </div>
                    <div className="flex gap-3 items-center my-5">
                        <Mail size={20} />
                        <div>
                            <p className="text-sm">
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

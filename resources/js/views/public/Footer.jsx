import {
    Mail,
    MapPin,
    Phone,
    Facebook,
    Instagram,
    Twitter,
    Youtube,
} from "lucide-react";

import socialLinks from "../../helpers/socialLinks";

export default function Footer() {
    return (
        <footer className="w-full bg-gradient-to-br from-red-700 via-red-600 to-red-800 text-white">
            <div className="max-w-7xl mx-auto px-6 md:px-20 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div>
                        <div className="flex items-center gap-4">
                            <img
                                src="/img/logo.png"
                                alt="Instituto Real de México"
                                className="w-32"
                            />
                            <div>
                                <h2 className="text-2xl font-extrabold text-yellow-400">
                                    Instituto Real de México A.C.
                                </h2>
                                <p className="text-sm text-red-100 mt-1">
                                    Escuela Primaria Particular Incorporada a la
                                    SEP
                                </p>
                                <p className="text-sm text-red-100">
                                    Clave: 21PPR0827N
                                </p>
                            </div>
                        </div>

                        <p className="mt-6 text-sm text-red-100 leading-relaxed">
                            Comprometidos con la formación académica y humana de
                            cada alumno, fortaleciendo valores y excelencia
                            educativa.
                        </p>
                    </div>

                    <div className="flex justify-center">
                        <div>
                            <h3 className="text-xl font-bold mb-6">
                                Conéctate
                            </h3>

                            <div className="space-y-4">
                                {socialLinks.map((link, i) => (
                                    <a
                                        href={link.url}
                                        id={i}
                                        className="flex items-center gap-3 text-red-100 hover:text-yellow-400 transition hover:font-bold hover:-translate-y-1"
                                    >
                                        {link.icon}
                                        <p>{link.name}</p>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contacto */}
                    <div>
                        <h3 className="text-xl font-bold mb-6">Contáctanos</h3>

                        <div className="space-y-5 text-red-100 text-sm">
                            <div className="flex items-start gap-3">
                                <MapPin
                                    className="text-yellow-400 mt-1"
                                    size={18}
                                />
                                <div>
                                    <p>Calle Industria #4</p>
                                    <p>
                                        Santa Ana Xalmimilulco, Huejotzingo,
                                        Puebla
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Phone className="text-yellow-400" size={18} />
                                <p>221 222 8893</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <Mail className="text-yellow-400" size={18} />
                                <p>contacto@realdemexicoac.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-red-500"></div>

            <div className="bg-black/95 py-6">
                <div className="max-w-7xl mx-auto px-6 md:px-20 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex gap-8 text-sm text-gray-400">
                        <a
                            href="#"
                            className="hover:text-yellow-400 transition"
                        >
                            Aviso de Privacidad
                        </a>
                        <a
                            href="#"
                            className="hover:text-yellow-400 transition"
                        >
                            Términos y Condiciones
                        </a>
                    </div>

                    <p className="text-sm text-gray-500 text-center">
                        © 2026 Instituto Real de México. Todos los derechos
                        reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}

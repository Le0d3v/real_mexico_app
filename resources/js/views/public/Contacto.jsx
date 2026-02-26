import { useState } from "react";
import TituloDark from "./TituloDark";
import {
    Clock,
    Mail,
    MapPin,
    PhoneCall,
    HelpCircle,
    Send,
    ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import preguntas from "../../helpers/preguntas";
import socialLinks from "../../helpers/socialLinks";
import Map from "./components/Map";

export default function Contacto() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <>
            <section className="bg-slate-900 text-white py-10 px-6 md:px-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <TituloDark
                        titulo={"Contáctanos"}
                        subtitulo={
                            "Estamos listos para acompañarte en cada etapa del proceso académico."
                        }
                    />
                </motion.div>
            </section>

            <section className="bg-gray-100 py-20 px-6 md:px-20">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white rounded-3xl p-10 shadow-xl border border-gray-200"
                    >
                        <h2 className="text-2xl font-bold text-slate-800">
                            Envíanos un mensaje
                        </h2>

                        <form className="space-y-6 mt-8">
                            <input
                                className="w-full bg-gray-100 p-3 rounded-xl border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-400 outline-none transition"
                                placeholder="Nombre Completo"
                            />
                            <input
                                className="w-full bg-gray-100 p-3 rounded-xl border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-400 outline-none transition"
                                placeholder="Número de Teléfono"
                            />
                            <textarea
                                rows="4"
                                className="w-full bg-gray-100 p-3 rounded-xl border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-400 outline-none transition"
                                placeholder="Mensaje"
                            />

                            <button className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition shadow-md flex items-center justify-center gap-2">
                                <Send size={18} />
                                Enviar Mensaje
                            </button>
                        </form>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200">
                            <h2 className="text-2xl font-bold text-slate-800 mb-6">
                                Información de Contacto
                            </h2>

                            <div className="space-y-6 text-gray-700">
                                <div className="flex gap-4">
                                    <MapPin className="text-red-500" />
                                    <p>Huejotzingo, Puebla, México</p>
                                </div>
                                <div className="flex gap-4">
                                    <PhoneCall className="text-red-500" />
                                    <p>221 222 8893</p>
                                </div>
                                <div className="flex gap-4">
                                    <Mail className="text-red-500" />
                                    <p>informes@irm.com</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200">
                            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                                <Clock className="text-red-500" />
                                Horarios de Atención
                            </h2>

                            <div className="space-y-3 text-gray-700">
                                <div className="flex justify-between border-b border-gray-200 pb-2">
                                    <span>Lunes a Viernes</span>
                                    <span>7:00 AM - 3:00 PM</span>
                                </div>

                                <div className="flex justify-between border-b border-gray-200 pb-2">
                                    <span>Sábados</span>
                                    <span>9:00 AM - 1:00 PM</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Domingos</span>
                                    <span className="text-red-500 font-semibold">
                                        Cerrado
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="bg-slate-900 text-white py-20 px-6 md:px-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-6xl mx-auto"
                >
                    <h2 className="text-3xl font-bold text-center text-white mb-12">
                        Síguenos en Redes Sociales
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {socialLinks.map((link, i) => (
                            <a
                                key={i}
                                href={link.url}
                                className="flex flex-col items-center justify-center bg-slate-800 hover:bg-red-500 transition p-6 rounded-2xl duration-300 shadow-lg"
                            >
                                {link.icon}
                            </a>
                        ))}
                    </div>
                </motion.div>
            </section>

            <section className="bg-gray-100 py-20 px-6 md:px-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-6xl mx-auto"
                >
                    <Map />
                </motion.div>
            </section>

            {/* FAQ ACORDEÓN */}
            <section className="bg-white py-20 px-6 md:px-20">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">
                        Preguntas Frecuentes
                    </h2>

                    <div className="space-y-4">
                        {preguntas.map((item, index) => (
                            <div
                                key={index}
                                className="border border-gray-200 rounded-xl shadow-sm"
                            >
                                <button
                                    onClick={() => toggle(index)}
                                    className="w-full flex justify-between items-center p-5 font-semibold text-left text-slate-800"
                                >
                                    {item.pregunta}
                                    <ChevronDown
                                        className={`transition-transform duration-300 ${activeIndex === index ? "rotate-180" : ""}`}
                                    />
                                </button>

                                <AnimatePresence>
                                    {activeIndex === index && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{
                                                opacity: 1,
                                                height: "auto",
                                            }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="px-5 pb-5 text-gray-600"
                                        >
                                            {item.respuesta}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

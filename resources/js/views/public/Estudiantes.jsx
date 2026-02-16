import React from "react";
import { motion } from "framer-motion";
import Tittle from "../components/Tittle";

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function Estudiantes() {
    return (
        <section className="w-full bg-gray-50 py-12">
            {/* HERO */}
            <div className="max-w-6xl mx-auto px-6 md:px-20">
                <Tittle>Nuestros Alumnos</Tittle>

                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="mt-10 bg-white rounded-3xl shadow-xl overflow-hidden"
                >
                    <img
                        src="/img/alumnos.png"
                        alt="Alumnos"
                        className="w-full object-cover"
                    />

                    <div className="p-8 md:p-12">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Formamos Alumnos Preparados para el Futuro
                        </h2>

                        <div className="w-20 h-1 bg-red-600 mt-4 mb-6 rounded-full"></div>

                        <p className="text-gray-700 leading-relaxed text-justify">
                            Formamos estudiantes con pensamiento crítico,
                            valores sólidos y competencias alineadas a los
                            desafíos del siglo XXI. Nuestro modelo integra el
                            desarrollo intelectual, emocional y social mediante
                            metodologías activas y uso estratégico de la
                            tecnología.
                        </p>

                        <p className="text-gray-700 leading-relaxed text-justify mt-4">
                            Impulsamos autonomía, creatividad y resolución de
                            problemas reales. No solo educamos para el presente:
                            construimos bases estructurales para el liderazgo
                            futuro.
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* ADICIONALES */}
            <div className="mt-20">
                <Tittle>Adicionales</Tittle>

                {/* COMPUTACIÓN */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="max-w-7xl mx-auto mt-12 bg-black text-white rounded-3xl overflow-hidden shadow-2xl grid md:grid-cols-2"
                >
                    <img
                        src="/img/computacion.jpg"
                        alt="Computación"
                        className="w-full h-full object-cover"
                    />
                    <div className="p-10 flex flex-col justify-center">
                        <h2 className="text-3xl font-bold">
                            Talleres de Computación
                        </h2>
                        <div className="w-16 h-1 bg-red-600 mt-4 mb-6 rounded-full"></div>
                        <p className="text-gray-300 text-justify leading-relaxed">
                            Desarrollo de competencias digitales, pensamiento
                            lógico y uso responsable de tecnología mediante
                            enfoque práctico guiado.
                        </p>
                    </div>
                </motion.div>

                {/* INGLÉS */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="max-w-7xl mx-auto mt-12 bg-white rounded-3xl shadow-xl grid md:grid-cols-2 overflow-hidden"
                >
                    <div className="p-10 flex flex-col justify-center bg-red-600">
                        <h2 className="text-3xl font-bold text-white">
                            Clases de Inglés
                        </h2>
                        <div className="w-16 h-1 bg-black mt-4 mb-6 rounded-full"></div>
                        <p className="text-white text-justify leading-relaxed">
                            Desarrollo progresivo de habilidades comunicativas,
                            fortalecimiento cognitivo y apertura cultural desde
                            edades tempranas.
                        </p>
                    </div>
                    <img
                        src="/img/ingles.jpg"
                        alt="Inglés"
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* MÚSICA */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="max-w-7xl mx-auto mt-12 bg-gray-900 text-white rounded-3xl shadow-2xl grid md:grid-cols-2 overflow-hidden"
                >
                    <img
                        src="/img/musica.jpg"
                        alt="Música"
                        className="w-full h-full object-cover"
                    />
                    <div className="p-10 flex flex-col justify-center">
                        <h2 className="text-3xl font-bold">Clases de Música</h2>
                        <div className="w-16 h-1 bg-yellow-500 mt-4 mb-6 rounded-full"></div>
                        <p className="text-gray-300 text-justify leading-relaxed">
                            Estimulación cognitiva, creatividad y disciplina a
                            través del lenguaje musical como herramienta de
                            desarrollo integral.
                        </p>
                    </div>
                </motion.div>

                {/* PLATAFORMAS */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="max-w-7xl mx-auto mt-12 bg-white rounded-3xl shadow-xl grid md:grid-cols-2 overflow-hidden"
                >
                    <div className="p-10 flex flex-col justify-center">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Plataformas Digitales
                        </h2>
                        <div className="w-16 h-1 bg-indigo-500 mt-4 mb-6 rounded-full"></div>
                        <p className="text-gray-700 text-justify leading-relaxed">
                            Seguimiento académico estructurado, contenidos
                            interactivos y fortalecimiento de competencias
                            digitales bajo un enfoque seguro y pedagógico.
                        </p>
                    </div>
                    <img
                        src="/img/plataformas.png"
                        alt="Plataformas"
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* CTA FINAL */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="max-w-6xl mx-auto mt-20 bg-gradient-to-r from-gray-900 to-black rounded-3xl shadow-2xl p-16 text-center text-white"
                >
                    <h2 className="text-3xl font-bold">
                        Descarga Gratis nuestro Programa de Estudios
                    </h2>

                    <button className="mt-8 px-8 py-4 bg-white text-black font-semibold rounded-xl shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                        Descargar
                    </button>
                </motion.div>
            </div>
        </section>
    );
}

import React from "react";
import { motion } from "framer-motion";
import Tittle from "../components/Tittle";
import { Phone, Download, Smartphone } from "lucide-react";

export default function Tutores() {
  return (
    <section className="w-full bg-gray-100 py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <Tittle>Para los Padres y Tutores</Tittle>

        {/* MENSAJE DEL DIRECTOR */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-xl p-10 md:p-14 mt-16 grid md:grid-cols-2 gap-12 items-start border border-gray-200"
        >
          <div>
            <img
              src="/img/miss.jpeg"
              alt="Director"
              className="rounded-2xl shadow-lg w-full object-cover"
            />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-slate-800">
              Mensaje del Director
            </h2>

            <div className="w-16 h-1 bg-red-500 mt-3 mb-6 rounded-full"></div>

            <p className="text-gray-600 leading-relaxed text-justify">
              La formación integral de nuestros estudiantes es resultado del
              trabajo coordinado entre institución y familia. Fomentamos
              disciplina, valores y excelencia académica.
            </p>

            <p className="text-gray-600 leading-relaxed text-justify mt-4">
              Nuestro compromiso es ofrecer un entorno seguro, estructurado y
              humano que impulse el desarrollo pleno de cada alumno.
            </p>

            <button className="mt-6 flex items-center gap-2 text-red-500 font-semibold hover:text-red-600 transition">
              <Phone size={18} />
              Agenda una cita informativa
            </button>
          </div>
        </motion.div>

        {/* APP MOVIL — BLOQUE OSCURO PARA CONTRASTE */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-slate-900 text-white rounded-3xl shadow-2xl p-10 md:p-14 mt-20 grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold">
              Aplicación Móvil Institucional
            </h2>

            <div className="w-16 h-1 bg-red-500 mt-3 mb-6 rounded-full"></div>

            <p className="text-slate-300 leading-relaxed text-justify">
              Consulte calificaciones, avisos y comunicados en tiempo real desde
              su dispositivo móvil. La comunicación directa fortalece el
              seguimiento académico.
            </p>

            <button className="mt-8 flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl transition shadow-lg">
              <Smartphone size={18} />
              Descargar App
            </button>
          </div>

          <div className="order-1 md:order-2">
            <img
              src="/img/app.png"
              alt="Aplicación móvil"
              className="rounded-2xl shadow-lg w-full object-cover"
            />
          </div>
        </motion.div>

        {/* LISTA DE ÚTILES — CLARO ELEGANTE */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-xl p-10 md:p-14 mt-20 grid md:grid-cols-2 gap-12 items-center border border-gray-200"
        >
          <div>
            <img
              src="/img/utiles.jpg"
              alt="Lista de útiles"
              className="rounded-2xl shadow-lg w-full object-cover"
            />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-slate-800">
              Lista de Útiles Escolares
            </h2>

            <div className="w-16 h-1 bg-yellow-500 mt-3 mb-6 rounded-full"></div>

            <p className="text-gray-600 mb-6">
              Descargue la lista oficial correspondiente al ciclo escolar
              vigente.
            </p>

            <ul className="space-y-3 text-gray-600">
              {[
                "Cuadernos profesionales",
                "Lápices y colores",
                "Material específico por grado",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  {item}
                </li>
              ))}
            </ul>

            <button className="mt-8 flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl font-semibold transition shadow-md">
              <Download size={18} />
              Descargar Lista Completa
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

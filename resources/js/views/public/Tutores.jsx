import React from "react";
import { motion } from "framer-motion";
import Tittle from "../components/Tittle";
import { Phone, Download, Smartphone, Info } from "lucide-react";

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
              La formación integral de nuestros estudiantes es el resultado de
              un trabajo sistemático, coordinado y profundamente comprometido
              entre la institución y la familia. Entendemos que la educación no
              se limita a la transmisión de conocimientos, sino que implica la
              construcción de carácter, el fortalecimiento de valores y el
              desarrollo de habilidades que acompañarán al alumno a lo largo de
              toda su vida. En nuestra institución fomentamos la disciplina como
              eje estructural del aprendizaje, no como una imposición, sino como
              una herramienta que forma hábitos, responsabilidad y constancia.
              Promovemos valores sólidos como el respeto, la honestidad, la
              empatía y el compromiso, elementos indispensables para formar
              ciudadanos íntegros y conscientes de su entorno. Todo ello se
              complementa con un enfoque académico riguroso, orientado a la
              excelencia y a la mejora continua.
            </p>
            <p className="text-gray-600 leading-relaxed text-justify mt-4">
              Nuestro compromiso va más allá del aula. Nos enfocamos en ofrecer
              un entorno seguro, estructurado y humano, donde cada estudiante se
              sienta acompañado, escuchado y motivado. Creemos firmemente en el
              potencial único de cada alumno, y trabajamos día a día para
              impulsarlo, guiándolo en su crecimiento personal, emocional y
              académico.
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
              Consulte de manera ágil y centralizada toda la información
              académica de sus estudiantes, incluyendo su desempeño, datos
              relevantes y el estado actualizado de sus colegiaturas. Acceda
              también al historial detallado de pagos realizados, con total
              claridad y transparencia. Todo esto disponible en tiempo real,
              desde la comodidad de su dispositivo Android, permitiéndole
              mantenerse informado y tomar decisiones oportunas en cualquier
              momento y lugar.
            </p>

            <div className="mt-5 flex items-center gap-1">
              <Info size={16} className="text-yellow-400" />
              <p className="text-sm text-gray-500 ">
                Disponible actualmente para solo para dispositivos Android
              </p>
            </div>

            <a
              href="/apk/base.apk"
              className="mt-8 flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl transition shadow-lg"
              download
            >
              <Smartphone size={18} />
              Descargar App
            </a>
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

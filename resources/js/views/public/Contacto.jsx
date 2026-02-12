import React from "react";
import Tittle from "../components/public/Tittle";
import {
    Clock,
    Facebook,
    Globe,
    Instagram,
    Mail,
    MapPin,
    Phone,
    PhoneCall,
    Twitter,
    Youtube,
    HelpCircle,
} from "lucide-react";

export default function Contacto() {
    return (
        <>
            <div className="w-full p-1">
                <Tittle>Contáctanos</Tittle>
                <p className="text-center">
                    Estamos aquí para resolver tus dudas y acompañarte en tu
                    proceso de inscripción.
                </p>
            </div>
            <div className="p-5 flex flex-col md:flex-row gap-5">
                <div className="w-ful md:w-1/2 bg-white border-2 border-gray-300 p-5 shadow-lg-lg h-full">
                    <form action="#">
                        <legend className="text-3xl font-bold">
                            Envianos un mensaje
                        </legend>
                        <p className="text-gray-800 text-sm">
                            Completa el formulario y nos pondremos en contacto
                            lo antes posible
                        </p>
                        <div className="flex flex-col md:flex-row gap-5 mt-3">
                            <div>
                                <label
                                    htmlFor="nombre"
                                    className="text-sm text-gray-400 w-full"
                                >
                                    Nombre Completo
                                </label>
                                <input
                                    type="text"
                                    className="p-2 rounded w-full bg-gray-700 text-white"
                                    id="nombre"
                                    placeholder="Tu Nombre"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="tel"
                                    className="text-sm text-gray-400 w-full"
                                >
                                    Número de Teléfono
                                </label>
                                <input
                                    type="tel"
                                    className="p-2 rounded w-full bg-gray-700 text-white"
                                    id="tel"
                                    placeholder="123-456-7890"
                                />
                            </div>
                        </div>
                        <div className="mt-3">
                            <label
                                htmlFor="email"
                                className="text-sm text-gray-400 w-full"
                            >
                                Correo Electrónico
                            </label>
                            <input
                                type="email"
                                className="p-2 rounded w-full bg-gray-700 text-white"
                                id="email"
                                placeholder="correo@correo.com"
                            />
                        </div>
                        <div className="mt-3">
                            <label
                                htmlFor="email"
                                className="text-sm text-gray-400 w-full"
                            >
                                Asunto
                            </label>
                            <select
                                name="asunto"
                                id="asunto"
                                className="p-2 rounded w-full bg-gray-700 text-white"
                            >
                                <option value="0" disabled selected>
                                    -- Seleccione --
                                </option>
                                <option value="1">Inscripciones</option>
                                <option value="1">Pagos</option>
                                <option value="1">Programa de Estudios</option>
                                <option value="1">Visita</option>
                            </select>
                        </div>
                        <div className="mt-3">
                            <label
                                htmlFor="email"
                                className="text-sm text-gray-400 w-full"
                            >
                                Mensaje
                            </label>
                            <textarea
                                name="mensaje"
                                id="mensaje"
                                className="p-1 bg-gray-700 w-full h-32 rounded"
                            ></textarea>
                        </div>
                    </form>
                </div>
                <div className="w-ful md:w-1/2">
                    <div className="bg-white p-5 border-2 border-gray-300 shadow-lg">
                        <div className="flex gap-3 items-center">
                            <Phone className="w-12 h-12" />
                            <h1 className="text-3xl font-bold">
                                Información de Contácto
                            </h1>
                        </div>
                        <div className="w-full h-[2px] my-3 bg-black"></div>
                        <div className="flex gap-5 mt-5">
                            <MapPin className="w-10 h-10" />
                            <div>
                                <h1 className="text-gray-800 uppercase text-xl font-bold">
                                    Dirección
                                </h1>
                                <p className="text-sm">Calle Industria #4</p>
                                <p className="text-sm">
                                    Santa Ana Xalmimilulco
                                </p>
                                <p className="text-sm">
                                    Huejotzingo. Puebla, México.
                                </p>
                            </div>
                        </div>
                        <div className="w-full h-[2px] my-3 bg-black"></div>
                        <div className="flex gap-5 mt-5">
                            <PhoneCall className="w-10 h-10" />
                            <div>
                                <h1 className="text-gray-800 uppercase text-xl font-bold">
                                    Teléfonos
                                </h1>
                                <p className="text-sm">221 222 8893</p>
                                <p className="text-sm">223 487 3376</p>
                            </div>
                        </div>
                        <div className="w-full h-[2px] my-3 bg-black"></div>
                        <div className="flex gap-5 mt-5">
                            <Mail className="w-10 h-10" />
                            <div>
                                <h1 className="text-gray-800 uppercase text-xl font-bold">
                                    Email
                                </h1>
                                <p className="text-sm">informes@irm.com</p>
                                <p className="text-sm">
                                    intitutorealdemexico@ac.com.mx
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-red-300 p-5 border-4 border-red-500 mt-5 shadow-lg">
                        <div className="flex gap-3 items-center">
                            <Clock className="w-12 h-12 text-gray-900" />
                            <h1 className="text-3xl font-bold text-black">
                                Horarios de Atención
                            </h1>
                        </div>
                        <div class="w-full mt-5">
                            <table class="w-full border border-black text-sm">
                                <tbody>
                                    <tr class="bg-gray-200 border-b border-black">
                                        <td class="px-4 py-2 font-semibold border-r border-black md:text-xl">
                                            Lunes a Viernes
                                        </td>
                                        <td class="px-4 py-2 md:text-xl">
                                            7:00 AM - 3:00 PM
                                        </td>
                                    </tr>

                                    <tr class="bg-gray-200 border-b border-black">
                                        <td class="px-4 py-2 font-semibold border-r border-black md:text-xl">
                                            Sábados
                                        </td>
                                        <td class="px-4 py-2 md:text-xl">
                                            9:00 AM - 1:00 PM
                                        </td>
                                    </tr>

                                    <tr class="bg-gray-200">
                                        <td class="px-4 py-2 font-semibold border-r border-black md:text-xl">
                                            Domingos
                                        </td>
                                        <td class="px-4 py-2 md:text-xl">
                                            Cerrado
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="bg-black p-5 border-4 border-gray-700 mt-5 shadow-lg">
                        <div className="flex gap-3 items-center text-white">
                            <Globe className="w-12 h-12 text-blue-400" />
                            <h1 className="text-3xl font-bold ">
                                Sigenos en Redes Sociales
                            </h1>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 mt-5 gap-5">
                            <a
                                href="#"
                                className="flex justify-center w-full rounded bg-blue-600 text-white hover:bg-blue-700 transition 
                                    p-5 hover:-translate-y-1"
                            >
                                <div className="flex gap-1 items-center">
                                    <Facebook className="w-8 h-8" />
                                    <p className="font-bold text-3xl">
                                        Facebook
                                    </p>
                                </div>
                            </a>
                            <a
                                href="#"
                                className="flex justify-center w-full rounded bg-pink-600 text-white hover:bg-pink-700 transition 
                                    p-5 hover:-translate-y-1"
                            >
                                <div className="flex gap-1 items-center">
                                    <Instagram className="w-8 h-8" />
                                    <p className="font-bold text-3xl">
                                        Instagram
                                    </p>
                                </div>
                            </a>
                            <a
                                href="#"
                                className="flex justify-center w-full rounded bg-red-600 text-white hover:bg-red-700 transition 
                                    p-5 hover:-translate-y-1"
                            >
                                <div className="flex gap-1 items-center">
                                    <Youtube className="w-8 h-8" />
                                    <p className="font-bold text-3xl">
                                        YouTube
                                    </p>
                                </div>
                            </a>
                            <a
                                href="#"
                                className="flex justify-center w-full rounded bg-blue-400 text-white hover:bg-blue-500 transition 
                                    p-5 hover:-translate-y-1"
                            >
                                <div className="flex gap-1 items-center">
                                    <Twitter className="w-8 h-8" />
                                    <p className="font-bold text-3xl">
                                        Twitter
                                    </p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
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
            <div className="py-3 px-3 md:px-44">
                <div className="bg-white border-2 border-gray-400 p-5">
                    <h1 className="text-center font-bold text-3xl">
                        Preguntas Frecuentes
                    </h1>
                    <section className="max-w-4xl mx-auto bg-gray-100 p-6 rounded-lg mt-5">
                        {/* Pregunta 1 */}
                        <div className="border-b border-gray-300 pb-4 mb-6">
                            <div className="flex items-start gap-3">
                                <HelpCircle className="text-pink-500 w-5 h-5 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-gray-800">
                                        ¿Cuál es el proceso de inscripción?
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                                        El proceso incluye: 1) Llenar solicitud
                                        en línea o presencial, 2) Entrevista con
                                        dirección, 3) Examen de admisión (para
                                        grados superiores), 4) Entrega de
                                        documentación, 5) Pago de inscripción.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Pregunta 2 */}
                        <div className="border-b border-gray-300 pb-4 mb-6">
                            <div className="flex items-start gap-3">
                                <HelpCircle className="text-pink-500 w-5 h-5 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-gray-800">
                                        ¿Qué documentos necesito para la
                                        inscripción?
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                                        Acta de nacimiento original y 2 copias,
                                        CURP, boleta de calificaciones del grado
                                        anterior (2 copias), certificado médico
                                        reciente, comprobante de domicilio, 6
                                        fotografías tamaño infantil, carta de
                                        buena conducta.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Pregunta 3 */}
                        <div className="border-b border-gray-300 pb-4 mb-6">
                            <div className="flex items-start gap-3">
                                <HelpCircle className="text-pink-500 w-5 h-5 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-gray-800">
                                        ¿Ofrecen programa bilingüe?
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                                        Sí, contamos con programa bilingüe
                                        certificado desde primer grado. Los
                                        alumnos reciben 10 horas semanales de
                                        inglés con metodología internacional.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Pregunta 4 */}
                        <div className="border-b border-gray-300 pb-4 mb-6">
                            <div className="flex items-start gap-3">
                                <HelpCircle className="text-pink-500 w-5 h-5 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-gray-800">
                                        ¿Cuáles son las formas de pago?
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                                        Aceptamos pago en efectivo,
                                        transferencia bancaria y tarjeta de
                                        débito/crédito. Ofrecemos opciones de
                                        pago mensual, trimestral y anual con
                                        descuentos por pronto pago.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

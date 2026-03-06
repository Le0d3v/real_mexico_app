import React from "react";

export default function AvisoPrivacidad() {
    const sections = [
        {
            title: "1. Identidad y Domicilio del Responsable",
            content: `La institución educativa es responsable del tratamiento de los datos personales recabados de alumnos, padres de familia y tutores. Esta información es utilizada exclusivamente para fines académicos, administrativos y de comunicación institucional.`,
        },
        {
            title: "2. Datos Personales Recabados",
            content: `Para la prestación del servicio educativo se podrán recabar datos personales como nombre completo, domicilio, teléfonos de contacto, correo electrónico, información académica del alumno y documentación oficial requerida por autoridades educativas.`,
        },
        {
            title: "3. Finalidad del Tratamiento de Datos",
            content: `Los datos personales se utilizan para gestionar procesos de inscripción, control escolar, comunicación institucional, emisión de documentación académica y cumplimiento de obligaciones legales ante autoridades educativas.`,
        },
        {
            title: "4. Protección de la Información",
            content: `La institución implementa medidas administrativas, técnicas y organizativas para proteger los datos personales contra daño, pérdida, alteración, destrucción o acceso no autorizado.`,
        },
        {
            title: "5. Transferencia de Datos",
            content: `Los datos personales podrán ser compartidos con autoridades educativas o instituciones gubernamentales cuando sea requerido para cumplir con obligaciones legales o administrativas relacionadas con el sistema educativo.`,
        },
        {
            title: "6. Derechos ARCO",
            content: `Los titulares de los datos personales tienen derecho a Acceder, Rectificar, Cancelar u Oponerse al tratamiento de sus datos personales. Para ejercer estos derechos deberán presentar una solicitud formal ante la administración escolar.`,
        },
        {
            title: "7. Modificaciones al Aviso de Privacidad",
            content: `La institución podrá actualizar o modificar este aviso de privacidad cuando sea necesario para cumplir con cambios normativos o mejoras en sus políticas institucionales.`,
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* HERO */}

            <div className="bg-black text-white py-16 px-6">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Aviso de Privacidad
                    </h1>

                    <p className="text-lg text-gray-300 max-w-3xl">
                        Este aviso informa cómo se recopilan, utilizan y
                        protegen los datos personales proporcionados por
                        alumnos, padres de familia y tutores dentro de la
                        institución.
                    </p>

                    <div className="mt-6 h-1 w-32 bg-yellow-400"></div>
                </div>
            </div>

            {/* CONTENIDO PRINCIPAL */}

            <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">
                {/* TABLA DE CONTENIDO */}

                <aside className="md:col-span-1">
                    <div className="sticky top-35 bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm">
                        <h3 className="font-bold text-black mb-4">Contenido</h3>

                        <ul className="space-y-3 text-sm">
                            {sections.map((s, i) => (
                                <li key={i}>
                                    <a
                                        href={`#section${i}`}
                                        className="text-gray-700 hover:text-red-600 transition"
                                    >
                                        {s.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* SECCIONES */}

                <main className="md:col-span-3 space-y-12">
                    {sections.map((s, i) => (
                        <section
                            key={i}
                            id={`section${i}`}
                            className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-md transition"
                        >
                            <h2 className="text-2xl font-semibold text-black mb-4 flex items-center">
                                <span className="w-3 h-3 bg-red-600 rounded-full mr-3"></span>

                                {s.title}
                            </h2>

                            <p className="text-gray-700 leading-relaxed">
                                {s.content}
                            </p>
                        </section>
                    ))}

                    <div className="flex w-full justify-end">
                        <a
                            className="bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-xl font-semibold shadow-lg text-white cursor-pointer hover:-translate-y-1"
                            href="/docs/Aviso_de_Privacidad.pdf"
                            download
                        >
                            Descargar Documento PDF
                        </a>
                    </div>

                    <div className="bg-yellow-100 border-l-4 border-yellow-500 p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">
                            Aviso Importante
                        </h3>

                        <p className="text-gray-800">
                            Al proporcionar información personal a la
                            institución, los padres o tutores aceptan el
                            tratamiento de los datos conforme a lo establecido
                            en el presente aviso de privacidad.
                        </p>
                    </div>
                </main>
            </div>
        </div>
    );
}

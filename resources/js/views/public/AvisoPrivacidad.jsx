import { avisosPrivacidad } from "../../helpers/data";

export default function AvisoPrivacidad() {
    return (
        <div className="min-h-screen bg-white">
            {/* HERO */}

            <div className="bg-black/90 text-white py-16 px-6">
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
                    <div className="sticky top-35 bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm hover:border-red-300">
                        <h3 className="font-bold text-black mb-4 text-lg">
                            Contenido
                        </h3>

                        <ul className="space-y-3 text-sm">
                            {avisosPrivacidad.map((s, i) => (
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
                    {avisosPrivacidad.map((s, i) => (
                        <section
                            key={i}
                            id={`section${i}`}
                            className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-md transition hover:border-red-300"
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

                    <div className="flex w-full md:justify-end">
                        <a
                            className="bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-xl font-semibold shadow-lg text-white cursor-pointer hover:-translate-y-1 text-center w-full md:w-auto"
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

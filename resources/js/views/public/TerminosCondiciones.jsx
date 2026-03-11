import { terminosCondiciones } from "../../helpers/data";

export default function TerminosCondiciones() {
    return (
        <div className="min-h-screen bg-white">
            {/* HERO */}
            <div className="bg-black/90 text-white py-16 px-6">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Términos y Condiciones
                    </h1>

                    <p className="text-lg text-gray-300 max-w-3xl">
                        Este documento establece las condiciones de uso de los
                        servicios educativos, derechos y responsabilidades de la
                        comunidad escolar. Su objetivo es garantizar
                        transparencia y un entorno educativo adecuado para todos
                        los estudiantes.
                    </p>

                    <div className="mt-6 h-1 w-32 bg-yellow-400"></div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">
                <aside className="md:col-span-1">
                    <div className="sticky top-35 bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm hover:border-red-300">
                        <h3 className="font-bold text-black text-lg mb-4">
                            Contenido
                        </h3>

                        <ul className="space-y-3 text-sm">
                            {terminosCondiciones.map((s, i) => (
                                <li key={i}>
                                    <a
                                        href={`#section${s.id - 1}`}
                                        className="text-gray-700 hover:text-red-600 transition"
                                    >
                                        {s.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                <main className="md:col-span-3 space-y-12">
                    {terminosCondiciones.map((s, i) => (
                        <section
                            key={i}
                            id={`section${s.id}`}
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
                            className="bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-xl font-semibold shadow-lg text-white cursor-pointer hover:-translate-y-1 w-full md:w-auto text-center"
                            href="/docs/Terminos_y_Condiciones.pdf"
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
                            La inscripción o permanencia del alumno en la
                            institución implica la aceptación de los presentes
                            términos y condiciones, así como el compromiso de
                            respetar las normas establecidas por la institución
                            y las autoridades educativas correspondientes.
                        </p>
                    </div>
                </main>
            </div>
        </div>
    );
}

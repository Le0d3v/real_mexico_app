import React from "react";
import Tittle from "./../components/Tittle";
export default function Estudiantes() {
    return (
        <>
            <Tittle>Nuestros Alumnos</Tittle>
            <div className="flex justify-center px-22 my-3">
                <div className="w-auto bg-gray-100 shadow-3xl rounded">
                    <img
                        src="/img/alumnos.png"
                        alt="imagen-Alumnos className="
                        className="w-full"
                    />
                    <div className="p-3">
                        <Tittle>
                            Formamos Alumnos preparados para El Futuro
                        </Tittle>
                        <p className="mt-3">
                            Formamos estudiantes con pensamiento crítico,
                            valores sólidos y competencias académicas alineadas
                            a los desafíos del siglo XXI. Nuestro modelo
                            educativo integra el desarrollo intelectual,
                            emocional y social, fomentando la autonomía, la
                            creatividad y la capacidad de resolver problemas
                            reales. A través de metodologías activas, docentes
                            certificados y el uso estratégico de la tecnología,
                            impulsamos un aprendizaje significativo que prepara
                            a nuestros alumnos para adaptarse, liderar y
                            trascender en un entorno global en constante
                            evolución. Aquí no solo educamos para el presente:
                            construimos bases firmes para el futuro
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-5">
                <Tittle>Adicionales</Tittle>
                <div className="w-full bg-black flex gap-5 text-white">
                    <img
                        src="/img/computacion.jpg"
                        alt="imagen-adicional"
                        className="w-1/2"
                    />
                    <div className="w-1/2 p-5">
                        <h1 className="text-center text-3xl font-bold">
                            Talleres Computación
                        </h1>
                        <p className="mt-3 text-justify">
                            Nuestros talleres de computación brindan a los
                            alumnos las competencias digitales fundamentales
                            para desenvolverse con seguridad y criterio en
                            entornos tecnológicos. Mediante un enfoque práctico
                            y guiado, los estudiantes aprenden el uso
                            responsable de la tecnología, el manejo básico de
                            software educativo y la comprensión inicial de
                            herramientas digitales. Estos talleres fortalecen el
                            pensamiento lógico, la resolución de problemas y la
                            alfabetización digital desde edades tempranas,
                            preparando a los alumnos para interactuar de manera
                            eficiente con la tecnología como un recurso de
                            aprendizaje, creación y comunicación en su formación
                            académica futura.
                        </p>
                    </div>
                </div>
                <div className="w-full bg-red-600 text-white flex gap-5">
                    <div className="w-1/2 p-5">
                        <h1 className="text-center text-3xl font-bold">
                            Clases de Inglés
                        </h1>
                        <p className="mt-3 text-justify">
                            Nuestras clases de inglés en nivel primaria
                            desarrollan habilidades comunicativas esenciales en
                            un segundo idioma, mediante un enfoque dinámico y
                            contextualizado. Los alumnos adquieren vocabulario,
                            pronunciación y estructuras básicas que les permiten
                            comprender y expresarse de forma progresiva y
                            natural. La enseñanza del inglés fortalece la
                            memoria, la atención y la confianza al comunicarse,
                            al tiempo que amplía la visión cultural de los
                            estudiantes. Este aprendizaje temprano sienta bases
                            sólidas para un dominio futuro del idioma,
                            preparándolos para interactuar con seguridad en un
                            entorno académico y globalizado.
                        </p>
                    </div>
                    <img
                        src="/img/ingles.jpg"
                        alt="imagen-adicional"
                        className="w-1/2"
                    />
                </div>
                <div className="w-full bg-yellow-500 text-white flex gap-5">
                    <img
                        src="/img/musica.jpg"
                        alt="imagen-adicional"
                        className="w-1/2"
                    />
                    <div className="w-1/2 p-5">
                        <h1 className="text-center text-3xl font-bold">
                            Clases de Música
                        </h1>
                        <p className="mt-3 text-justify">
                            Nuestras clases de música en nivel primaria
                            promueven el desarrollo integral del alumno mediante
                            la exploración del ritmo, la melodía y la expresión
                            sonora. A través de actividades prácticas y
                            dinámicas, los estudiantes fortalecen habilidades
                            cognitivas, auditivas y motrices, esenciales para su
                            formación académica y personal. La educación musical
                            fomenta la creatividad, la sensibilidad artística y
                            el trabajo colaborativo, al tiempo que refuerza la
                            disciplina, la atención y la memoria. Este enfoque
                            formativo permite que los alumnos descubran la
                            música como un lenguaje universal que potencia su
                            confianza y enriquece su proceso de aprendizaje.
                        </p>
                    </div>
                </div>
                <div className="w-full bg-gray100 text-black flex gap-5">
                    <div className="w-1/2 p-5">
                        <h1 className="text-center text-3xl font-bold">
                            Plataformas Digitales
                        </h1>
                        <p className="mt-3 text-justify">
                            El uso de plataformas digitales en nuestra
                            institución fortalece los procesos de enseñanza y
                            aprendizaje mediante entornos seguros, estructurados
                            y pedagógicamente diseñados. Estas herramientas
                            permiten dar seguimiento académico, acceder a
                            contenidos interactivos y reforzar el aprendizaje
                            tanto en el aula como fuera de ella. La integración
                            de plataformas digitales promueve la autonomía, la
                            responsabilidad y la comunicación efectiva entre
                            alumnos, docentes y familias. Asimismo, impulsa el
                            desarrollo de competencias digitales clave,
                            garantizando un uso ético, responsable y orientado
                            al logro de objetivos académicos
                        </p>
                    </div>
                    <img
                        src="/img/plataformas.png"
                        alt="imagen-adicional"
                        className="w-1/2"
                    />
                </div>
                <div className="my-3 programa-fondo h-96 flex justify-center items-center">
                    <div>
                        <p className="font-bold text-2xl text-white">
                            Descarga Gratis nuestro Programa de Estudios
                        </p>
                        <div className="flex justify-center mt-3">
                            <button className="p-2 bg-white rounded font-bold text-blue-400 cursor-pointer hover:bg-blue-400 hover:text-white hover:-translate-y-1 transition text-xl">
                                Descargar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

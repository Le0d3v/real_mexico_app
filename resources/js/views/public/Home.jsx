import {
    BookOpenText,
    Computer,
    MapPin,
    Phone,
    ShieldCheck,
    UserCheck,
} from "lucide-react";
import IconContainer from "./IconContainer";
import Cuadros from "./components/Cuadros";
import AnimationSection from "./components/AnimationSection";
import Map from "./components/Map";

export default function Home() {
    return (
        <div className="h-full">
            <div className="relative h-screen w-full overflow-hidden">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover"
                >
                    <source src="/video/fondo2.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/45"></div>
                <div className="relative z-10 h-full p-5 flex flex-col">
                    <div className="flex justify-center items-center md:py-10 md:px-36">
                        <div>
                            <h1 className="text-5xl md:text-7xl font-black md:w-full mb-5 text-white text-center ">
                                Formamos niños seguros, curiosos y preparados
                                para el futuro
                            </h1>
                            <div className="w-full flex justify-center mt-10 md:mt-0">
                                <div className="flex gap-2 items-center flex-col md:flex-row">
                                    <MapPin className="text-white w-10 h-10 md:w-6 md:h-6" />
                                    <p className="text-white text-sm text-center md:text-start">
                                        Calle Industria #4. Santa Ana
                                        Xalmimilulco, Huejotzingo, Puebla,
                                        México.
                                    </p>
                                </div>
                            </div>
                            <div className="w-full flex justify-center mt-5">
                                <div className="flex gap-2 items-center flex-col md:flex-row">
                                    <Phone className="text-white w-8 h-8 md:w-6 md:h-6" />
                                    <p className="text-white text-sm text-center md:text-start">
                                        221-222-8893
                                    </p>
                                </div>
                            </div>

                            <div className="mt-10 flex justify-center">
                                <a
                                    href="#"
                                    className="
                                        px-4 py-2 rounded bg-blue-500 text-white font-bold text-2xl
                                        transition-all duration-300 ease-out
                                        hover:bg-blue-600
                                        hover:-translate-y-2 hover:shadow-xl
                                        animate-float pause-on-hover"
                                >
                                    Solicitar Informes
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative py-20 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            ¿Por Qué{" "}
                            <span className="text-yellow-500">Elegirnos?</span>
                        </h2>
                        <p className="mt-4 text-gray-600 text-lg">
                            Formamos alumnos con valores, conocimiento y
                            herramientas para un futuro sólido, en un entorno
                            seguro y profesional.
                        </p>
                    </div>
                    
                    <AnimationSection>
                        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <IconContainer
                                icon={ShieldCheck}
                                title="Instalaciones Seguras"
                            >
                                Contamos con espacios diseñados bajo criterios
                                de seguridad y supervisión constante,
                                garantizando entornos adecuados para el
                                desarrollo integral.
                            </IconContainer>

                            <IconContainer
                                icon={UserCheck}
                                title="Personal Certificado"
                            >
                                Nuestro equipo cuenta con formación académica y
                                certificaciones que respaldan una educación
                                profesional y comprometida.
                            </IconContainer>

                            <IconContainer
                                icon={BookOpenText}
                                title="Métodos Constructivistas"
                            >
                                Aplicamos metodologías activas que promueven
                                pensamiento crítico y aprendizaje significativo.
                            </IconContainer>

                            <IconContainer
                                icon={Computer}
                                title="Uso de Tecnología"
                            >
                                Integramos herramientas digitales como apoyo
                                pedagógico, fomentando habilidades académicas y
                                tecnológicas.
                            </IconContainer>
                        </div>
                    </AnimationSection>
                </div>
            </div>

            <AnimationSection>
                <Cuadros />
            </AnimationSection>
            <div className="">
                <AnimationSection>
                    <Map />
                </AnimationSection>
            </div>
        </div>
    );
}
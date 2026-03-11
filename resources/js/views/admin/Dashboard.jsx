import Tittle from "../components/Tittle";
import useStudent from "../../hooks/useStudent";
import useTutor from "../../hooks/useTutor";
import Loader from "../components/Loader";
import { useState } from "react";
import Modal from "./components/Modal";
import CrearTutor from "./tutores/CrearTutor";
import PostForm from "./noticias/PostForm";
import useCicloEscolar from "../../hooks/useCicloEscolar";
import CrearPago from "./pagos/CrearPago";
import { formatCurrency } from "../../helpers/helpers";

import {
    CirclePlus,
    Users,
    UserCheck,
    AlertTriangle,
    DollarSign,
    TrendingUp,
    GraduationCap,
    BellRing,
    CreditCard,
    UserPlus,
    Newspaper,
} from "lucide-react";
import CreateStudent from "./estudiantes/CreateStudent";
import useColegiatura from "../../hooks/useColegiatura";
import GraficoGrados from "./components/GraficoGrados";

export default function Dashboard() {
    const { estudiantes } = useStudent();
    const { tutores } = useTutor();
    const { cicloEscolar, isLoading } = useCicloEscolar();
    const { colegiaturasMesActual } = useColegiatura();

    const [noticiaModal, setNoticiaModal] = useState(false);
    const [tutorModal, setTutorModal] = useState(false);
    const [pagoModal, setPagoModal] = useState(false);
    const [estudianteModal, setEstudianteModal] = useState(false);

    const totalMetaMes = colegiaturasMesActual.reduce(
        (acc, c) => acc + Number(c.monto),
        0,
    );

    const totalRecaudadoMes = colegiaturasMesActual
        .filter((c) => c.estado === "pagado")
        .reduce((acc, c) => acc + Number(c.monto), 0);

    const porcentajeRecaudado =
        totalMetaMes > 0
            ? Math.round((totalRecaudadoMes / totalMetaMes) * 100)
            : 0;

    const totalEstudiantes = estudiantes.length;

    if (isLoading) return <Loader />;

    return (
        <>
            <div className="bg-slate-100 min-h-screen">
                <Tittle>Panel de Administración</Tittle>
                <p className="text-center mt-5 text-gray-500 text-lg">
                    Ciclo Escolar:{" "}
                    <span className="text-gray-700 font-semibold">
                        {cicloEscolar[0].nombre}
                    </span>
                </p>
                {/* KPIs */}
                <div className="grid md:grid-cols-4 gap-6 mt-10 mb-10" id="driver_kpis">
                    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Estudiantes Activos
                                </p>
                                <h2 className="text-3xl font-bold text-slate-800 mt-2">
                                    {estudiantes.length}
                                </h2>
                            </div>
                            <Users className="w-10 h-10 text-slate-400" />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Tutores Registrados
                                </p>
                                <h2 className="text-3xl font-bold text-slate-800 mt-2">
                                    {tutores.length}
                                </h2>
                            </div>
                            <UserCheck className="w-10 h-10 text-yellow-500" />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Pagos Vencidos
                                </p>
                                <h2 className="text-3xl font-bold text-red-600 mt-2">
                                    17
                                </h2>
                            </div>
                            <AlertTriangle className="w-10 h-10 text-red-500" />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Pendientes del Mes
                                </p>
                                <h2 className="text-3xl font-bold text-emerald-600 mt-2">
                                    {formatCurrency(
                                        totalMetaMes - totalRecaudadoMes,
                                    )}
                                </h2>
                            </div>
                            <DollarSign className="w-10 h-10 text-emerald-500" />
                        </div>
                    </div>
                </div>

                {/* Estado financiero */}
                <div className="bg-white p-8 rounded-2xl shadow-sm mb-10" id="driver_estado-financiero">
                    <div className="flex items-center gap-3 mb-6">
                        <TrendingUp className="w-6 h-6 text-emerald-600" />
                        <h3 className="text-xl font-semibold text-slate-800">
                            Estado Financiero del Mes
                        </h3>
                    </div>

                    <div className="w-full bg-slate-200 rounded-full h-8 overflow-hidden relative">
                        <div
                            className="bg-emerald-500 h-8 transition-all"
                            style={{ width: `${porcentajeRecaudado}%` }}
                        />

                        <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-slate-700">

                        
                            {porcentajeRecaudado}% Recaudado
                        </div>
                    </div>

                    <div className="flex justify-between mt-4 text-sm text-slate-600">
                        <span>
                            Recaudado: {formatCurrency(totalRecaudadoMes)}
                        </span>
                        <span>
                            Meta mensual: {formatCurrency(totalMetaMes)}
                        </span>
                    </div>
                </div>

                <div className="mb-10" id="driver_grafico-alumnos">
                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                        <div className="flex items-center gap-3 mb-5">
                            <GraduationCap className="w-6 h-6 text-slate-600" />
                            <h3 className="text-lg font-semibold text-slate-800">
                                Distribución de Alumnos por Grado
                            </h3>
                        </div>

                        <div className="h-72">
                            <GraficoGrados />
                        </div>
                    </div>
                </div>

                {/* Accesos rápidos */}
                <div id="driver_accesos-rapidos">
                    <h3 className="text-xl font-semibold text-slate-800 mb-5">
                        Accesos Rápidos
                    </h3>

                    <div className="grid md:grid-cols-4 gap-4">
                        <button
                            className="flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-xl shadow-sm hover:shadow-md transition hover:-translate-y-1 cursor-pointer"
                            onClick={() => setPagoModal(true)}
                        >
                            <CreditCard size={18} />
                            Registrar Pago
                        </button>

                        <button
                            className="flex items-center justify-center gap-2 bg-yellow-500 text-black py-4 rounded-xl shadow-sm hover:shadow-md transition hover:-translate-y-1 cursor-pointer"
                            onClick={() => setEstudianteModal(true)}
                        >
                            <UserPlus size={18} />
                            Nuevo Estudiante
                        </button>

                        <button
                            onClick={() => setTutorModal(true)}
                            className="flex items-center justify-center gap-2 bg-red-600 text-white py-4 rounded-xl shadow-sm hover:shadow-md transition hover:-translate-y-1 cursor-pointer"
                        >
                            <UserPlus size={18} />
                            Nuevo Tutor
                        </button>

                        <button
                            onClick={() => setNoticiaModal(true)}
                            className="flex items-center justify-center gap-2 bg-slate-200 text-slate-800 py-4 rounded-xl shadow-sm hover:shadow-md transition hover:-translate-y-1 cursor-pointer"
                        >
                            <Newspaper size={18} />
                            Nueva Noticia
                        </button>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={noticiaModal}
                icon={<CirclePlus className="w-12 h-12" />}
                onClose={() => {
                    setNoticiaModal(false);
                }}
                size="lg"
                title={"Crear Nueva Publicación"}
            >
                {" "}
                <PostForm
                    post={null}
                    onSuccess={() => {
                        setNoticiaModal(false);
                    }}
                />{" "}
            </Modal>{" "}
            <Modal
                isOpen={tutorModal}
                icon={<CirclePlus className="w-12 h-12" />}
                onClose={() => {
                    setTutorModal(false);
                }}
                size="full"
                title="Registrar un Nuevo Tutor"
            >
                {" "}
                <CrearTutor onClose={() => setTutorModal(false)} />{" "}
            </Modal>
            <Modal
                isOpen={pagoModal}
                icon={<CirclePlus className="w-12 h-12" />}
                onClose={() => {
                    setPagoModal(false);
                }}
                size="full"
                title="Registrar un Nuevo Pago"
            >
                {" "}
                <CrearPago onClose={() => setPagoModal(false)} />{" "}
            </Modal>
            <Modal
                isOpen={estudianteModal}
                icon={<CirclePlus className="w-12 h-12" />}
                onClose={() => {
                    setEstudianteModal(false);
                }}
                size="full"
                title="Registrar un Nuevo Estudiante"
            >
                <CreateStudent onClose={() => setPagoModal(false)} />
            </Modal>
        </>
    );
}

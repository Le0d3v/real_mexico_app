import {
    Home,
    Globe,
    Settings,
    User,
    Users,
    CircleDollarSign,
    Calendar,
} from "lucide-react";
import NavItem from "./NavItem";
import useIRM from "../../../hooks/useIRM";

export default function Navigation({ index, closeMenu, setPage, page }) {
    const { setTitulo } = useIRM();

    return (
        <nav className="px-2" id="navegacion">
            <div className="hidden lg:block mt-1 mb-1">
                <p className="text-sm text-white text-center transition-colors mt-3">
                    Navegación
                </p>
            </div>

            {index == 1 ? (
                <div className="flex flex-col" id="driver_navegacion-enlaces">
                    <NavItem
                        page={page}
                        setPage={setPage}
                        index={0}
                        icon={Home}
                        fn={() => setTitulo("Instituto Real De México A.C.")}
                    >
                        Inicio
                    </NavItem>
                    <NavItem
                        page={page}
                        setPage={setPage}
                        index={1}
                        icon={Calendar}
                        fn={() => setTitulo("Colegiaturas")}
                    >
                        Colegiaturas
                    </NavItem>
                    <NavItem
                        page={page}
                        setPage={setPage}
                        index={2}
                        icon={CircleDollarSign}
                        fn={() => setTitulo("Pagos")}
                    >
                        Pagos
                    </NavItem>
                    <NavItem
                        page={page}
                        setPage={setPage}
                        index={3}
                        icon={Users}
                        fn={() => setTitulo("Estudiantes")}
                    >
                        Estudiantes
                    </NavItem>
                    <NavItem
                        page={page}
                        setPage={setPage}
                        index={4}
                        icon={User}
                        fn={() => setTitulo("Tutores")}
                    >
                        Tutores
                    </NavItem>
                    <NavItem
                        page={page}
                        setPage={setPage}
                        index={5}
                        icon={Globe}
                        fn={() => setTitulo("Publicaciones")}
                    >
                        Publicaciones
                    </NavItem>
                    <NavItem
                        page={page}
                        setPage={setPage}
                        index={6}
                        icon={Settings}
                        fn={() => setTitulo("Configuración")}
                    >
                        Ajustes
                    </NavItem>
                </div>
            ) : (
                <></>
            )}
        </nav>
    );
}

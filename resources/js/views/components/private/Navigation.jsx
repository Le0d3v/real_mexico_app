import {
    Home,
    Globe,
    Settings,
    User,
    Users,
    CircleDollarSign,
} from "lucide-react";
import NavItem from "./NavItem";
import useIRM from "../../../hooks/useIRM";

export default function Navigation({ index, closeMenu, setPage, page }) {
    const { setTitulo } = useIRM();
    return (
        <nav className="md:mt-12 px-2" id="navegacion">
            <div className="hidden lg:block mt-1 mb-3">
                <p className="text-sm text-white text-center transition-colors mt-3">
                    Navegación
                </p>
            </div>

            {index == 1 ? (
                <div className="flex flex-col">
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
                        icon={CircleDollarSign}
                        fn={() => setTitulo("Colegiaturas")}
                    >
                        Colegiaturas
                    </NavItem>
                    <NavItem
                        page={page}
                        setPage={setPage}
                        index={2}
                        icon={Users}
                        fn={() => setTitulo("Estudiantes")}
                    >
                        Estudiantes
                    </NavItem>
                    <NavItem
                        page={page}
                        setPage={setPage}
                        index={3}
                        icon={User}
                        fn={() => setTitulo("Tutores")}
                    >
                        Tutores
                    </NavItem>
                    <NavItem
                        page={page}
                        setPage={setPage}
                        index={4}
                        icon={Globe}
                        fn={() => setTitulo("Publicaciones")}
                    >
                        Publicaciones
                    </NavItem>
                    <NavItem
                        page={page}
                        setPage={setPage}
                        index={5}
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

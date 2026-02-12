import { NavLink } from "react-router-dom";
import {
    Home,
    Globe,
    Settings,
    User,
    Users,
    CircleDollarSign,
} from "lucide-react";
import NavItem from "./NavItem";
import useAuth from "../../../hooks/useAuth";

export default function Navigation({ index, closeMenu, setPage, page }) {
    return (
        <nav className="md:mt-15 px-2" id="navegacion">
            <div className="hidden lg:block mt-5">
                <p className="text-sm text-white text-center transition-colors mt-7">
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
                    >
                        Inicio
                    </NavItem>
                    <NavItem
                        page={page}
                        setPage={setPage}
                        index={1}
                        icon={CircleDollarSign}
                    >
                        Colegiaturas
                    </NavItem>
                    <NavItem
                        page={page}
                        setPage={setPage}
                        index={2}
                        icon={Users}
                    >
                        Estudiantes
                    </NavItem>
                    <NavItem
                        page={page}
                        setPage={setPage}
                        index={3}
                        icon={User}
                    >
                        Tutores
                    </NavItem>
                    <NavItem
                        page={page}
                        setPage={setPage}
                        index={4}
                        icon={Globe}
                    >
                        Noticias
                    </NavItem>
                    <NavItem
                        page={page}
                        setPage={setPage}
                        index={5}
                        icon={Settings}
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

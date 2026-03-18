import { School, Menu, Bell, LogOut, Video } from "lucide-react";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import useAuth from "../../../hooks/useAuth";
import useIRM from "../../../hooks/useIRM";

export default function Header({ toggleMenu }) {
    const { logout } = useAuth({ middleware: "auth" });
    const [cargando, setCargando] = useState(false);
    const { titulo } = useIRM();

    const hanldeClicLogout = () => {
        setCargando(true);
        logout();
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="bg-black text-white shadow-md border-b border-yellow-500/40">
            <div className="flex items-center justify-between h-18 md:px-8 px-5">
                <div className="flex items-center justify-between gap-4 w-full">
                    <h1 className="text-xl md:text-3xl font-bold tracking-wide text-yellow-400">
                        {titulo}
                    </h1>
                    <button className="md:hidden" onClick={toggleMenu}>
                        <Menu className="w-8 h-8" />
                    </button>
                </div>

                <button
                    className="md:flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 px-5 py-2 rounded-lg font-semibold transition duration-200 disabled:opacity-70 cursor-pointer w-52 justify-center hidden"
                    disabled={cargando}
                    onClick={hanldeClicLogout}
                    id="driver_cerrar-sesion"
                >
                    {cargando ? (
                        <ClipLoader size={19} color="white" />
                    ) : (
                        <>
                            <span>Cerrar sesión</span>
                            <LogOut className="w-4 h-4" />
                        </>
                    )}
                </button>
            </div>
        </header>
    );
}

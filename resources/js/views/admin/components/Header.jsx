import { School, Menu, Bell, LogOut, Video } from "lucide-react";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import useAuth from "../../../hooks/useAuth";
import useIRM from "../../../hooks/useIRM";

export default function Header({ index }) {
    const { logout } = useAuth({ middleware: "auth" });
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [cargando, setCargando] = useState(false);
    const { titulo } = useIRM();

    const hanldeClicLogout = () => {
        setCargando(true);
        logout();
    };

    const toggleMenu = () => {
        setIsMenuOpen((prevState) => !prevState);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="bg-black text-white shadow-md border-b border-yellow-500/40">
            <div className="flex items-center justify-between h-18 px-8">
                <div className="flex items-center gap-4">
                    <button
                        className="md:hidden text-white hover:text-yellow-400 transition"
                        onClick={toggleMenu}
                    >
                        <Menu className="w-8 h-8" />
                    </button>

                    <h1 className="text-lg md:text-3xl font-bold tracking-wide text-yellow-400">
                        {titulo}
                    </h1>
                </div>

                <button
                    className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 px-5 py-2 rounded-lg font-semibold transition duration-200 disabled:opacity-70 cursor-pointer"
                    disabled={cargando}
                    onClick={hanldeClicLogout}
                >
                    {cargando ? (
                        <ClipLoader size={18} color="white" />
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

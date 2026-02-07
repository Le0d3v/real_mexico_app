import { School, Menu, Bell, LogOut, Video } from "lucide-react";
import { useState } from "react";
import ResponsiveMenu from "./ResponsiveMenu";
import { ClipLoader } from "react-spinners";

export default function Header({ index }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [cargando, setCargando] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prevState) => !prevState);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <header
                className="bg-black/80 text-white border-b-2 border-yellow-400"
                id="header"
            >
                <div className="flex items-center justify-between h-16 px-6 flex-1">
                    <div className="flex items-center justify-between md:w-auto w-full">
                        <div className="flex gap-2 items-center">
                            <div className="block md:hidden">
                                <div className="flex gap-2 items-center">
                                    <img
                                        src="/img/logo.png"
                                        alt="imagen-logo"
                                        className="w-12"
                                    />
                                    <h1 className="text-3xl font-black">IRM</h1>
                                </div>
                            </div>
                            <h1 className="text-md md:text-2xl hidden md:block font-black">
                                Instituto Real de México A.C.
                            </h1>
                        </div>
                        <div>
                            <button
                                className="md:hidden text-black mr-4 hover:cursor-pointer"
                                onClick={toggleMenu}
                            >
                                <Menu className="w-10 h-10" />
                            </button>
                        </div>
                    </div>
                    <div className="md:flex items-center space-x-8 hidden">
                        <div className="flex gap-5 items-center"></div>
                        <div className="flex items-center">
                            <button
                                className="flex items-center justify-center gap-1 text-sm bg-yellow-500 rounded-lg text-white font-bold hover:bg-yellow-600 p-2 transition hover:-translate-y-1 cursor-pointer w-36"
                                disabled={cargando}
                                id="boton-cerrar-sesion"
                            >
                                {cargando ? (
                                    <ClipLoader
                                        color="#ffffff"
                                        size={20}
                                        className="m-0"
                                    />
                                ) : (
                                    <>
                                        <p>Cerrar Sesión</p>
                                        <LogOut className="w-5" />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            {/* Renderiza ResponsiveMenu fuera del botón */}
            <ResponsiveMenu
                isOpen={isMenuOpen}
                closeMenu={closeMenu}
                index={index}
            />
        </>
    );
}

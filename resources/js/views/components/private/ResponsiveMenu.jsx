import Navigation from "./Navigation";
import { Bell, User, LogOut, Moon, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useState } from "react";

export default function ResponsiveMenu({ isOpen, closeMenu, index }) {
    const [cargando, setCargando] = useState(false);
    const [page, setPage] = useState(0);

    return (
        <>
            <div
                className={`fixed top-0 left-0 h-full w-full bg-red-500 dark:bg-gray-900 text-white transform transition-transform duration-300 p-3 overflow-y-scroll ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex justify-end">
                    <div>
                        <button onClick={closeMenu} className="cursor-pointer">
                            <X className=" h-10 w-10" />
                        </button>
                    </div>
                </div>
                <div className="mt-3">
                    <img
                        src="/img/logo.png"
                        alt="imagen-logo"
                        className="mx-auto w-40"
                    />
                    <h1 className="text-white text-2xl font-bold text-center mt-1">
                        Instituto Real de México
                    </h1>
                </div>
                <p className="text-lg text-gray-300 mt-10">Navegación</p>
                {index == "1" ? (
                    <Navigation
                        index="1"
                        closeMenu={closeMenu ?? null}
                        setPage={setPage}
                        page={page}
                    />
                ) : (
                    <Navigation index="0" closeMenu={closeMenu ?? null} />
                )}
                <div className="flex items-center justify-center lg:justify-start p-3 rounded-lg">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-black" />
                    </div>
                    <div className="ml-3 sm:block md:hidden lg:block">
                        <p>Usuario</p>
                    </div>
                </div>
                <div className="mt-5">
                    <button
                        className="flex items-center justify-center gap-1 text-sm bg-yellow-500 rounded-lg text-white font-bold hover:bg-yellow-600 p-2 transition hover:-translate-y-1 cursor-pointer w-full"
                        disabled={cargando}
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
        </>
    );
}

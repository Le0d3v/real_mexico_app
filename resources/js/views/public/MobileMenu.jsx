import { Link } from "react-router-dom";
import MobileNavLink from "./components/MobileNavLink";
import { X } from "lucide-react";
import { useEffect } from "react";
import socialLinks from "../../helpers/socialLinks";

export default function MobileMenu({ open, setOpen, page, setPage }) {
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [open]);

    return (
        <>
            <div
                className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity duration-300 ${
                    open ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
                onClick={() => setOpen(false)}
            />

            <aside
                className={`fixed top-0 right-0 h-screen w-full max-w-md
                bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a]
                text-white z-50 shadow-2xl
                transform transition-transform duration-300 ease-in-out
                flex flex-col
                ${open ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="flex justify-between items-center p-3 border-b border-yellow-400/40">
                    <div>
                        <h2 className="text-3xl font-bold text-yellow-400">
                            Navegación
                        </h2>
                        <p className="text-xs text-gray-400 mt-1">
                            Instituto Real de México A.C.
                        </p>
                    </div>

                    <button
                        onClick={() => setOpen(false)}
                        className="p-2 rounded-full hover:bg-white/10 transition"
                        aria-label="Cerrar menú"
                    >
                        <X size={26} />
                    </button>
                </div>
                <nav className="flex-1 overflow-y-auto mt-6 px-6 pb-8">
                    <ul className="flex flex-col gap-2 text-[17px]">
                        <li>
                            <MobileNavLink
                                index={0}
                                page={page}
                                setPage={setPage}
                                onClick={() => setOpen(false)}
                            >
                                Inicio
                            </MobileNavLink>
                        </li>
                        <li>
                            <MobileNavLink
                                index={1}
                                page={page}
                                setPage={setPage}
                                onClick={() => setOpen(false)}
                            >
                                Inscripciones
                            </MobileNavLink>
                        </li>
                        <li>
                            <MobileNavLink
                                index={2}
                                page={page}
                                setPage={setPage}
                                onClick={() => setOpen(false)}
                            >
                                Acerca de
                            </MobileNavLink>
                        </li>
                        <li>
                            <MobileNavLink
                                index={3}
                                page={page}
                                setPage={setPage}
                                onClick={() => setOpen(false)}
                            >
                                Alumnos
                            </MobileNavLink>
                        </li>
                        <li>
                            <MobileNavLink
                                index={4}
                                page={page}
                                setPage={setPage}
                                onClick={() => setOpen(false)}
                            >
                                Padres y Tutores
                            </MobileNavLink>
                        </li>
                        <li>
                            <MobileNavLink
                                index={5}
                                page={page}
                                setPage={setPage}
                                onClick={() => setOpen(false)}
                            >
                                Eventos y Noticias
                            </MobileNavLink>
                        </li>
                        <li>
                            <MobileNavLink
                                index={6}
                                page={page}
                                setPage={setPage}
                                onClick={() => setOpen(false)}
                            >
                                Contacto
                            </MobileNavLink>
                        </li>

                        <li className="mt-4">
                            <Link
                                to="/login"
                                className="block w-full text-center bg-yellow-400 text-black font-semibold py-4 rounded-xl shadow-lg hover:bg-yellow-300 transition-all duration-300"
                                onClick={() => setOpen(false)}
                            >
                                Iniciar Sesión
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="mt-auto p-6 border-t border-white/10">
                    <p className="text-sm text-gray-400 mb-4">
                        Síguenos en redes sociales
                    </p>

                    <div className="flex justify-between text-gray-300">
                        {socialLinks.map((link, i) => (
                            <a href={link.url} id="i">
                                {link.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </aside>
        </>
    );
}

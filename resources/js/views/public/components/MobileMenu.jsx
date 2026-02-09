import NavLink from "./NavLink";
import { X } from "lucide-react";

export default function MobileMenu({ open, setOpen, page, setPage }) {
    return (
        <>
            <div
                className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${
                    open ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
                onClick={() => setOpen(false)}
            />
            <aside
                className={`fixed top-0 right-0 h-screen w-full bg-black text-white z-50
                transform transition-transform duration-300 ease-in-out
                ${open ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="flex justify-between items-center p-5 border-b-4 border-yellow-400 bg-gray-100 text-black">
                    <span className="text-3xl font-bold tracking-wide">
                        Navegación
                    </span>
                    <button
                        onClick={() => setOpen(false)}
                        aria-label="Cerrar menú"
                    >
                        <X size={28} />
                    </button>
                </div>
                <nav className="flex flex-col items-center gap-6 mt-10 text-lg">
                    <NavLink
                        index={0}
                        page={page}
                        setPage={setPage}
                        onClick={() => setOpen(false)}
                    >
                        Inicio
                    </NavLink>
                    <NavLink
                        index={1}
                        page={page}
                        setPage={setPage}
                        onClick={() => setOpen(false)}
                    >
                        Inscripciones
                    </NavLink>
                    <NavLink
                        index={2}
                        page={page}
                        setPage={setPage}
                        onClick={() => setOpen(false)}
                    >
                        Acerca de
                    </NavLink>
                    <NavLink
                        index={3}
                        page={page}
                        setPage={setPage}
                        onClick={() => setOpen(false)}
                    >
                        Alumnos
                    </NavLink>
                    <NavLink
                        index={4}
                        page={page}
                        setPage={setPage}
                        onClick={() => setOpen(false)}
                    >
                        Padres y Tutores
                    </NavLink>
                    <NavLink
                        index={5}
                        page={page}
                        setPage={setPage}
                        onClick={() => setOpen(false)}
                    >
                        Eventos y Noticias
                    </NavLink>
                    <NavLink
                        index={6}
                        page={page}
                        setPage={setPage}
                        onClick={() => setOpen(false)}
                    >
                        Contacto
                    </NavLink>
                </nav>
            </aside>
        </>
    );
}

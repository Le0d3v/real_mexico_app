import { useState } from "react";
import NavLink from "./NavLink";
import MobileMenu from "./MobileMenu";
import { Menu } from "lucide-react";
import socialLinks from "../../helpers/socialLinks";
import { Link } from "react-router-dom";
import TikTok from "./TikTok";

export default function Header({ setPage, page }) {
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 group">
            <div className="bg-gray-100 border-b-4 border-yellow-400 px-4 md:px-5 py-2 flex justify-between items-center">
                <div className="flex items-center gap-3 md:gap-4">
                    <img
                        src="/img/logo.png"
                        alt="Logo Instituto Real de México"
                        className="w-16 md:w-24"
                    />

                    <div className="hidden sm:block">
                        <h1 className="text-black font-bold text-xl md:text-4xl leading-tight">
                            Instituto Real de México A.C.
                        </h1>
                        <p className="text-black text-xs md:text-sm">
                            Escuela Primaria Particular Incorporada a la SEP
                        </p>
                        <p className="text-black text-xs md:text-sm">
                            Clave: <span className="font-bold">21PPR0827N</span>
                        </p>
                    </div>
                </div>
                <div className="hidden md:flex gap-5">
                    {socialLinks.map((link, i) => (
                        <a href={link.url} id={i}>
                            {link.icon}
                        </a>
                    ))}
                </div>
                <button
                    onClick={() => setOpen(true)}
                    className="md:hidden text-black"
                    aria-label="Abrir menú"
                >
                    <Menu size={28} />
                </button>
            </div>

            <nav
                className="
                    hidden md:flex justify-center
                    bg-black text-white
                    overflow-hidden
                    max-h-0 opacity-0
                    group-hover:max-h-36
                    group-hover:opacity-100
                    transition-all duration-500 ease-out
                "
            >
                <div className="flex gap-10 py-3">
                    <NavLink index={0} page={page} setPage={setPage}>
                        Inicio
                    </NavLink>
                    <NavLink index={1} page={page} setPage={setPage}>
                        Inscripciones
                    </NavLink>
                    <NavLink index={2} page={page} setPage={setPage}>
                        Acerca de
                    </NavLink>
                    <NavLink index={3} page={page} setPage={setPage}>
                        Alumnos
                    </NavLink>
                    <NavLink index={4} page={page} setPage={setPage}>
                        Padres y Tutores
                    </NavLink>
                    <NavLink index={5} page={page} setPage={setPage}>
                        Eventos y Noticias
                    </NavLink>
                    <NavLink index={6} page={page} setPage={setPage}>
                        Contacto
                    </NavLink>
                    <Link
                        to={"/login"}
                        className="transition hover:cursor-pointer hover:-translate-y-1
                        hover:text-amber-400 hover:font-bold"
                    >
                        Iniciar Sesión
                    </Link>
                </div>
            </nav>

            {/* Menú móvil */}
            <MobileMenu
                open={open}
                setOpen={setOpen}
                page={page}
                setPage={setPage}
            />
        </header>
    );
}

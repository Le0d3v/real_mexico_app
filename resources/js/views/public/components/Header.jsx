import { Link } from "react-router-dom";
import NavLink from "./NavLink";
import {
    ExternalLink,
    Facebook,
    Instagram,
    School,
    Send,
    Twitter,
    User,
    Youtube,
} from "lucide-react";

export default function Header({ setPage, page }) {
    return (
        <header className="sticky top-0 z-50 shadow">
            <div className="p-10 bg-yellow-400 flex justify-between w-full h-36 items-center">
                <div className="text-4xl font-bold text-white">Educación</div>

                <div className="flex gap-3 items-center">
                    <img
                        src="/img/logo.png"
                        alt="imagen-logo"
                        className="w-28"
                    />
                    <div>
                        <h1 className="text-black font-bold text-4xl">
                            Instuto Real de México
                        </h1>
                        <p className="text-black text-sm font-bold">
                            Escuela Primaria Particular Incorporada a la SEP
                        </p>
                        <p className="text-black text-sm font-bold">
                            Clave: 21PPR0827N
                        </p>
                    </div>
                </div>

                <div>
                    <div className="flex gap-5 items-center">
                        <div className="flex gap-5">
                            <a href="/" about="blank">
                                <Facebook
                                    size={25}
                                    className="hover:text-white transition hover:-translate-y-1"
                                />
                            </a>
                            <a href="/" about="blank">
                                <Instagram
                                    size={25}
                                    className="hover:text-white transition hover:-translate-y-1"
                                />
                            </a>
                            <a href="/" about="blank">
                                <Twitter
                                    size={25}
                                    className="hover:text-white transition hover:-translate-y-1"
                                />
                            </a>
                            <a href="/" about="blank">
                                <Youtube
                                    size={25}
                                    className="hover:text-white transition hover:-translate-y-1"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full p-3 bg-black text-white">
                <div className="flex justify-center">
                    <div className="flex gap-10">
                        <NavLink index={0} page={page} setPage={setPage}>
                            Inicio
                        </NavLink>
                        <NavLink index={1} page={page} setPage={setPage}>
                            Sobre Nosotros
                        </NavLink>
                        <NavLink index={2} page={page} setPage={setPage}>
                            Inscripciones
                        </NavLink>
                        <NavLink index={2} page={page} setPage={setPage}>
                            Estudiantes
                        </NavLink>
                        <NavLink index={3} page={page} setPage={setPage}>
                            Padres / Tutores
                        </NavLink>
                        <NavLink index={3} page={page} setPage={setPage}>
                            Eventos / Noticias
                        </NavLink>
                        <NavLink index={5} page={page} setPage={setPage}>
                            Contácto
                        </NavLink>
                    </div>
                </div>
            </div>
        </header>
    );
}

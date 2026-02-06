import { Link } from "react-router-dom";
import NavLink from "./NavLink";
import { Facebook, Instagram, Twitter, MapPin, Youtube } from "lucide-react";

export default function Header({ setPage, page }) {
    return (
        <header className="sticky top-0 z-50 shadow ">
            <div className="p-5 bg-gray-100 flex justify-between items-center w-full h-32 border-b-4 border-yellow-400">
                <div className="flex gap-4 items-center">
                    <img
                        src="/img/logo.png"
                        alt="imagen-logo"
                        className="w-28"
                    />
                    <div>
                        <h1 className="text-black font-bold text-4xl">
                            Instuto Real de México A.C.
                        </h1>
                        <p className="text-black text-sm ">
                            Escuela Primaria Particular Incorporada a la SEP
                        </p>
                        <p className="text-black text-sm ">
                            Clave: <span className="font-bold">21PPR0827N</span>
                        </p>
                    </div>
                </div>

                <div className="">
                    <div className="flex gap-5 items-center">
                        <div className="flex gap-5">
                            <a href="/" about="blank">
                                <Facebook
                                    size={22}
                                    className="hover:text-yellow-400 transition hover:-translate-y-1"
                                />
                            </a>
                            <a href="/" about="blank">
                                <Instagram
                                    size={22}
                                    className="hover:text-yellow-400 transition hover:-translate-y-1"
                                />
                            </a>
                            <a href="/" about="blank">
                                <Twitter
                                    size={22}
                                    className="hover:text-yellow-400 transition hover:-translate-y-1"
                                />
                            </a>
                            <a href="/" about="blank">
                                <Youtube
                                    size={22}
                                    className="hover:text-yellow-400 transition hover:-translate-y-1"
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
                            Contácto
                        </NavLink>
                    </div>
                </div>
            </div>
        </header>
    );
}

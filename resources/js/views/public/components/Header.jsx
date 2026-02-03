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
        <>
            <div className="p-10 bg-gray-100 flex justify-between w-full h-36 items-center">
                <div className="text-2xl font-bold text-gray-700">
                    Educación
                </div>
                <div className="flex gap-3 items-center">
                    <div className="p-3 rounded-full bg-gray-300">
                        <School size={75} />
                    </div>
                    <div>
                        <h1 className="text-gray-800 font-bold text-4xl">
                            Instuto Real de México
                        </h1>
                        <p className="text-gray-500 text-sm font-bold">
                            Escuela Primaria
                        </p>
                    </div>
                </div>
                <div>
                    <div className="flex gap-5 items-center">
                        <div className="flex gap-5">
                            <a href="/" about="blank">
                                <Facebook
                                    size={25}
                                    className="hover:text-amber-400 transition hover:-translate-y-1"
                                />
                            </a>
                            <a href="/" about="blank">
                                <Instagram
                                    size={25}
                                    className="hover:text-amber-400 transition hover:-translate-y-1"
                                />
                            </a>
                            <a href="/" about="blank">
                                <Twitter
                                    size={25}
                                    className="hover:text-amber-400 transition hover:-translate-y-1"
                                />
                            </a>
                            <a href="/" about="blank">
                                <Youtube
                                    size={25}
                                    className="hover:text-amber-400 transition hover:-translate-y-1"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full p-5 bg-black text-white">
                <div className="flex justify-center">
                    <div className="flex gap-10">
                        <NavLink index={0} page={page} setPage={setPage}>
                            Inicio
                        </NavLink>
                        <NavLink index={1} page={page} setPage={setPage}>
                            Sobre Nosotros
                        </NavLink>
                        <NavLink index={2} page={page} setPage={setPage}>
                            Talleres
                        </NavLink>
                        <NavLink index={2} page={page} setPage={setPage}>
                            Grados
                        </NavLink>
                        <NavLink index={2} page={page} setPage={setPage}>
                            Blog
                        </NavLink>
                        <NavLink index={2} page={page} setPage={setPage}>
                            Contácto
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    );
}

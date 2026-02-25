import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import SubmitButton from "../components/SubmitButton";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useState } from "react";
import socialLinks from "../../helpers/socialLinks";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [cargando, setCargando] = useState(false);

    const { login, errors } = useAuth({
        middleware: "guest",
        redirectIfAuthenticated: "/admin",
    });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submit = (e) => {
        e.preventDefault();
        setCargando(true);
        login({ email, password, setCargando });
    };

    return (
        <>
            <div className="w-full h-screen login-fondo p-5">
                <div className="w-full flex justify-center md:justify-between md:items-center">
                    <Link to={"/"}>
                        <img
                            src="/img/logo.png"
                            alt="imagen-logo"
                            className="w-36 md:w-20"
                        />
                    </Link>
                    <h1 className="hidden md:block text-xl font-bold text-white">
                        Instituto Real de México A.C.
                    </h1>
                </div>
                <div className="mt-7 flex justify-center md:justify-start md:gap-15 md:items-center">
                    <div className="hidden md:block w-1/2 text-white">
                        <h1 className="text-7xl font-bold">
                            Bienvenido de Vuelta
                        </h1>
                        <p className="mt-5">
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Labore consectetur nobis veniam beatae?
                            Corrupti veritatis, soluta eveniet commodi maxime
                            voluptatum, libero sed fugit velit nihil suscipit
                            magnam ipsam neque amet.
                        </p>
                        <div className="hidden md:flex gap-5 mt-5">
                            {socialLinks.map((link, i) => (
                                <a href={link.url} id={i}>
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                        <div className="flex justify-center mt-8">
                            <div className="flex gap-5">
                                <a className="text-white text-sm hover:text-blue-400 cursor-pointer hover:-translate-y-1 transition">
                                    Aviso de Privacidad
                                </a>
                                <a className="text-white text-sm hover:text-blue-400 cursor-pointer hover:-translate-y-1 transition">
                                    Politicas de uso
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <form
                            onSubmit={submit}
                            className="bg-gray-100/20 rounded-lg shadow-xl p-5 text-white"
                            autoComplete="off"
                        >
                            <div>
                                <legend className="text-center font-bold text-4xl my-2">
                                    Iniciar Sesión
                                </legend>
                                <p className="text-center text-sm">
                                    Inicia Sesión con tu correo electrónico y
                                    contraseña
                                </p>
                            </div>
                            <div className="mt-5">
                                <div className="my-3">
                                    <div>
                                        <label htmlFor="email">
                                            Correo Electrónico
                                        </label>
                                        <div className="relative mt-1">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-black pointer-events-none" />
                                            <input
                                                id="email"
                                                type="tel"
                                                placeholder="correo@dominio.com"
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                                className="w-full pl-10 pr-3 py-2 bg-white text-black rounded-lg 
                                                focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="my-3">
                                    <div>
                                        <label htmlFor="password">
                                            Contraseña
                                        </label>
                                        <div className="relative mt-1">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-black pointer-events-none" />

                                            <input
                                                id="password"
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                placeholder="********"
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                                className="w-full pl-10 pr-10 py-2 bg-white text-black rounded-lg 
                                                    focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword,
                                                    )
                                                }
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black transition cursor-pointer"
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="w-5 h-5" />
                                                ) : (
                                                    <Eye className="w-5 h-5" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <SubmitButton cargando={cargando}>
                                Iniciar Sesión
                            </SubmitButton>
                        </form>
                    </div>
                </div>
                <p className="text-sm text-center text-white mt-5 md:mt-15">
                    Instituto Real de México 2026. Todos los Derechos Reservados
                </p>
            </div>
            <ToastContainer />
        </>
    );
}

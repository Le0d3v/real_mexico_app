import Header from "../components/Header";
import { User } from "lucide-react";
import Navigation from "../components/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useEffect, useState } from "react";
import Dashboard from "../pages/Dashboard";
import Settings from "../pages/Settings";
import News from "../pages/News";
import Students from "../pages/Students";
import Colegiaturas from "../pages/Colegiaturas";
import Tutores from "../pages/Tutores";

export default function AdminLayout() {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const [page, setPage] = useState(0);

    const pages = [
        <Dashboard />,
        <Colegiaturas />,
        <Students />,
        <Tutores />,
        <News />,
        <Settings />,
    ];

    return (
        <>
            <div className="h-screen flex">
                <div className="fixed bg-red-500 inset-y-0 left-0 z-50 w-16 lg:w-44 dark:bg-gray-900 transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 text-white hidden md:block">
                    <div className="flex items-center justify-center lg:justify-start h-16 px-4  border-l-2 border-gray-800 bg-red-500 w-full dark:bg-gray-900">
                        <div className="w-40 h-40 mx-auto my-auto mt-1">
                            <img
                                src={
                                    mediaQuery
                                        ? "/img/logo_dark.png"
                                        : "/img/logo.png"
                                }
                                className="w-28 dark:block hidden mx-auto"
                                alt="imagen-logo"
                            />
                            <img
                                src={
                                    mediaQuery
                                        ? "/img/logo.png"
                                        : "/img/logo_dark.png"
                                }
                                className="w-28 block dark:hidden mx-auto"
                                alt="imagen-logo"
                            />
                        </div>
                    </div>

                    <Navigation index="1" setPage={setPage} page={page} />
                    <div className="absolute bottom-5 left-2 right-2">
                        <div
                            className="flex items-center justify-center lg:justify-start p-3 rounded-lg"
                            id="layout-user"
                        >
                            <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-black" />
                            </div>
                            <div className="ml-3 hidden lg:block">
                                <p className="text-sm text-white dark:text-gray-300">
                                    Carlos Juarez
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex flex-col overflow-hidden">
                    <Header index="1" />
                    <main
                        className=" text-black flex-1 overflow-auto bg-gradient-to-br dark:from-gray-900 dark:via-emerald-900 
                        dark:to-gray-900 p-2 md:p-3 max-w-auto bg-gray-200"
                    >
                        <div
                            className="bg-white text-black dark:bg-white/10 dark:text-white h-full rounded-2xl p-1 md:p-5 max-w-auto md:ml-16 lg:ml-0 overflow-y-scroll shadow-lg"
                            id="admin-outlet"
                        >
                            {pages[page]}
                        </div>
                    </main>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

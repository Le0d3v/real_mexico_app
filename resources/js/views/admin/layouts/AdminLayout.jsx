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
import useAuth from "../../../hooks/useAuth";
import Loader from "../components/Loader";

export default function AdminLayout() {
    const { loading, user } = useAuth({ middleware: "auth" });

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

    if (loading) return <Loader />;

    return (
        <>
            <div className="h-screen flex">
                <div className="fixed bg-red-500 inset-y-0 left-0 z-50 w-16 lg:w-44 transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 text-white hidden md:block">
                    <div className="flex items-center justify-center lg:justify-start h-16 px-4 bg-red-500 w-full">
                        <div className="w-40 h-40 mx-auto my-auto mt-1">
                            <img
                                src={"/img/logo.png"}
                                className="w-28 mx-auto"
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
                                    {user.name}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex flex-col overflow-hidden">
                    <Header index="1" />
                    <main
                        className=" text-black flex-1 overflow-auto  
                        p-2 md:p-3 max-w-auto bg-gray-200"
                    >
                        <div
                            className="bg-white text-black  h-full rounded p-1 md:p-5 max-w-auto md:ml-16 lg:ml-0 overflow-y-scroll shadow-lg"
                            id="admin-outlet"
                        >
                            {loading ? <Loader /> : pages[page]}
                        </div>
                    </main>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

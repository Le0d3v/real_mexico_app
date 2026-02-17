import Header from "../components/private/Header";
import { User } from "lucide-react";
import Navigation from "../components/private/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useEffect, useState } from "react";
import Dashboard from "../admin/Dashboard";
import Settings from "../admin/Settings";
import News from "../admin/News";
import Students from "../admin/Students";
import Colegiaturas from "../admin/Colegiaturas";
import Tutores from "../admin/Tutores";
import useAuth from "../../hooks/useAuth";
import Loader from "../components/private/Loader";
import { ClipLoader } from "react-spinners";

export default function AdminLayout() {
    const { loading, user } = useAuth({ middleware: "auth" });
    const [page, setPage] = useState(0);

    const initial = user?.name ? user.name.trim().charAt(0).toUpperCase() : "";

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
            <div className="h-screen flex bg-gray-100">
                {/* SIDEBAR */}
                <aside className="hidden md:flex flex-col w-20 lg:w-52 bg-red-800 text-white shadow-xl">
                    {/* Logo */}
                    <div className="h-20 flex items-center justify-center border-b border-yellow-500/30">
                        <img
                            src="/img/logo.png"
                            className="w-14 lg:w-20 transition-all"
                            alt="logo"
                        />
                    </div>

                    {/* Navigation */}
                    <div className="flex-1 px-3 py-3">
                        <Navigation index="1" setPage={setPage} page={page} />
                    </div>

                    {/* User */}
                    <div className="p-4 border-t border-yellow-500/20">
                        <div className="flex items-center gap-3 bg-red-700/60 p-3 rounded-lg hover:bg-red-700 transition">
                            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-black">
                                {loading ? (
                                    <ClipLoader size={16} color="black" />
                                ) : (
                                    initial
                                )}
                            </div>
                            <div className="hidden lg:block text-sm font-medium">
                                {loading ? (
                                    <ClipLoader size={15} color="white" />
                                ) : (
                                    `${user.name} ${user.apellido_paterno}`
                                )}
                            </div>
                        </div>
                    </div>
                </aside>

                {/* CONTENT */}
                <div className="flex-1 flex flex-col">
                    <Header index="1" />

                    <main className="flex-1 p-3 overflow-auto bg-gray-100">
                        <div className="bg-white rounded-2xl shadow-md p-6 min-h-full">
                            {loading ? <Loader /> : pages[page]}
                        </div>
                    </main>
                </div>
            </div>

            <ToastContainer />
        </>
    );
}

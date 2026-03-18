import Header from "../admin/components/Header";
import Navigation from "../admin/components/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useState } from "react";
import Dashboard from "../admin/Dashboard";
import Settings from "../admin/config/Settings";
import News from "../admin/noticias/News";
import Students from "../admin/estudiantes/Students";
import Colegiaturas from "../admin/colegiaturas/Colegiaturas";
import Pagos from "../admin/pagos/Pagos";
import Tutores from "../admin/tutores/Tutores";
import useAuth from "../../hooks/useAuth";
import Loader from "../components/Loader";
import { ClipLoader } from "react-spinners";
import useIRM from "../../hooks/useIRM";
import ResponsiveMenu from "../admin/components/ResponsiveMenu";

export default function AdminLayout() {
    const { loading, user } = useAuth({ middleware: "auth" });
    const { adminPage, setAdminPage, adminContentScroll } = useIRM();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const initial = user?.name ? user.name.trim().charAt(0).toUpperCase() : "";

    const pages = [
        <Dashboard />,
        <Colegiaturas />,
        <Pagos />,
        <Students />,
        <Tutores />,
        <News />,
        <Settings />,
    ];

    if (!user) {
        return null;
    }

    return (
        <>
            <div className="h-screen flex bg-gray-100" id="driver_welcome">
                {/* SIDEBAR */}
                <aside className="hidden md:flex flex-col w-16 lg:w-56 transition-all duration-300 bg-red-800 text-white ">
                    {/* Logo */}
                    <div className="h-20 flex items-center justify-center border-b border-yellow-500/30 py-3">
                        <img
                            src="/img/logo.png"
                            className="w-14 lg:w-20 transition-all"
                            alt="logo"
                        />
                    </div>
                    <div className="flex-1 px-3 py-3" id="driver_navegacion">
                        <Navigation
                            index="1"
                            setPage={setAdminPage}
                            page={adminPage}
                        />
                    </div>
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
                <div className="flex-1 flex flex-col min-w-0">
                    <Header index="1" toggleMenu={() => setIsMenuOpen(true)} />

                    <main
                        className="flex-1 p-2 md:p-4 overflow-x-hidden overflow-y-auto bg-white min-w-0"
                        ref={adminContentScroll}
                    >
                        <div
                            className="bg-gray-100 rounded-2xl shadow-md p-3 md:p-6 min-h-full w-full max-w-full overflow-hidden"
                            id="driver_main"
                        >
                            {loading ? <Loader /> : pages[adminPage]}
                        </div>
                    </main>
                </div>
            </div>
            <ToastContainer />
            {/* OVERLAY */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}

            {/* MENÚ RESPONSIVE */}
            <ResponsiveMenu
                isOpen={isMenuOpen}
                closeMenu={() => setIsMenuOpen(false)}
                index="1"
                page={adminPage}
                setPage={setAdminPage}
            />
        </>
    );
}

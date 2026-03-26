import { Menu, LogOut, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import useAuth from "../../../hooks/useAuth";
import useIRM from "../../../hooks/useIRM";

export default function Header({
  toggleMenu,
  isSidebarOpen,
  setIsSidebarOpen,
}) {
  const { logout } = useAuth({ middleware: "auth" });
  const [cargando, setCargando] = useState(false);
  const { titulo } = useIRM();

  const hanldeClicLogout = () => {
    setCargando(true);
    logout();
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-black text-white shadow-md border-b border-yellow-500/40">
      <div className="flex items-center justify-between h-18  px-5 gap-4">
        {/* IZQUIERDA: BOTÓN + TÍTULO */}
        <div className="flex items-center gap-3 min-w-0">
          {/* BOTÓN SIDEBAR */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden lg:flex items-center justify-center p-2 rounded-lg hover:bg-gray-700 transition flex-shrink-0 cursor-pointer"
            id="driver_ocultar-navegacion"
          >
            {isSidebarOpen ? (
              <PanelLeftClose size={25} />
            ) : (
              <PanelLeftOpen size={25} />
            )}
          </button>

          {/* TÍTULO */}
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide text-yellow-400 truncate">
            {titulo}
          </h1>
        </div>

        {/* DERECHA: ACCIONES */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {/* MENÚ MOBILE */}
          <button className="md:hidden" onClick={toggleMenu}>
            <Menu className="w-8 h-8" />
          </button>

          {/* LOGOUT */}
          <button
            className="hidden md:flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 px-5 py-2 rounded-lg font-semibold transition duration-200 disabled:opacity-70 cursor-pointer w-52 justify-center"
            disabled={cargando}
            onClick={hanldeClicLogout}
            id="driver_cerrar-sesion"
          >
            {cargando ? (
              <ClipLoader size={19} color="white" />
            ) : (
              <>
                <span>Cerrar sesión</span>
                <LogOut className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

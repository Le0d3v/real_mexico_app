import Navigation from "../../admin/components/Navigation";
import { Bell, User, LogOut, Moon, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";

export default function ResponsiveMenu({
  isOpen,
  closeMenu,
  index,
  page,
  setPage,
  user,
}) {
  const [cargando, setCargando] = useState(false);
  const { logout } = useAuth();

  const handleClickLogout = () => {
    setCargando(true);
    logout();
  };

  return (
    <div
      className={`
                fixed top-0 left-0 z-50
                h-full w-[85%] max-w-sm
                bg-red-600 text-white
                transform transition-transform duration-300 ease-in-out
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
            `}
    >
      {/* CONTENEDOR PRINCIPAL */}
      <div className="flex flex-col h-full">
        {/* HEADER */}
        <div className="flex justify-end p-3">
          <button
            onClick={closeMenu}
            className="p-2 rounded-lg hover:bg-red-700 transition"
          >
            <X className="h-8 w-8" />
          </button>
        </div>

        <div className="flex-1 overflow-y-scroll px-4 pb-4">
          {/* LOGO */}
          <div className="mt-2 text-center">
            <img
              src="/img/logo2.png"
              alt="imagen-logo"
              className="mx-auto w-22 sm:w-40"
            />
            <h1 className="text-xl sm:text-xl font-bold mt-2 leading-tight">
              Instituto Real de México
            </h1>
          </div>

          {/* NAV */}
          <p className="text-sm text-gray-100 text-center mt-8 mb-2 uppercase tracking-wide">
            Navegación
          </p>

          <Navigation
            index="1"
            closeMenu={closeMenu}
            setPage={setPage}
            page={page}
            user={user}
          />
        </div>

        {/* FOOTER (FIJO ABAJO) */}
        <div className="p-4 border-t border-red-400/30 space-y-4">
          {/* USER */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-yellow-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-black" />
            </div>
            <p className="text-sm font-medium">
              {user?.name} {user?.apellido_paterno}
            </p>
          </div>

          {/* LOGOUT */}
          <button
            className="flex items-center justify-center gap-2 text-sm bg-yellow-500 rounded-lg text-white font-bold hover:bg-yellow-600 p-3 text-xl transition w-full disabled:opacity-70"
            disabled={cargando}
            onClick={handleClickLogout}
          >
            {cargando ? (
              <ClipLoader color="#ffffff" size={20} />
            ) : (
              <>
                <span>Cerrar sesión</span>
                <LogOut className="w-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

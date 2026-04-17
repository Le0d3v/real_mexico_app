import {
  Home,
  Globe,
  Settings,
  User,
  Users,
  CircleDollarSign,
  CalendarDays,
  Calendar,
} from "lucide-react";
import NavItem from "./NavItem";
import useIRM from "../../../hooks/useIRM";
import useAuth from "../../../hooks/useAuth";
import Loader from "../../components/Loader";

export default function Navigation({ user, closeMenu, setPage, page }) {
  const { setTitulo } = useIRM();

  if (!user) {
    return <Loader />;
  }

  return (
    <nav className="px-2" id="navegacion">
      <div className="hidden lg:block mt-1 mb-1">
        <p className="text-sm text-white text-center transition-colors mt-3">
          Navegación
        </p>
      </div>

      <div className="flex flex-col" id="driver_navegacion-enlaces">
        {user.rol === "admin" ? (
          <>
            <NavItem
              page={page}
              closeMenu={closeMenu}
              setPage={setPage}
              index={0}
              icon={Home}
              fn={() => setTitulo("Instituto Real De México A.C.")}
            >
              Inicio
            </NavItem>
            <NavItem
              page={page}
              closeMenu={closeMenu}
              setPage={setPage}
              index={1}
              icon={CalendarDays}
              fn={() => setTitulo("Colegiaturas")}
            >
              Colegiaturas
            </NavItem>
            <NavItem
              page={page}
              closeMenu={closeMenu}
              setPage={setPage}
              index={2}
              icon={CircleDollarSign}
              fn={() => setTitulo("Pagos")}
            >
              Pagos
            </NavItem>
            <NavItem
              page={page}
              closeMenu={closeMenu}
              setPage={setPage}
              index={3}
              icon={Users}
              fn={() => setTitulo("Estudiantes")}
            >
              Estudiantes
            </NavItem>
            <NavItem
              page={page}
              closeMenu={closeMenu}
              setPage={setPage}
              index={4}
              icon={User}
              fn={() => setTitulo("Tutores")}
            >
              Tutores
            </NavItem>
            <NavItem
              page={page}
              closeMenu={closeMenu}
              setPage={setPage}
              index={5}
              icon={Globe}
              fn={() => setTitulo("Publicaciones")}
            >
              Publicaciones
            </NavItem>
            <NavItem
              page={page}
              closeMenu={closeMenu}
              setPage={setPage}
              index={6}
              icon={Settings}
              fn={() => setTitulo("Configuración")}
            >
              Ajustes
            </NavItem>
          </>
        ) : (
          <>
            <div className="flex flex-col" id="driver_navegacion-enlaces">
              <NavItem
                page={page}
                closeMenu={closeMenu}
                setPage={setPage}
                index={0}
                icon={Home}
                fn={() => setTitulo("Instituto Real México A.C.")}
              >
                Inicio
              </NavItem>
            </div>
            <div className="flex flex-col" id="driver_navegacion-enlaces">
              <NavItem
                page={page}
                closeMenu={closeMenu}
                setPage={setPage}
                index={1}
                icon={Calendar}
                fn={() => setTitulo("Colegiaturas")}
              >
                Colegiaturas
              </NavItem>
            </div>
            <div className="flex flex-col" id="driver_navegacion-enlaces">
              <NavItem
                page={page}
                closeMenu={closeMenu}
                setPage={setPage}
                index={2}
                icon={Users}
                fn={() => setTitulo("Mis Estudiantes")}
              >
                Mis Estudiantes
              </NavItem>
            </div>
            <div className="flex flex-col" id="driver_navegacion-enlaces">
              <NavItem
                page={page}
                closeMenu={closeMenu}
                setPage={setPage}
                index={3}
                icon={Users}
                fn={() => setTitulo("Mis Pagos")}
              >
                Mis Pagos
              </NavItem>
            </div>
            <div className="flex flex-col" id="driver_navegacion-enlaces">
              <NavItem
                page={page}
                closeMenu={closeMenu}
                setPage={setPage}
                index={4}
                icon={Settings}
                fn={() => setTitulo("Configuración")}
              >
                Ajustes
              </NavItem>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

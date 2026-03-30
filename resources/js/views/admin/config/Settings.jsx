import { Home, Lock, User } from "lucide-react";
import DatosPersonalesForm from "./DatosPersonalesForm";
import DomicilioForm from "./DomicilioForm";
import useAuth from "../../../hooks/useAuth";
import Loader from "../../components/Loader";
import PasswordForm from "./PasswordForm";
import Tour from "./Tour";
import CierreCiclo from "./CierreCiclo";

export default function Settings() {
  const { user, mutate } = useAuth({ middleware: "auth" });

  if (!user) {
    return <Loader />;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="" id="driver_settings-personal">
        <DatosPersonalesForm user={user} />
      </div>
      <div className="my-7" id="driver_settings-domicilio">
        <DomicilioForm user={user} />
      </div>
      <div className="my-7" id="driver_settings-password">
        <PasswordForm user={user} />
      </div>
      <div className="my-7" id="driver_cierre-ciclo">
        <CierreCiclo />
      </div>
      <div className="my-7 hidden lg:block" id="driver_settings-tour">
        <Tour user={user} />
      </div>
    </div>
  );
}

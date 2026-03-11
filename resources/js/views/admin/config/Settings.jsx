import { Home, Lock, User } from "lucide-react";
import DatosPersonalesForm from "./DatosPersonalesForm";
import DomicilioForm from "./DomicilioForm";
import useAuth from "../../../hooks/useAuth";
import Loader from "../../components/Loader";
import PasswordForm from "./PasswordForm";
import Tour from "./Tour";

export default function Settings() {
    const { user, mutate } = useAuth({ middleware: "auth" });

    if (!user) {
        return <Loader />;
    }
    
    return (
        <div className="max-w-7xl mx-auto">
            <div className="">
                <DatosPersonalesForm user={user} />
            </div>
            <div className="my-7">
                <DomicilioForm user={user} />
            </div>
            <div className="my-7">
                <PasswordForm user={user} />
            </div>
            <div className="my-7">
                <Tour user={user} />
            </div>
        </div>
    );
}

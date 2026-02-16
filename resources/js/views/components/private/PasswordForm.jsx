import { Info, Lock, Eye, EyeOff } from "lucide-react";
import SubmitButton from "../SubmitButton";
import api from "../../../config/axios";
import { useState, useRef } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function PasswordForm({ user }) {
    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const currentPasswordRef = useRef();
    const newPasswordRef = useRef();
    const passwordConfirmationRef = useRef();

    const toggleVisibility = (field) => {
        setShowPassword((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const datos = {
            current_password: currentPasswordRef.current.value,
            password: newPasswordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };

        try {
            const response = await api.put(
                `/api/update-password/${user.id}`,
                datos,
            );

            if (response.status >= 200 && response.status < 300) {
                toast.success(
                    response.data?.message ||
                        "Contraseña actualizada correctamente",
                );
                return;
            }

            toast.error("Error inesperado.");
        } catch (error) {
            const { response } = error;

            if (response?.status === 422) {
                Object.values(response.data?.errors || {})
                    .flat()
                    .forEach((message) => toast.error(message));
            } else if (response?.status === 401) {
                toast.error("La contraseña actual es incorrecta.");
            } else {
                toast.error("Error inesperado.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-800/80 rounded-3xl shadow-xl border border-gray-100 p-10 backdrop-blur-sm">
            <div className="flex items-start gap-2 mb-5">
                <Info className="text-violet-200" />
                <p className="text-white text-sm">
                    Actualice su contraseña llenando el formulario
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                {/* CONTRASEÑA ACTUAL */}
                <div className="flex flex-col my-5">
                    <label className="text-white font-semibold mb-2">
                        Contraseña Actual
                    </label>

                    <div className="relative">
                        <input
                            type={showPassword.current ? "text" : "password"}
                            ref={currentPasswordRef}
                            className="h-12 w-full px-4 rounded-lg border-2 border-gray-200 text-white bg-transparent"
                        />

                        <button
                            type="button"
                            onClick={() => toggleVisibility("current")}
                            className="absolute right-3 top-3 text-white"
                        >
                            {showPassword.current ? <EyeOff /> : <Eye />}
                        </button>
                    </div>
                </div>

                {/* NUEVA CONTRASEÑA */}
                <div className="flex flex-col my-5">
                    <label className="text-white font-semibold mb-2">
                        Nueva Contraseña
                    </label>

                    <div className="relative">
                        <input
                            type={showPassword.new ? "text" : "password"}
                            ref={newPasswordRef}
                            className="h-12 w-full px-4 rounded-lg border-2 border-gray-200 text-white bg-transparent"
                        />

                        <button
                            type="button"
                            onClick={() => toggleVisibility("new")}
                            className="absolute right-3 top-3 text-white"
                        >
                            {showPassword.new ? <EyeOff /> : <Eye />}
                        </button>
                    </div>
                </div>

                {/* CONFIRMAR */}
                <div className="flex flex-col my-5">
                    <label className="text-white font-semibold mb-2">
                        Confirmar Nueva Contraseña
                    </label>

                    <div className="relative">
                        <input
                            type={showPassword.confirm ? "text" : "password"}
                            ref={passwordConfirmationRef}
                            className="h-12 w-full px-4 rounded-lg border-2 border-gray-200 text-white bg-transparent"
                        />

                        <button
                            type="button"
                            onClick={() => toggleVisibility("confirm")}
                            className="absolute right-3 top-3 text-white"
                        >
                            {showPassword.confirm ? <EyeOff /> : <Eye />}
                        </button>
                    </div>
                </div>

                <div className="flex justify-end">
                    <SubmitButton>
                        {loading ? (
                            <ClipLoader color="white" size={23} />
                        ) : (
                            "Actualizar Contraseña"
                        )}
                    </SubmitButton>
                </div>
            </form>
        </div>
    );
}

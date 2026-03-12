import { Info, Lock, Eye, EyeOff } from "lucide-react";
import SubmitButton from "../../components/SubmitButton";
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
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <div className="flex gap-2">
                <div className="p-1 rounded-full h-10 w-10 bg-red-500/20 text-red-500 flex justify-center items-center">
                    <Lock size={25} />
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-6">
                    Cambiar Contraseña
                </h1>
            </div>
            <div className="flex items-start gap-2 mb-5">
                <Info className="text-red-500" />
                <p className="text-black text-sm">
                    Actualice su contraseña llenando el formulario
                </p>
            </div>

            <form
                className="grid grid-cols-1 gap-y-6 mt-5"
                onSubmit={handleSubmit}
            >
                {/* CONTRASEÑA ACTUAL */}
                <div
                    className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-200 focus-within:ring-2 focus-within:ring-red-500 transition"
                    id="driver_settings-password-campo"
                >
                    <div className="text-red-600 mt-1">
                        <Lock size={18} />
                    </div>

                    <div className="w-full">
                        <label className="text-sm text-gray-500 block mb-1">
                            Contraseña Actual
                        </label>

                        <div className="relative">
                            <input
                                type={
                                    showPassword.current ? "text" : "password"
                                }
                                ref={currentPasswordRef}
                                className="w-full bg-transparent outline-none text-gray-800 font-medium pr-10"
                                placeholder="Ingrese su contraseña actual"
                                required
                            />

                            <button
                                type="button"
                                onClick={() => toggleVisibility("current")}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-600 transition show-password"
                            >
                                {showPassword.current ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* NUEVA CONTRASEÑA */}
                <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-200 focus-within:ring-2 focus-within:ring-red-500 transition">
                    <div className="text-red-600 mt-1">
                        <Lock size={18} />
                    </div>

                    <div className="w-full">
                        <label className="text-sm text-gray-500 block mb-1">
                            Nueva Contraseña
                        </label>

                        <div className="relative">
                            <input
                                type={showPassword.new ? "text" : "password"}
                                ref={newPasswordRef}
                                className="w-full bg-transparent outline-none text-gray-800 font-medium pr-10"
                                placeholder="Ingrese la nueva contraseña"
                                required
                            />

                            <button
                                type="button"
                                onClick={() => toggleVisibility("new")}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-600 transition"
                            >
                                {showPassword.new ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* CONFIRMAR CONTRASEÑA */}
                <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-200 focus-within:ring-2 focus-within:ring-red-500 transition">
                    <div className="text-red-600 mt-1">
                        <Lock size={18} />
                    </div>

                    <div className="w-full">
                        <label className="text-sm text-gray-500 block mb-1">
                            Confirmar Nueva Contraseña
                        </label>

                        <div className="relative">
                            <input
                                type={
                                    showPassword.confirm ? "text" : "password"
                                }
                                ref={passwordConfirmationRef}
                                className="w-full bg-transparent outline-none text-gray-800 font-medium pr-10"
                                placeholder="Confirme la nueva contraseña"
                                required
                            />

                            <button
                                type="button"
                                onClick={() => toggleVisibility("confirm")}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-600 transition"
                            >
                                {showPassword.confirm ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* BOTÓN */}
                <div className="w-full" id="driver_settings-password-save">
                    <SubmitButton>
                        {loading ? (
                            <ClipLoader size={20} color="white" />
                        ) : (
                            <span>Actualizar Contraseña</span>
                        )}
                    </SubmitButton>
                </div>
            </form>
        </div>
    );
}

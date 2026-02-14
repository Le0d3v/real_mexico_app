import { useEffect, useState } from "react";
import api from "@/config/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function useAuth({ middleware, redirectIfAuthenticated } = {}) {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState([]);

    const fetchUser = async () => {
        try {
            const { data } = await api.get("/api/me");
            setUser(data);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async ({ email, password, setCargando }) => {
        setErrors([]);

        try {
            const { data } = await api.post("/api/login", {
                email,
                password,
            });

            // Guardar token
            localStorage.setItem("token", data.token);

            setUser(data.user);

            navigate("/admin");
        } catch (error) {
            if (error.response?.status === 422) {
                const validationErrors = error.response.data.errors;
                setErrors(validationErrors);

                Object.values(validationErrors)
                    .flat()
                    .forEach((message) => {
                        toast.error(message);
                    });
            } else if (error.response?.status === 401) {
                toast.error("Credenciales incorrectas.");
            } else {
                toast.error("Error inesperado.");
            }

            setCargando(false);
        }
    };

    const logout = async () => {
        try {
            await api.post("/api/logout");
        } catch (error) {
            console.warn("Error al cerrar sesión");
        }

        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            fetchUser();
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!loading) {
            if (middleware === "guest" && user) {
                navigate(redirectIfAuthenticated || "/admin");
            }

            if (middleware === "auth" && !user) {
                navigate("/login");
            }
        }
    }, [user, loading]);

    return {
        user,
        loading,
        errors,
        login,
        logout,
    };
}

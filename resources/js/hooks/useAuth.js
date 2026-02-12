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
            const { data } = await api.get("/api/user");
            setUser(data);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const csrf = () => api.get("/sanctum/csrf-cookie");

    const login = async ({ email, password, setCargando }) => {
        setErrors([]);
        await csrf();

        try {
            await api.post("/login", { email, password });
            await fetchUser();
            navigate("/admin");
        } catch (error) {
            if (error.response?.status === 422) {
                const validationErrors = error.response.data.errors;

                setErrors(validationErrors);

                Object.keys(validationErrors).forEach((field) => {
                    validationErrors[field].forEach((message) => {
                        toast.error(message);
                    });
                });
            } else if (error.response?.status === 401) {
                toast.error("Credenciales incorrectas.");
            } else {
                toast.error("Ocurrió un error inesperado.");
            }

            setCargando(false);
        }
    };

    const logout = async () => {
        await api.post("/logout");
        setUser(null);
        navigate("/login");
    };

    useEffect(() => {
        fetchUser();
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

import { useEffect, useState } from "react";
import api from "@/config/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { redirectByRole } from "../helpers/helpers";

export default function useAuth({ middleware } = {}) {
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

  const login = async ({ phone, password }) => {
    setErrors([]);

    try {
      const { data } = await api.post("/api/auth-login", {
        phone,
        password,
      });

      localStorage.setItem("token", data.token);

      setUser(data.user);

      return data.user; // 👈 SOLO retorna
      console.log(user);
    } catch (error) {
      if (error.response?.status === 422) {
        const validationErrors = error.response.data.errors;
        setErrors(validationErrors);

        Object.values(validationErrors)
          .flat()
          .forEach((message) => toast.error(message));
      } else if (error.response?.status === 401) {
        toast.error("Credenciales incorrectas.");
      } else {
        toast.error("Error inesperado.");
      }

      return null;
    }
  };

  const logout = async () => {
    try {
      await api.post("/api/logout");
    } catch {}

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
    if (loading) return;

    // 🔐 Ruta protegida
    if (middleware === "auth" && !user) {
      navigate("/login");
    }

    // 👤 Ruta guest
    if (middleware === "guest" && user) {
      navigate(redirectByRole(user));
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

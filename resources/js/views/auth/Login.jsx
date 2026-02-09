import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Login() {
    const { login, errors } = useAuth({
        middleware: "guest",
        redirectIfAuthenticated: "/dashboard",
    });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submit = (e) => {
        e.preventDefault();
        login({ email, password });
    };

    return (
        <form onSubmit={submit} className="max-w-md mx-auto mt-20 space-y-4">
            <input
                className="w-full border p-2"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="w-full border p-2"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button className="w-full bg-blue-600 text-white py-2">
                Iniciar sesión
            </button>

            {errors.email && <p className="text-red-500">{errors.email[0]}</p>}
        </form>
    );
}

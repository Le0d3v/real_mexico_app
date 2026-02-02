import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="text-center">
            Home
            <Link to={"/auth"}>Iniciar Sesion</Link>
        </div>
    );
}

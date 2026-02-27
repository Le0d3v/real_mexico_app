import React from "react";

export default function Alerta({ children }) {
    return (
        <div className="py-2 px-3 rounded-lg bg-yellow-300 border-l-4 border-yellow-500 text-yellow-900 font-bold w-full text-lg">
            {children}
        </div>
    );
}

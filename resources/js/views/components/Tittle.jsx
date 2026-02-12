import React from "react";

export default function Tittle({ children }) {
    return (
        <h1 className="text-center font-black text-gray-800 text-5xl my-3">
            {children}
        </h1>
    );
}

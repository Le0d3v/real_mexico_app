import React from "react";

export default function Tittle({ children }) {
    return (
        <h1 className="text-center font-black text-red-400 text-4xl my-3">
            {children}
        </h1>
    );
}

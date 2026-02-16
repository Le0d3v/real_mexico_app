import React from "react";

export default function TituloDark({ titulo, subtitulo }) {
    return (
        <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                {titulo}
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mt-4 rounded-full"></div>
            <p className="text-gray-300 mt-6 max-w-2xl mx-auto text-lg">
                {subtitulo}
            </p>
        </div>
    );
}

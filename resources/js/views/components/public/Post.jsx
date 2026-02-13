import React from "react";

export default function Post({ children, titulo, imagen, fecha }) {
    return (
        <article className="group relative w-full my-10">
            <div className="overflow-hidden rounded-2xl bg-white shadow-[0_15px_50px_-15px_rgba(0,0,0,0.25)] transition-all duration-500 hover:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.35)]">
                {/* Imagen */}
                <div className="relative h-[260px] md:h-[550px] lg:h-[620px] overflow-hidden">
                    <img
                        src={imagen}
                        alt="imagen-post"
                        className="w-full h-full object-center transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Overlay elegante */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    {/* Fecha flotante */}
                    <div className="absolute bottom-5 right-5 bg-white/90 backdrop-blur px-4 py-1 rounded-full text-xs font-medium text-gray-700 shadow">
                        {fecha}
                    </div>
                </div>

                {/* Contenido */}
                <div className="p-6 md:p-10">
                    {/* Autor */}
                    <p className="text-xs uppercase tracking-widest text-gray-400">
                        Redactado por{" "}
                        <span className="text-yellow-600 font-semibold">
                            Admin
                        </span>
                    </p>

                    {/* Título */}
                    <h1 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-gray-900 group-hover:text-yellow-600 transition-colors duration-300">
                        {titulo}
                    </h1>

                    {/* Línea decorativa */}
                    <div className="w-16 h-1 bg-yellow-500 mt-5 mb-6 rounded-full transition-all duration-300 group-hover:w-24" />

                    {/* Texto */}
                    <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed text-base md:text-lg">
                        {children}
                    </div>
                </div>
            </div>
        </article>
    );
}

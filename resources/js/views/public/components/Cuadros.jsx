import React from "react";

export default function Cuadros() {
  const stats = [
    { value: "30+", label: "Años de Experiencia" },
    { value: "100+", label: "Alumnos Activos" },
    { value: "10", label: "Docentes Certificados" },
    { value: "99%", label: "Satisfacción" },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-black to-[#111111]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative bg-[#161616] border border-yellow-400/10 
                            rounded-2xl p-10 text-center
                            transition-all duration-300
                            hover:border-yellow-400/40 hover:shadow-[0_0_25px_rgba(250,204,21,0.15)]
                            hover:-translate-y-2"
            >
              {/* Número */}
              <h2
                className="text-6xl md:text-7xl font-extrabold 
                                           text-yellow-400 tracking-tight"
              >
                {stat.value}
              </h2>

              {/* Línea decorativa */}
              <div className="w-12 h-1 bg-yellow-400 mx-auto my-4 rounded-full"></div>

              {/* Texto */}
              <p
                className="text-sm md:text-base uppercase tracking-widest 
                                          text-gray-300 font-semibold"
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Mail, Phone } from "lucide-react";

export default function PersonalCard({ nombre, puesto, email, tel, img }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-red-600/30 transition duration-500 hover:-translate-y-2">
      {/* Imagen */}
      <div className="relative group">
        <img
          src={img}
          alt={nombre}
          className="w-full h-80 object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
      </div>

      {/* Contenido */}
      <div className="p-6 text-center text-white">
        <h2 className="text-2xl font-bold tracking-tight">{nombre}</h2>

        {/* <p className="text-yellow-400 font-medium mt-1">{puesto}</p>

        <div className="mt-6 space-y-3 text-gray-400 text-sm">
          <div className="flex items-center justify-center gap-2 hover:text-white transition">
            <Mail size={16} className="text-red-600" />
            {email}
          </div>

          <div className="flex items-center justify-center gap-2 hover:text-white transition">
            <Phone size={16} className="text-red-600" />
            {tel}
          </div>
        </div> */}
      </div>
    </div>
  );
}

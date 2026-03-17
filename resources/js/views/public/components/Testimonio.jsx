import { Star } from "lucide-react";

export default function Testimonio({ name, role, text }) {
    return (
        <div className="relative bg-white/80 backdrop-blur-md border border-gray-100 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group">
            {/* Decorative gradient */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-100/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

            {/* Stars */}
            <div className="relative flex items-center mb-3 gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-yellow-400 drop-shadow-sm"
                    />
                ))}
            </div>

            {/* Text */}
            <p className="relative text-gray-700 italic leading-relaxed text-sm md:text-base">
                “{text}”
            </p>

            {/* Divider */}
            <div className="relative my-4 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

            {/* User */}
            <div className="relative flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-500 text-white font-bold">
                    {name.charAt(0)}
                </div>
                <div>
                    <p className="font-semibold text-gray-900 text-sm">
                        {name}
                    </p>
                    <p className="text-xs text-gray-500">{role}</p>
                </div>
            </div>
        </div>
    );
}

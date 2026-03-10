import { User, Phone, IdCard } from "lucide-react";

export default function SearchTutor({ tutor, selected, onSelect }) {
    return (
        <div
            onClick={() => onSelect(tutor)}
            className={`p-4 rounded-xl border transition cursor-pointer mb-2
            ${
                selected
                    ? "border-red-400 bg-red-50 shadow-sm"
                    : "border-gray-200 bg-white hover:bg-gray-50 hover:border-red-300"
            }`}
        >
            <div className="flex items-start justify-between">
                {/* Información principal */}

                <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-red-100">
                        <User size={18} className="text-red-600" />
                    </div>

                    <div>
                        <p className="font-semibold text-gray-800 leading-tight">
                            {tutor.name} {tutor.apellido_paterno}{" "}
                            {tutor.apellido_materno}
                        </p>

                        <div className="flex flex-col text-sm text-gray-500 mt-1">
                            {tutor.telefono && (
                                <span className="flex items-center gap-1">
                                    <Phone size={14} />
                                    {tutor.telefono}
                                </span>
                            )}

                            {tutor.curp && (
                                <span className="flex items-center gap-1">
                                    <IdCard size={14} />
                                    {tutor.curp}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Indicador de selección */}

                {selected && (
                    <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded-lg">
                        Seleccionado
                    </span>
                )}
            </div>
        </div>
    );
}

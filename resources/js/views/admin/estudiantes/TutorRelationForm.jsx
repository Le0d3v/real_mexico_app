export default function TutorRelationForm({ relacion, onChange }) {
    return (
        <div className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-md">
            <h3 className="font-semibold text-gray-800 mb-2">
                Relación Tutor - Estudiante
            </h3>

            <p className="text-sm text-gray-500 mb-6">
                Complete la información de la relación con el alumno
            </p>

            <div className="flex flex-col md:flex-row justify-between gap-8">
                {/* =====================
                   PARENTESCO
                ===================== */}

                <div className="w-1/2">
                    <label className="text-sm text-gray-600">Parentesco</label>

                    <select
                        value={relacion.parentesco || ""}
                        onChange={(e) => onChange("parentesco", e.target.value)}
                        className="w-full border border-gray-300 rounded-xl px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                    >
                        <option value="">Seleccione</option>

                        {[
                            "Padre",
                            "Madre",
                            "Abuelo",
                            "Abuela",
                            "Tío",
                            "Tía",
                            "Hermano",
                            "Hermana",
                            "Otro",
                        ].map((opt) => (
                            <option key={opt} value={opt}>
                                {opt}
                            </option>
                        ))}
                    </select>

                    {relacion.parentesco === "Otro" && (
                        <input
                            type="text"
                            placeholder="Especifique el parentesco"
                            value={relacion.parentesco_otro || ""}
                            onChange={(e) =>
                                onChange("parentesco_otro", e.target.value)
                            }
                            className="block w-full border border-gray-300 rounded-xl px-4 py-2 mt-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                        />
                    )}
                </div>

                {/* =====================
                   BOOLEANOS
                ===================== */}

                <div className="w-1/2 flex items-center justify-end gap-10">
                    <RadioGroup
                        label="Responsable de Pagos"
                        value={relacion.responsable_pagos}
                        onChange={(value) =>
                            onChange("responsable_pagos", value)
                        }
                    />

                    <RadioGroup
                        label="Contacto Principal"
                        value={relacion.contacto_principal}
                        onChange={(value) =>
                            onChange("contacto_principal", value)
                        }
                    />
                </div>
            </div>
        </div>
    );
}

/* =========================================
   SUBCOMPONENTE RADIOGROUP
========================================= */

function RadioGroup({ label, value, onChange }) {
    return (
        <div>
            <label className="text-sm text-gray-600">{label}</label>

            <div className="flex gap-6 mt-2 text-gray-700">
                <label className="flex items-center gap-1">
                    <input
                        type="radio"
                        checked={value === true}
                        onChange={() => onChange(true)}
                    />
                    Sí
                </label>

                <label className="flex items-center gap-1">
                    <input
                        type="radio"
                        checked={value === false}
                        onChange={() => onChange(false)}
                    />
                    No
                </label>
            </div>
        </div>
    );
}

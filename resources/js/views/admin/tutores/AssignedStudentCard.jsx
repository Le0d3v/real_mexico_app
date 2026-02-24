export default function AssignedStudentCard({
    student,
    handleRemoveStudent,
    handleRelationChange,
}) {
    return (
        <div className="p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 mb-5 hover:border-red-500">
            <div className="flex justify-between items-start border-b border-gray-100 pb-4">
                <div>
                    <p className="font-semibold text-lg text-gray-800">
                        {student.nombre} {student.apellido_paterno}
                    </p>
                    <p className="text-sm text-gray-500">
                        {student.grado} - {student.grupo}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => handleRemoveStudent(student.id)}
                    className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition shadow-sm cursor-pointer"
                >
                    Eliminar
                </button>
            </div>

            <p className="text-sm text-gray-500 mt-3">
                Complete el formulario para guardar la relación con el alumno
            </p>

            <div className="flex justify-between mt-5">
                {/* Parentesco */}
                <div>
                    <label className="text-sm text-gray-600">Parentesco</label>

                    <select
                        value={student.relacion.parentesco || ""}
                        onChange={(e) =>
                            handleRelationChange(
                                student.id,
                                "parentesco",
                                e.target.value,
                            )
                        }
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

                    {student.relacion.parentesco === "Otro" && (
                        <input
                            type="text"
                            placeholder="Especifique el parentesco"
                            value={student.relacion.parentesco_otro || ""}
                            onChange={(e) =>
                                handleRelationChange(
                                    student.id,
                                    "parentesco_otro",
                                    e.target.value,
                                )
                            }
                            className="block border border-gray-300 rounded-xl px-4 py-2 mt-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                        />
                    )}
                </div>

                {/* Radios */}
                <div className="space-y-4">
                    <RadioGroup
                        label="Responsable de Pagos"
                        value={student.relacion.responsable_pagos}
                        onChange={(value) =>
                            handleRelationChange(
                                student.id,
                                "responsable_pagos",
                                value,
                            )
                        }
                    />

                    <RadioGroup
                        label="Contacto Principal"
                        value={student.relacion.contacto_principal}
                        onChange={(value) =>
                            handleRelationChange(
                                student.id,
                                "contacto_principal",
                                value,
                            )
                        }
                    />
                </div>
            </div>
        </div>
    );
}

/* 🔬 Subcomponente interno reutilizable */
function RadioGroup({ label, value, onChange }) {
    return (
        <div>
            <label className="text-sm text-gray-600">{label}</label>
            <div className="flex gap-6 mt-2 text-gray-700">
                <label>
                    <input
                        type="radio"
                        checked={value === true}
                        onChange={() => onChange(true)}
                    />{" "}
                    Sí
                </label>
                <label>
                    <input
                        type="radio"
                        checked={value === false}
                        onChange={() => onChange(false)}
                    />{" "}
                    No
                </label>
            </div>
        </div>
    );
}

import { GraduationCap, Users } from "lucide-react";

export default function FindStudent({ student, handleAddStudent }) {
    return (
        <div
            key={student.id}
            className="group p-6 rounded-2xl bg-white border border-gray-200 hover:border-red-400 hover:shadow-lg transition-all duration-300 flex items-center justify-between mb-4 "
        >
            <div>
                <p className="font-semibold text-xl text-gray-700">
                    {student.nombre} {student.apellido_paterno}{" "}
                    {student.apellido_materno}
                </p>

                <div className="flex gap-10 mt-5">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-2 text-indigo-600 mb-2">
                            <GraduationCap size={18} />
                            <span className="text-sm font-medium text-gray-600">
                                Grado
                            </span>
                        </div>

                        <span className="px-4 py-2 rounded-xl bg-indigo-100 text-indigo-700 font-semibold text-lg shadow-sm">
                            {student.grado}
                        </span>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-2 text-violet-600 mb-2">
                            <Users size={18} />
                            <span className="text-sm font-medium text-gray-600">
                                Grupo
                            </span>
                        </div>

                        <span className="px-4 py-2 rounded-xl bg-violet-100 text-violet-700 font-semibold text-lg shadow-sm">
                            {student.grupo}
                        </span>
                    </div>
                </div>
            </div>

            <button
                type="button"
                onClick={() => handleAddStudent(student)}
                className="px-5 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition shadow-sm cursor-pointer"
            >
                Asignar
            </button>
        </div>
    );
}

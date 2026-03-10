import { useState } from "react";
import useTutor from "../../../hooks/useTutor";
import StudentPersonalForm from "./StudentPersonalForm";
import StudentAddressForm from "./StudentAddressForm";
import TutorSectionForm from "./TutorSectionForm";
import { Info } from "lucide-react";
import { ClipLoader } from "react-spinners";

export default function CreateStudent({ onClose }) {
    const { tutores } = useTutor();

    const [cargando, setCargando] = useState(false);

    const [formData, setFormData] = useState({
        student: {},
        address: {},
    });

    const handleStudentChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            student: {
                ...prev.student,
                [field]: value,
            },
        }));
    };

    const handleAddressChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            address: {
                ...prev.address,
                [field]: value,
            },
        }));
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <>
            <div className="flex gap-1 items-center mb-3">
                <Info />
                <p className="">
                    Complete el siguiente formulario para inscribir a un Alumno
                </p>
            </div>

            <div>
                <form
                    onSubmit={handleSubmitForm}
                    noValidate
                    className="space-y-8"
                >
                    <StudentPersonalForm
                        form={formData.student}
                        onChange={handleStudentChange}
                    />

                    <StudentAddressForm
                        form={formData.address}
                        onChange={handleAddressChange}
                    />

                    <TutorSectionForm tutores={tutores} />

                    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex justify-between gap-4 items-center">
                        <h1 className="text-3xl font-semibold text-red-400">
                            Acciones
                        </h1>

                        <div className="flex gap-5">
                            <button
                                type="button"
                                className="px-6 py-2 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
                                onClick={() => onClose(false)}
                            >
                                Cerrar
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition shadow-sm cursor-pointer w-44"
                            >
                                {cargando ? (
                                    <ClipLoader size={20} color="white" />
                                ) : (
                                    <p>Inscribir Alumno</p>
                                )}
                            </button>
                        </div>
                    </section>
                </form>
            </div>
        </>
    );
}

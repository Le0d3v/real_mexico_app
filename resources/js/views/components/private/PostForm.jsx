import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import SubmitButton from "../SubmitButton";
import api from "../../../config/axios";

export default function PostForm({ onSuccess }) {
    const [cargando, setCargando] = useState(false);

    const imagenRef = useRef();
    const tituloRef = useRef();
    const descripcionRef = useRef();

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        setCargando(true);

        const formData = new FormData();
        formData.append("contenido_multimedia", imagenRef.current.files[0]);
        formData.append("titulo", tituloRef.current.value);
        formData.append("descripcion", descripcionRef.current.value);

        try {
            const { data } = await api.post("/api/posts", formData);
            toast.success(data.message);
            e.target.reset();
            if (onSuccess) onSuccess();
        } catch (error) {
            console.log(error.response.data);
            if (error.response?.status === 422) {
                const validationErrors = error.response.data.errors;

                Object.values(validationErrors).forEach((messages) => {
                    messages.forEach((message) => {
                        toast.error(message);
                    });
                });
            } else {
                toast.error("Error inesperado.");
            }
        } finally {
            setCargando(false);
        }
    };

    return (
        <>
            <h1 className="text-center font-semibold text-xl">
                Completa el formulario para registrar una nueva publicación
            </h1>

            <form onSubmit={handleSubmitForm}>
                <div className="my-5">
                    <label className="block text-gray-700 font-semibold">
                        Imagen (.jpg / .png)
                    </label>

                    <input
                        type="file"
                        name="contenido_multimedia"
                        accept="image/jpeg,image/png"
                        ref={imagenRef}
                        required
                        className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
                        file:rounded-lg file:border-0 file:text-sm file:font-semibold
                        file:bg-blue-600 file:text-white hover:file:bg-blue-700
                        cursor-pointer bg-gray-50 border border-gray-300 rounded-lg p-2"
                    />
                </div>

                <div className="my-5">
                    <label className="block text-gray-700 font-semibold mb-1">
                        Título / Encabezado
                    </label>

                    <input
                        type="text"
                        required
                        ref={tituloRef}
                        className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg"
                    />
                </div>

                <div className="mt-5">
                    <label className="block text-gray-700 font-semibold mb-1">
                        Descripción
                    </label>

                    <textarea
                        ref={descripcionRef}
                        className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg h-36"
                    />
                </div>

                <div className="flex justify-end mt-4">
                    <SubmitButton cargando={cargando}>
                        Crear Publicación
                    </SubmitButton>
                </div>
            </form>
        </>
    );
}

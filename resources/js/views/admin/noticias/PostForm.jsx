import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import SubmitButton from "../../components/SubmitButton";
import usePosts from "../../../hooks/usePost";
import api from "../../../config/axios";

export default function PostForm({ post, onSuccess }) {
    const { createPost, updatePost } = usePosts();

    const [cargando, setCargando] = useState(false);
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [preview, setPreview] = useState(null);

    const imagenRef = useRef();

    useEffect(() => {
        if (post) {
            setTitulo(post.titulo);
            setDescripcion(post.descripcion);
            setPreview(`${api.defaults.baseURL}/storage/${post.multimedia}`);
        } else {
            setTitulo("");
            setDescripcion("");
            setPreview(null);
        }
    }, [post]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        setCargando(true);

        const formData = new FormData();
        formData.append("titulo", titulo);
        formData.append("descripcion", descripcion);

        if (imagenRef.current.files[0]) {
            formData.append("contenido_multimedia", imagenRef.current.files[0]);
        }

        try {
            let response;

            if (post) {
                response = await updatePost(post.id, formData);
            } else {
                response = await createPost(formData);
            }

            toast.success(response.message);

            if (onSuccess) onSuccess();
        } catch (error) {
            if (error?.status === 422) {
                Object.values(error.data.errors).forEach((messages) =>
                    messages.forEach((message) => toast.error(message)),
                );
            } else {
                toast.error("Error inesperado.");
            }
        } finally {
            setCargando(false);
        }
    };

    return (
        <>
            <h1 className="text-center font-semibold text-xl mb-4">
                {post
                    ? "Modifica la publicación llenando el formulario"
                    : "Registra una nueva publicación llenando el formulario"}
            </h1>

            <form onSubmit={handleSubmitForm}>
                <div className="my-5">
                    <label className="block font-semibold">
                        Imagen (.jpg / .png)
                    </label>

                    <input
                        type="file"
                        accept="image/jpeg,image/png"
                        ref={imagenRef}
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
                        file:rounded-lg file:border-0 file:text-sm file:font-semibold
                        file:bg-blue-600 file:text-white hover:file:bg-blue-700
                        cursor-pointer bg-gray-50 border border-gray-300 rounded-lg p-2"
                        required={!post}
                    />

                    {preview && (
                        <img
                            src={preview}
                            alt="preview"
                            className="mt-4 h-40 object-cover rounded-lg border"
                        />
                    )}
                </div>

                <div className="my-5">
                    <label className="block font-semibold">Título</label>
                    <input
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                        className="w-full p-2 border rounded border-gray-300"
                    />
                </div>

                <div className="my-5">
                    <label className="block font-semibold">Descripción</label>
                    <textarea
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        className="w-full p-2 border rounded h-32 border-gray-300"
                    />
                </div>

                <div className="flex justify-end">
                    <SubmitButton cargando={cargando}>
                        {post ? "Actualizar" : "Crear Publicación"}
                    </SubmitButton>
                </div>
            </form>
        </>
    );
}

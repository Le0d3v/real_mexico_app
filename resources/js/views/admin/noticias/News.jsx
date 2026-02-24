import React, { useState, useMemo } from "react";
import { Search, CirclePlus, Pen, Trash } from "lucide-react";
import Loader from "../../components/Loader";
import Modal from "../components//Modal";
import PostForm from "./PostForm";
import Swal from "sweetalert2";
import usePosts from "../../../hooks/usePost";
import api from "../../../config/axios";

export default function News() {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [editingPost, setEditingPost] = useState(null);

    const { posts, isLoading, error, deletePost } = usePosts();

    const filteredPosts = useMemo(() => {
        let result = [...posts];

        if (search.trim() !== "") {
            result = result.filter(
                (post) =>
                    post.titulo?.toLowerCase().includes(search.toLowerCase()) ||
                    post.descripcion
                        ?.toLowerCase()
                        .includes(search.toLowerCase()),
            );
        }

        if (filter === "recent") {
            result.sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at),
            );
        }

        if (filter === "old") {
            result.sort(
                (a, b) => new Date(a.created_at) - new Date(b.created_at),
            );
        }

        return result;
    }, [posts, search, filter]);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Las publicaciones eliminadas desaparecerán también de la sección Eventos y Noticias en la sección pública del sitio web. Esta Acción no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Sí, eliminar",
            reverseButtons: true,
        });

        if (result.isConfirmed) {
            try {
                const data = await deletePost(id);

                await Swal.fire({
                    title: "Eliminado",
                    text: data.message,
                    icon: "success",
                });
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: "No se pudo eliminar.",
                    icon: "error",
                });
            }
        }
    };

    if (isLoading) return <Loader />;
    if (error) return <p>Error al cargar publicaciones</p>;

    return (
        <>
            <div className="bg-white shadow-sm rounded-xl p-5 border border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div>
                        <p className="text-gray-600 text-sm">
                            Publicaciones Totales
                        </p>
                        <p className="text-3xl font-bold text-gray-800">
                            {posts.length}
                        </p>
                    </div>

                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar publicación..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-red-300 bg-gray-50
                            focus:bg-white focus:ring-2 focus:ring-red-400 focus:border-red-400
                            outline-none transition text-gray-700"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600 mb-1">
                            Ordenar por
                        </label>
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="px-4 py-3 rounded-xl border border-yellow-500 bg-yellow-400 text-black
                            focus:ring-2 focus:ring-white focus:border-white outline-none transition"
                        >
                            <option value="all">Sin Orden</option>
                            <option value="recent">Más Recientes</option>
                            <option value="old">Más Antiguas</option>
                        </select>
                    </div>
                </div>
            </div>

            <button
                onClick={() => setOpen(true)}
                className="p-3 rounded bg-red-500 flex gap-1 items-center text-white font-bold
                cursor-pointer hover:bg-red-600 hover:-translate-y-1 transition mt-4"
            >
                <CirclePlus />
                <p>Nueva Publicación</p>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6 gap-6">
                {filteredPosts.map((post) => (
                    <div
                        key={post.id}
                        className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                    >
                        <img
                            src={`${api.defaults.baseURL}/storage/${post.multimedia}`}
                            alt="imagen-post"
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        <div className="p-4">
                            <h1 className="font-bold text-xl text-gray-800 group-hover:text-blue-600 transition">
                                {post.titulo}
                            </h1>

                            <p className="text-sm text-gray-500 mt-1">
                                {post.fecha}
                            </p>

                            <p className="text-sm text-gray-600 mt-3 line-clamp-3">
                                {post.descripcion}
                            </p>

                            <div className="flex justify-center w-full">
                                <div className="flex gap-3 mt-5">
                                    <button
                                        onClick={() => {
                                            setEditingPost(post);
                                            setOpen(true);
                                        }}
                                        className="bg-blue-600 text-white p-2 cursor-pointer flex gap-1 items-center hover:scale-110 transition rounded"
                                    >
                                        <Pen />
                                        <p>Editar</p>
                                    </button>

                                    <button
                                        onClick={() => handleDelete(post.id)}
                                        className="bg-red-600 text-white p-2 cursor-pointer flex gap-1 items-center hover:scale-110 transition rounded"
                                    >
                                        <Trash />
                                        <p>Eliminar</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Modal
                isOpen={open}
                icon={<CirclePlus className="w-12 h-12" />}
                onClose={() => {
                    setOpen(false);
                    setEditingPost(null);
                }}
                size="lg"
                title={
                    editingPost
                        ? "Editar Publicación"
                        : "Crear Nueva Publicación"
                }
            >
                <PostForm
                    post={editingPost}
                    onSuccess={() => {
                        setOpen(false);
                        setEditingPost(null);
                    }}
                />
            </Modal>
        </>
    );
}

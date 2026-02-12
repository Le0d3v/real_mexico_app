import React, { useState, useEffect } from "react";
import { Search, CirclePlus, Eye, NotebookPen, Pen, Trash } from "lucide-react";
import Tittle from "../components/Tittle";
import api from "../../config/axios";
import useSWR from "swr";
import Loader from "../components/private/Loader";

export default function News() {
    const [searchPosts, setSearchPosts] = useState([]);

    const fetcher = () => api("/api/posts").then((res) => res.data);

    const { data, error, isLoading } = useSWR("/api/posts", fetcher, {
        refreshInterval: 1000,
    });

    const posts = data?.data ?? [];

    useEffect(() => {
        if (data?.data) {
            setSearchPosts(data.data);
        }
    }, [data]);

    const handleSearchPost = (e) => {
        const query = e.target.value.toLowerCase();

        const filteredPosts = posts.filter(
            (post) =>
                post.titulo?.toLowerCase().includes(query) ||
                post.descripcion?.toLowerCase().includes(query),
        );

        setSearchPosts(filteredPosts);
    };

    if (isLoading) return <Loader />;
    if (error) return <p>Error al cargar publicaciones</p>;

    return (
        <>
            <Tittle>Noticias</Tittle>
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
                            onChange={handleSearchPost}
                            className="
                                w-full pl-12 pr-4 py-3 
                                rounded-xl 
                                border border-emerald-300 
                                bg-gray-50 
                                focus:bg-white 
                                focus:ring-2 focus:ring-emerald-500 
                                focus:border-emerald-500 
                                outline-none 
                                transition
                                text-gray-700
                "
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600 mb-1">
                            Filtrar por
                        </label>
                        <select
                            className="
                            px-4 py-3 
                            rounded-xl 
                            border border-blue-500 
                            bg-blue-400 text-white
                            focus:ring-2 focus:ring-white
                            focus:border-white
                            outline-none 
                            transition"
                        >
                            <option value="all" selected>
                                Todas
                            </option>
                            <option value="recent">Más Recientes</option>
                            <option value="old">Más Antiguas</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button
                        className="p-3 rounded bg-blue-400 flex gap-1 items-center text-white font-bold
                                cursor-pointer hover:bg-blue-500 hover:-translate-y-1 transition mt-1"
                    >
                        <CirclePlus />
                        <p>Nueva Publicación</p>
                    </button>
                </div>
            </div>
            <div className="gtid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5">
                {searchPosts.map((post) => (
                    <div className="p-3 bg-gray-100 shadow rounded border-t-4 border-red-500 w-full md:w-1/3">
                        <img src={`/img/${post.multimeia}`} alt="imagen-post" />
                        <h1 className="text-center font-bold text-red-400 text-4xl">
                            {post.titulo}
                        </h1>
                        <div className="p-3 rounded bg-white mt-3">
                            <p className="text-sm">{post.descripcion}</p>
                        </div>
                        <p className="text-center text-gray-700 mt-5">
                            Acciones:
                        </p>
                        <div className="flex justify-center mt-3">
                            <div className="flex gap-3">
                                <button
                                    className="p-2 bg-emerald-500 rounded font-bold text-white cursor-pointer hover:bg-emerald-600 
                                        hover:-translate-y-1 transition flex gap-1"
                                >
                                    <Eye />
                                    <p>Ver Más</p>
                                </button>
                                <button
                                    className="p-2 bg-blue-500 rounded font-bold text-white cursor-pointer hover:bg-blue-600 
                                    hover:-translate-y-1 transition flex gap-1"
                                >
                                    <Pen />
                                    <p>Editar</p>
                                </button>
                                <button
                                    className="p-2 bg-red-500 rounded font-bold text-white cursor-pointer hover:bg-red-600 
                                        hover:-translate-y-1 transition flex gap-1"
                                >
                                    <Trash />
                                    <p>Eliminar</p>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

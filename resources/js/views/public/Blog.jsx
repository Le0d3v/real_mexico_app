import React from "react";
import Tittle from "../components/Tittle";
import Post from "./Post";
import api from "../../config/axios";
import useSWR from "swr";
import Loader from "../components/Loader";
import AnimatedSection from "./components/AnimationSection";

export default function Blog() {
    const fetcher = () => api("/api/posts").then((res) => res.data);

    const { data, error, isLoading } = useSWR("/api/posts", fetcher, {
        refreshInterval: 1000,
    });

    const posts = data?.data ?? [];

    if (isLoading) return <Loader />;
    if (error) return <p>Error al cargar publicaciones</p>;

    return (
        <div>
            <div className="py-8">
                <Tittle>¡Conoce Nuestras Últimas Novedades!</Tittle>
            </div>
            {posts.length == 0 ? (
                <p className="text-center font-semibold my-5 uppercase text-3xl">
                    Sin Noticias
                </p>
            ) : (
                <div className="p-3 md:px-44">
                    {posts.map((post) => (
                        <AnimatedSection>
                            <Post
                                imagen={`${api.defaults.baseURL}/storage/${post.multimedia}`}
                                titulo={post.titulo}
                                fecha={post.fecha}
                            >
                                {post.descripcion}
                            </Post>
                        </AnimatedSection>
                    ))}
                </div>
            )}
        </div>
    );
}

import React from "react";
import Tittle from "../components/Tittle";
import Post from "../components/public/Post";

export default function Blog() {
    return (
        <div>
            <Tittle>¡Conoce Nuestras Últimas Novedades!</Tittle>
            <div className="p-3 md:px-44 md:py-5">
                <Post
                    imagen={"/img/musica.jpg"}
                    titulo={"Inicia Taller de Guitarra"}
                    fecha={"Jueves 06 de Enero de 2026"}
                >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Fugit repellendus, delectus, molestiae architecto doloribus
                    adipisci iste cum non amet enim quisquam placeat. Illum
                    voluptate maiores veritatis optio porro deleniti
                    provident.lorem Lorem ipsum dolor, sit amet consectetur
                    adipisicing elit. Provident assumenda soluta exercitationem
                    quia officia iure libero eveniet molestiae temporibus
                    voluptatum laboriosam id molestias laborum mollitia eum
                    architecto, et voluptatibus! Tempora? Lorem ipsum dolor sit
                    amet consectetur adipisicing elit. Hic adipisci alias nihil
                    nisi ipsam ipsa dolore aliquid incidunt quidem nostrum quos
                    atque illo possimus at provident, quam similique quo minima?
                    Lorem,
                </Post>
                <Post
                    imagen={"/img/ingles.jpg"}
                    titulo={"Estudiantes de 1ro ganan concurso de Inglés"}
                    fecha={"Jueves 06 de Enero de 2026"}
                >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Fugit repellendus, delectus, molestiae architecto doloribus
                    adipisci iste cum non amet enim quisquam placeat. Illum
                    voluptate maiores veritatis optio porro deleniti
                    provident.lorem Lorem ipsum dolor, sit amet consectetur
                    adipisicing elit. Provident assumenda soluta exercitationem
                    quia officia iure libero eveniet molestiae temporibus
                    voluptatum laboriosam id molestias laborum mollitia eum
                    architecto, et voluptatibus! Tempora? Lorem ipsum dolor sit
                    amet consectetur adipisicing elit. Hic adipisci alias nihil
                    nisi ipsam ipsa dolore aliquid incidunt quidem nostrum quos
                    atque illo possimus at provident, quam similique quo minima?
                    Lorem,
                </Post>
            </div>
        </div>
    );
}

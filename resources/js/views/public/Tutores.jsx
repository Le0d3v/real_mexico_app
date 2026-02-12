import React from "react";
import Tittle from "../components/public/Tittle";
import { Phone } from "lucide-react";

export default function Tutores() {
    return (
        <>
            <Tittle>Para los Padres y Tutores</Tittle>
            <div className="mt-5 w-full bg-indigo-500 text-white my-3">
                <div className="flex gap-5 p-5">
                    <div className="w-1/2">
                        <img src="/img/director.jpg" alt="imagen-director" />
                    </div>
                    <div className="w-1/2">
                        <h1 className="text-3xl font-bold">
                            Mensaje del Director
                        </h1>
                        <p className="mt-5 text-justify">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Perspiciatis at soluta doloribus dolor animi
                            dolores perferendis maiores ea! Obcaecati
                            repellendus doloremque magni. Tempora rem aliquid
                            perspiciatis culpa voluptas sequi voluptatibus.
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Omnis nesciunt qui aspernatur deserunt
                            mollitia deleniti quae placeat soluta inventore vero
                            libero ipsam dolore nemo, esse iusto odit laborum
                            necessitatibus expedita. Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Quibusdam explicabo
                            esse non sit ipsum omnis commodi, maiores sapiente,
                            dolor, ipsam vel molestias dolorum quidem et
                            doloribus dignissimos! Ipsam, laudantium quae? Lorem
                            ipsum dolor sit amet consectetur adipisicing elit.
                            Culpa eos nesciunt id ad autem ut commodi nulla
                            veniam saepe? Reprehenderit expedita deserunt
                            incidunt pariatur numquam adipisci dolorem
                            voluptatem quibusdam et.
                        </p>
                    </div>
                </div>
                <hr />
                <div className="flex justify-between gap-5 p-5">
                    <img
                        src="/img/fondo.webp"
                        alt="imagen-logo"
                        className="w-1/2"
                    />
                    <div className="w-1/2">
                        <h1 className="text-3xl font-bold">Aplicación Móvil</h1>
                        <p className="mt-5 text-justify">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Perspiciatis at soluta doloribus dolor animi
                            dolores perferendis maiores ea! Obcaecati
                            repellendus doloremque magni. Tempora rem aliquid
                            perspiciatis culpa voluptas sequi voluptatibus.
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Omnis nesciunt qui aspernatur deserunt
                            mollitia deleniti quae placeat soluta inventore vero
                            libero ipsam dolore nemo, esse iusto odit laborum
                            necessitatibus expedita. Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Quibusdam explicabo
                            esse non sit ipsum omnis commodi, maiores sapiente,
                            dolor, ipsam vel molestias dolorum quidem et
                            doloribus dignissimos! Ipsam, laudantium quae? Lorem
                            ipsum dolor sit amet consectetur adipisicing elit.
                            Culpa eos nesciunt id ad autem ut commodi nulla
                            veniam saepe? Reprehenderit expedita deserunt
                            incidunt pariatur numquam adipisci dolorem
                            voluptatem quibusdam et.
                        </p>
                    </div>
                </div>
                <hr />
                <div className="flex justify-between gap-5 p-5">
                    <img
                        src="/img/fondo.webp"
                        alt="imagen-logo"
                        className="w-1/2"
                    />
                    <div className="w-1/2">
                        <h1 className="text-3xl font-bold">Lista de útiles</h1>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Dolor eligendi eaque ab animi neque placeat
                            laborum dignissimos a doloremque accusamus dolorum
                            aliquid, culpa debitis nihil quaerat quam autem
                            velit sunt!
                        </p>
                        <ul className="list-disc p-5">
                            <li>Lorem ipsum dolor sit amet,</li>
                            <li>Lorem ipsum dolor sit amet,</li>
                            <li>Lorem ipsum dolor sit amet,</li>
                            <li>Lorem ipsum dolor sit amet,</li>
                            <li>Lorem ipsum dolor sit amet,</li>
                            <li>Lorem ipsum dolor sit amet,</li>
                            <li>Lorem ipsum dolor sit amet,</li>
                            <li>Lorem ipsum dolor sit amet,</li>
                        </ul>
                        <button className="p-2 bg-yellow-500 rounded text-white cursor-pointer hover:bg-yellow-600 hover:-translate-y-1 transition font-bold">
                            Descargar Lista de Útiles
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

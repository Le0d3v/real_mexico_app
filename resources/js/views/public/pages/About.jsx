import React from "react";
import Tittle from "../components/Tittle";
import {
    BookOpenText,
    CircleDollarSign,
    Computer,
    ShieldCheck,
    UserCheck,
} from "lucide-react";

export default function About() {
    return (
        <div>
            <Tittle>¿Quiénes Somos?</Tittle>
            <div className="flex w-full gap-10 mt-5 p-5">
                <div className="w-1/2">
                    <p className="text-justify text-lg">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Quibusdam aperiam officia eveniet qui doloribus.
                        Ducimus ipsa, enim, error incidunt expedita ex pariatur
                        accusantium accusamus id, similique adipisci rerum
                        assumenda cupiditate? Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. Eveniet, nemo consequatur
                        nobis doloribus non id aspernatur autem ad harum
                        distinctio veritatis corrupti reprehenderit ea odio
                        commodi aut eius magnam recusandae.
                    </p>
                </div>
                <div className="w-1/2">
                    <img
                        src="https://imgs.search.brave.com/L-UEh3wkR_qZTra-a9v0O4tzcqxPLVSJVXscAU3MdOE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTE5/MTUwODM3Ni9lcy92/JUMzJUFEZGVvL3By/b2Zlc29yLWRlLWVz/Y3VlbGEtcHJpbWFy/aWEtcXVlLXRyYWJh/amEtY29uLWxvcy1l/c3R1ZGlhbnRlcy1l/bi1lbC1hdWxhLmpw/Zz9zPTY0MHg2NDAm/az0yMCZjPVlkWTRX/eVJES3FyRm1Ec2c0/dUtyNU82X0pmeXdV/YmkycF9jbm90Y3Fu/aHc9"
                        alt=""
                    />
                </div>
            </div>
            <div className="p-5">
                <Tittle>Conoce Nuestra Filosofía empresarial</Tittle>
                <div className="w-full flex gap-5 mt-5">
                    <div className="bg-gray-100 p-6 rounded shadow w-full">
                        <h1 className="text-2xl font-bold text-yellow-600 text-center">
                            Misión
                        </h1>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Accusamus tempora facere non aut repellat ad
                            hic. Eum in explicabo saepe facilis aut blanditiis
                            quasi quisquam quidem fugit, error a sapiente. Lorem
                            ipsum dolor sit amet consectetur adipisicing elit.
                            Esse adipisci assumenda vero corrupti necessitatibus
                            labore, expedita dolorum. Cumque, dolorem. Ab quam
                            porro voluptatum laboriosam placeat? Quidem rem sunt
                            voluptates sint?
                        </p>
                    </div>
                    <div className="bg-gray-100 p-6 rounded shadow w-full">
                        <h1 className="text-2xl font-bold text-yellow-600 text-center">
                            Visión
                        </h1>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Accusamus tempora facere non aut repellat ad
                            hic. Eum in explicabo saepe facilis aut blanditiis
                            quasi quisquam quidem fugit, error a sapiente. Lorem
                            ipsum dolor sit amet consectetur adipisicing elit.
                            Esse adipisci assumenda vero corrupti necessitatibus
                            labore, expedita dolorum. Cumque, dolorem. Ab quam
                            porro voluptatum laboriosam placeat? Quidem rem sunt
                            voluptates sint?
                        </p>
                    </div>
                    <div className="bg-gray-100 p-6 rounded shadow w-full">
                        <h1 className="text-2xl font-bold text-yellow-600 text-center">
                            Valores
                        </h1>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Accusamus tempora facere non aut repellat ad
                            hic. Eum in explicabo saepe facilis aut blanditiis
                            quasi quisquam quidem fugit, error a sapiente. Lorem
                            ipsum dolor sit amet consectetur adipisicing elit.
                            Esse adipisci assumenda vero corrupti necessitatibus
                            labore, expedita dolorum. Cumque, dolorem. Ab quam
                            porro voluptatum laboriosam placeat? Quidem rem sunt
                            voluptates sint?
                        </p>
                    </div>
                </div>
            </div>
            <div className="p-5">
                <Tittle>Nuestro Directorio</Tittle>
                <div className="grid grid-cols-5 gap-5">
                    <div className="p-5 bg-gray-100 rounded shadow border-t-2 border-red-400">
                        <h2 className="text-center text-xl font-bold text-gray-900">
                            Lic. Carlos Contreras
                        </h2>
                        <p className="text-center text-gray-500">Director</p>
                        <p className="text-center text-gray-500">
                            correo@correo.com
                        </p>
                        <p className="text-center text-gray-500">
                            221-223-3322
                        </p>
                    </div>
                    <div className="p-5 bg-gray-100 rounded shadow border-t-2 border-red-400">
                        <h2 className="text-center text-xl font-bold text-gray-900">
                            Lic. Carlos Contreras
                        </h2>
                        <p className="text-center text-gray-500">Director</p>
                        <p className="text-center text-gray-500">
                            correo@correo.com
                        </p>
                        <p className="text-center text-gray-500">
                            221-223-3322
                        </p>
                    </div>
                    <div className="p-5 bg-gray-100 rounded shadow border-t-2 border-red-400">
                        <h2 className="text-center text-xl font-bold text-gray-900">
                            Lic. Carlos Contreras
                        </h2>
                        <p className="text-center text-gray-500">Director</p>
                        <p className="text-center text-gray-500">
                            correo@correo.com
                        </p>
                        <p className="text-center text-gray-500">
                            221-223-3322
                        </p>
                    </div>
                    <div className="p-5 bg-gray-100 rounded shadow border-t-2 border-red-400">
                        <h2 className="text-center text-xl font-bold text-gray-900">
                            Lic. Carlos Contreras
                        </h2>
                        <p className="text-center text-gray-500">Director</p>
                        <p className="text-center text-gray-500">
                            correo@correo.com
                        </p>
                        <p className="text-center text-gray-500">
                            221-223-3322
                        </p>
                    </div>
                    <div className="p-5 bg-gray-100 rounded shadow border-t-2 border-red-400">
                        <h2 className="text-center text-xl font-bold text-gray-900">
                            Lic. Carlos Contreras
                        </h2>
                        <p className="text-center text-gray-500">Director</p>
                        <p className="text-center text-gray-500">
                            correo@correo.com
                        </p>
                        <p className="text-center text-gray-500">
                            221-223-3322
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

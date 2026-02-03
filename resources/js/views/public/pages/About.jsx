import React from "react";
import Tittle from "../components/Tittle";
import { CircleDollarSign, ShieldCheck, UserCheck } from "lucide-react";

export default function About() {
    return (
        <div>
            <Tittle>¿Quiénes Somos?</Tittle>
            <div className="flex w-full gap-10 mt-5 p-5">
                <div>
                    <p className="text-justify">
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
                    <p className="text-center text-lg font-bold mt-5">
                        ¿Por qué elejirnos?
                    </p>
                    <div className="flex justify-center mt-5">
                        <div className="flex gap-10">
                            <div className="w-full">
                                <div>
                                    <ShieldCheck
                                        className="mx-auto text-blue-400"
                                        size={70}
                                    />
                                </div>
                                <h1 className="text-lg font-bold  text-center">
                                    Instalaciones Seguras
                                </h1>
                            </div>
                            <div className="w-full">
                                <div>
                                    <UserCheck
                                        className="mx-auto text-green-400"
                                        size={70}
                                    />
                                </div>
                                <h1 className="text-lg font-bold  text-center">
                                    Personal Capacitado
                                </h1>
                            </div>
                            <div className="w-full">
                                <div>
                                    <CircleDollarSign
                                        className="mx-auto text-amber-400"
                                        size={70}
                                    />
                                </div>
                                <h1 className="text-lg font-bold  text-center">
                                    Precios Accesibles
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
                <img
                    src="https://imgs.search.brave.com/L-UEh3wkR_qZTra-a9v0O4tzcqxPLVSJVXscAU3MdOE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTE5/MTUwODM3Ni9lcy92/JUMzJUFEZGVvL3By/b2Zlc29yLWRlLWVz/Y3VlbGEtcHJpbWFy/aWEtcXVlLXRyYWJh/amEtY29uLWxvcy1l/c3R1ZGlhbnRlcy1l/bi1lbC1hdWxhLmpw/Zz9zPTY0MHg2NDAm/az0yMCZjPVlkWTRX/eVJES3FyRm1Ec2c0/dUtyNU82X0pmeXdV/YmkycF9jbm90Y3Fu/aHc9"
                    alt=""
                />
            </div>
        </div>
    );
}

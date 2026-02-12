import React from "react";
import Tittle from "../components/Tittle";
import { Lightbulb, Medal, Target } from "lucide-react";
import FilosofiaCard from "../components/public/FilosofiaCard";
import PersonalCard from "../components/public/PersonalCard";

export default function About() {
    return (
        <div className="">
            <div className="p-5 bg-gray-100 ">
                <Tittle>¿Quiénes Somos?</Tittle>
                <div className="flex w-full gap-10 flex-col md:flex-row mt-7">
                    <div className="w-full md:w-1/2">
                        <img
                            src="https://imgs.search.brave.com/L-UEh3wkR_qZTra-a9v0O4tzcqxPLVSJVXscAU3MdOE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTE5/MTUwODM3Ni9lcy92/JUMzJUFEZGVvL3By/b2Zlc29yLWRlLWVz/Y3VlbGEtcHJpbWFy/aWEtcXVlLXRyYWJh/amEtY29uLWxvcy1l/c3R1ZGlhbnRlcy1l/bi1lbC1hdWxhLmpw/Zz9zPTY0MHg2NDAm/az0yMCZjPVlkWTRX/eVJES3FyRm1Ec2c0/dUtyNU82X0pmeXdV/YmkycF9jbm90Y3Fu/aHc9"
                            alt=""
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <h1 className="font-bold text-2xl">
                            Instituto Real de México A.C.
                        </h1>
                        <p className="text-justify mt-1">
                            El Instituto Real de México A.C. es una institución
                            educativa fundada originalmente en la comunidad de
                            Chiautzingo, Puebla, con el objetivo de ofrecer una
                            educación de calidad basada en principios académicos
                            sólidos y en la formación de valores humanos. La
                            institución fue fundada por el padre de la Miss
                            Lupita Moreno Escalante, quien estableció las bases
                            legales y administrativas del proyecto educativo,
                            con una visión orientada al servicio de la comunidad
                            y al desarrollo integral de la niñez.
                            Posteriormente, los permisos y la representación
                            legal de la institución fueron traspasados a la Miss
                            Lupita Moreno Escalante, quien ha continuado y
                            fortalecido el proyecto educativo con compromiso y
                            responsabilidad.
                        </p>
                        <p className="text-justify">
                            Con el paso del tiempo y atendiendo al crecimiento y
                            a las necesidades de la comunidad educativa, el
                            Instituto Real de México A.C. se trasladó a la
                            localidad de Santa Ana Xalmimilulco, donde
                            actualmente ofrece sus servicios educativos,
                            manteniendo los principios y valores que le dieron
                            origen.
                        </p>
                    </div>
                </div>
            </div>
            <div className="p-5">
                <Tittle>Misión, Visión y Valores</Tittle>
                <div className="w-full flex gap-5 mt-5 flex-col md:flex-row">
                    <FilosofiaCard label={"Misión"} icon={Target}>
                        <p className="text-center">
                            Ofrecer educación de calidad en un ambiente seguro,
                            con una formación académica y en valores que
                            promueva el desarrollo integral del alumno.
                        </p>
                    </FilosofiaCard>
                    <FilosofiaCard label={"Visión"} icon={Lightbulb}>
                        <p className="text-center">
                            Ser una institución reconocida por su excelencia
                            educativa, compromiso con la comunidad y formación
                            de líderes con valores.
                        </p>
                    </FilosofiaCard>
                    <FilosofiaCard label={"Valores"} icon={Medal}>
                        <div className="flex justify-center">
                            <ul className="list-disc">
                                <li>Respeto</li>
                                <li>Honestidad</li>
                                <li>Responsabilidad</li>
                            </ul>
                        </div>
                    </FilosofiaCard>
                </div>
            </div>
            <div className="p-5">
                <Tittle>Nuestro Directorio</Tittle>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    <PersonalCard
                        nombre={"Juan Torres"}
                        puesto={"Director"}
                        email={"correo@correo.com"}
                        tel={"221-223-3221"}
                        img={"/img/director.jpg"}
                        className=" grid-center"
                    />
                    <PersonalCard
                        nombre={"Juan Torres"}
                        puesto={"Director"}
                        email={"correo@correo.com"}
                        tel={"221-223-3221"}
                        img={"/img/director.jpg"}
                        className=" grid-center"
                    />
                    <PersonalCard
                        nombre={"Juan Torres"}
                        puesto={"Director"}
                        email={"correo@correo.com"}
                        tel={"221-223-3221"}
                        img={"/img/director.jpg"}
                        className=" grid-center"
                    />
                    <PersonalCard
                        nombre={"Juan Torres"}
                        puesto={"Director"}
                        email={"correo@correo.com"}
                        tel={"221-223-3221"}
                        img={"/img/director.jpg"}
                        className=" grid-center"
                    />
                    <PersonalCard
                        nombre={"Juan Torres"}
                        puesto={"Director"}
                        email={"correo@correo.com"}
                        tel={"221-223-3221"}
                        img={"/img/director.jpg"}
                        className=" grid-center"
                    />
                </div>
            </div>
        </div>
    );
}

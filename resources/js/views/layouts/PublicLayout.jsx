import Header from "../components/public/Header";
import Footer from "../components/public/Footer";
import Home from "../public/Home";
import Contacto from "../public/Contacto";
import About from "../public/About";
import { useState } from "react";
import Blog from "../public/Blog";
import Inscripciones from "../public/Inscripciones";
import Estudiantes from "../public/Estudiantes";
import Tutores from "../public/Tutores";

export default function PublicLayout() {
    const [page, setPage] = useState(0);

    const pages = [
        <Home />,
        <Inscripciones />,
        <About />,
        <Estudiantes />,
        <Tutores />,
        <Blog />,
        <Contacto />,
    ];

    return (
        <>
            <Header setPage={setPage} page={page} />
            <main className="">{pages[page]}</main>
            <Footer />
        </>
    );
}

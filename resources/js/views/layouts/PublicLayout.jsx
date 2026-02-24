import Header from "../public/Header";
import Footer from "../public/Footer";
import Home from "../public/Home";
import Contacto from "../public/Contacto";
import About from "../public/About";
import { useState } from "react";
import Blog from "../public/Blog";
import Inscripciones from "../public/Inscripciones";
import Estudiantes from "../public/Estudiantes";
import Tutores from "../public/Tutores";
import { PhoneCall } from "lucide-react";

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

            <a
                href="https://wa.me/522212228893"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl transition animate-pulse"
            >
                <PhoneCall size={24} />
            </a>
        </>
    );
}

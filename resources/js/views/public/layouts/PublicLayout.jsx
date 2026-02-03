import Header from "../components/Header";
import Footer from "../components/Footer";
import Home from "../pages/Home";
import About from "../pages/About";
import { useState } from "react";
import Blog from "../pages/Blog";

export default function PublicLayout() {
    const [page, setPage] = useState(0);

    const pages = [<Home />, <About />, <Blog />];

    return (
        <>
            <Header setPage={setPage} page={page} />
            <main>{pages[page]}</main>
            <Footer />
        </>
    );
}

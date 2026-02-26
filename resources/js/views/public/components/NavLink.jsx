import { useEffect } from "react";

export default function NavLink({ children, index, page, setPage }) {
    const isActive = page === index;

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [page]);

    return (
        <div>
            <button
                onClick={() => setPage(index)}
                className={`transition hover:cursor-pointer hover:-translate-y-1
                    hover:text-amber-400 hover:font-bold
                    ${isActive ? "text-amber-400 font-bold" : "text-white"}`}
            >
                {children}
            </button>
            {isActive ? (
                <div className="w-full h-[1px] bg-yellow-400 rounded"></div>
            ) : (
                <></>
            )}
        </div>
    );
}

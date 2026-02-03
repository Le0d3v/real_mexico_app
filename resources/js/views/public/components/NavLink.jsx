export default function NavLink({ children, index, page, setPage }) {
    const isActive = page === index;

    return (
        <button
            onClick={() => setPage(index)}
            className={`transition hover:cursor-pointer hover:-translate-y-1
                hover:text-amber-400 hover:font-bold
                ${isActive ? "text-amber-400 font-bold" : "text-white"}`}
        >
            {children}
        </button>
    );
}

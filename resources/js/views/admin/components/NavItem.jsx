import { NavLink } from "react-router-dom";

export default function NavItem({
    index,
    icon: Icon,
    children,
    page,
    setPage,
    activeClass = "bg-amber-400 dark:bg-emerald-500/30 border-l-4 border-black font-black text-black text-lg",
}) {
    const isActive = page === index;
    return (
        <button
            onClick={() => setPage(index)}
            className={`flex items-center p-3 md:p-2 my-2 rounded-lg gap-1 transition-all duration-200 group 
                text-white dark:text-white text-sm cursor-pointer hover:bg-amber-400
                ${isActive ? activeClass : "hover:-translate-y-1 text-black"}`}
        >
            <Icon className="w-6 h-6" />
            <span className="sm:block md:hidden lg:block text-xl md:text-sm">
                {children}
            </span>
        </button>
    );
}

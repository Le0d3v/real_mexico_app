import { useEffect } from "react";
import useIRM from "../../../hooks/useIRM";

export default function NavItem({
    index,
    icon: Icon,
    children,
    page,
    setPage,
    fn,
}) {
    const isActive = page === index;

    const { adminContentScroll } = useIRM();

    useEffect(() => {
        adminContentScroll.current.scrollTo({
            top: 0,
            behavior: "auto",
        });
    }, [page]);

    return (
        <button
            onClick={() => {
                setPage(index);
                fn();
            }}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium cursor-pointer my-1
            ${
                isActive
                    ? "bg-red-700 text-white border-l-4 border-yellow-400"
                    : "text-white hover:bg-red-700/70"
            }`}
        >
            <Icon className="w-5 h-5" />
            <span className="hidden lg:block">{children}</span>
        </button>
    );
}

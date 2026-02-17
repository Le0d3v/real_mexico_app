import React from "react";

export default function MobileNavLink({
    children,
    index,
    page,
    setPage,
    onClick,
}) {
    const isActive = page === index;

    const handleClick = () => {
        setPage(index);
        if (onClick) onClick();
    };

    return (
        <button
            onClick={handleClick}
            className={`relative w-full flex items-center min-h-[56px]
            px-5 py-4 rounded-xl transition-all duration-300 text-left
            ${
                isActive
                    ? "bg-gradient-to-r from-yellow-500/20 to-yellow-400/5 text-yellow-400 font-semibold"
                    : "text-gray-200 hover:bg-white/5 hover:text-yellow-300"
            }`}
        >
            {isActive && (
                <span className="absolute left-0 top-0 h-full w-1 bg-yellow-400 rounded-r-md"></span>
            )}

            <span className="w-full">{children}</span>
        </button>
    );
}

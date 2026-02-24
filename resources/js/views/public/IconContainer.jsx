export default function IconContainer({ icon: Icon, title, children }) {
    return (
        <div
            className="
            group relative bg-white rounded-2xl p-8
            shadow-sm hover:shadow-xl
            transition-all duration-300
            border border-gray-100
            hover:-translate-y-2
        "
        >
            <div
                className="
                absolute inset-0 rounded-2xl
                bg-gradient-to-br from-yellow-400/5 to-red-500/5
                opacity-0 group-hover:opacity-100
                transition duration-300
            "
            ></div>

            <div
                className="
                relative w-14 h-14 flex items-center justify-center
                rounded-xl bg-yellow-400/10
                text-yellow-500
                group-hover:bg-yellow-400
                group-hover:text-black
                transition-all duration-300
            "
            >
                <Icon size={28} strokeWidth={2} />
            </div>

            <h3
                className="
                relative mt-6 text-lg font-semibold text-gray-900
                group-hover:text-black
                transition
            "
            >
                {title}
            </h3>

            <p className="relative mt-3 text-gray-600 leading-relaxed text-sm">
                {children}
            </p>

            <div
                className="
                absolute bottom-0 left-0 w-full h-1
                bg-gradient-to-r from-yellow-400 to-red-500
                scale-x-0 group-hover:scale-x-100
                origin-left transition-transform duration-300
                rounded-b-2xl
            "
            ></div>
        </div>
    );
}

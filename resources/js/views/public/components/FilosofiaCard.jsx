export default function FilosofiaCard({ children, label, icon: Icon }) {
    return (
        <div className="bg-white p-6 rounded shadow w-full border-b-4 border-yellow-600">
            <div className="flex justify-center">
                <Icon className="text-yellow-600" size={70} />
            </div>
            <h1 className="text-4xl font-bold text-yellow-600 text-center">
                {label}
            </h1>
            <div className="mt-2 text-lg">{children}</div>
        </div>
    );
}

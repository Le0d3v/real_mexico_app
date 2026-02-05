import React from "react";

export default function FilosofiaCard({ children, label, icon: Icon }) {
    return (
        <div className="bg-yellow-400 p-6 rounded shadow w-full">
            <div className="flex justify-center">
                <Icon className="text-red-600" size={70} />
            </div>
            <h1 className="text-3xl font-bold text-red-600 text-center">
                {label}
            </h1>
            <div className="mt-2">{children}</div>
        </div>
    );
}

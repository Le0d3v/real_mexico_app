import React from "react";

export default function IconContainer({ icon: Icon, tittle, children }) {
    return (
        <div className="w-full">
            <div>
                <Icon className="mx-auto text-green-400" size={90} />
            </div>
            <h1 className="text-2xl font-bold  text-center">{tittle}</h1>
            <p className="text-center text-sm">{children}</p>
        </div>
    );
}

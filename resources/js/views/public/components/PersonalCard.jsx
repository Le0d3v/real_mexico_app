import React from "react";

export default function PersonalCard({ nombre, puesto, email, tel, img }) {
    return (
        <div className="p-5 bg-gray-100 rounded shadow border-t-2 border-red-400">
            <img src={img} alt="imagen-personal" />
            <h2 className="text-center text-3xl font-bold text-gray-900">
                {nombre}
            </h2>
            <p className="text-center text-gray-500 text-lg">{puesto}</p>
            <p className="text-center text-gray-500 text-lg">{email}</p>
            <p className="text-center text-gray-500 text-lg">{tel}</p>
        </div>
    );
}

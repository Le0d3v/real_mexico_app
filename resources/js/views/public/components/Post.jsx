import React from "react";

export default function Post({ children, titulo, imagen, fecha }) {
    return (
        <div className="w-full p-3 md:p-5 bg-white border-2 border-yellow-500 rounded-lg shadow-xl my-3">
            <div className="flex gap-5 flex-col lg:flex-row">
                <div className="w-full lg:w-1/2">
                    <img src={imagen} alt="imagen-post" />
                </div>
                <div className="w-full lg:w-1/2">
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-400">
                            Redactado por:
                            <span className="font-bold text-gray-700">
                                {" "}
                                Admin
                            </span>
                        </p>
                        <p className="text-sm text-gray-400">{fecha}</p>
                    </div>
                    <div className="mt-3">
                        <h1 className="text-4xl font-bold ">{titulo}</h1>
                        <p className="text-sm mt-1">{children}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

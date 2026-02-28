import React from "react";

export default function CreateStudent({ onClose }) {
    return (
        <>
            <div className="space-y-8">
                <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex justify-between gap-4 items-center">
                    <h1 className="text-3xl font-semibold text-red-400">
                        Acciones
                    </h1>
                    <div className="flex gap-5">
                        <button
                            type="button"
                            className="px-6 py-2 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
                            onClick={() => onClose(false)}
                        >
                            Cerrar
                        </button>
                    </div>
                </section>
            </div>
        </>
    );
}

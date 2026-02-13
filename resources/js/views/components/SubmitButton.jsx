import React from "react";
import { ClipLoader } from "react-spinners";
import { useState, useEffect } from "react";

export default function SubmitButton({ children, cargando }) {
    return (
        <button
            className={`bg-blue-600 text-white p-2 mt-5 rounded font-bold hover:bg-blue-700 cursor-pointer 
              hover:-translate-y-1 transition text-lg w-full md:max-w-auto`}
            disabled={cargando}
        >
            {cargando ? <ClipLoader color="#ffffff" size={20} /> : children}
        </button>
    );
}

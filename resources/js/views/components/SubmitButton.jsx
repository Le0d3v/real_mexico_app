import React from "react";
import { ClipLoader } from "react-spinners";

export default function SubmitButton({ children, loading }) {
    return (
        <button
            className="bg-blue-600 text-white p-2 mt-5 rounded font-bold hover:bg-blue-700 cursor-pointer 
              hover:-translate-y-1 transition text-lg w-full md:w-auto"
        >
            {loading ? <ClipLoader /> : children}
        </button>
    );
}

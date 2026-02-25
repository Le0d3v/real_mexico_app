import React from "react";

export default function InfoItem({ icon, label, value }) {
    return (
        <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-sm transition">
            <div className="text-red-600 mt-1">{icon}</div>
            <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-base font-semibold text-gray-800 break-words">
                    {value || "N/A"}
                </p>
            </div>
        </div>
    );
}

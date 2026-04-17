import React from "react";

export default function InputField({
  icon,
  label,
  type = "text",
  value,
  onChange,
  disabled = false,
  placeholder,
}) {
  return (
    <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-200 focus-within:ring-2 focus-within:ring-red-500 transition">
      <div className="text-red-600 mt-1">{icon}</div>
      <div className="w-full">
        <label
          className="text-sm text-gray-500 block mb-1"
          htmlFor={label.toLowerCase().replace(/\s+/g, "-")}
        >
          {label}
        </label>
        <input
          type={type}
          className={
            `w-full bg-transparent outline-none text-gray-800 font-medium` +
            (disabled ? " cursor-not-allowed opacity-60" : "")
          }
          id={label.toLowerCase().replace(/\s+/g, "-")}
          placeholder={placeholder || `Ingrese ${label.toLowerCase()}`}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
    </div>
  );
}

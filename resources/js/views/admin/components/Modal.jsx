import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function Modal({
  isOpen = false,
  onClose,
  title,
  children,
  icon: Icon,
  size = "xl",
  closeOnOverlay = true,
  closeOnEsc = true,
}) {
  const [isVisible, setIsVisible] = useState(isOpen);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsAnimatingOut(false);
    } else if (isVisible) {
      setIsAnimatingOut(true);
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 250); // duración de salida

      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isVisible) return;

    const handleEsc = (e) => {
      if (e.key === "Escape" && closeOnEsc) {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isVisible, closeOnEsc, onClose]);

  if (!isVisible) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-3xl",
    xl: "max-w-5xl",
    full: "max-w-[95vw]",
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm
                        ${isAnimatingOut ? "animate-fadeOut" : "animate-fadeIn"}`}
      onClick={() => closeOnOverlay && onClose?.()}
    >
      <div
        className={`
        relative w-full ${sizeClasses[size]}
        max-h-[90vh]
        bg-white rounded-2xl shadow-2xl
        border border-gray-200
        overflow-hidden
        ${isAnimatingOut ? "animate-modalOut" : "animate-modalIn"}
    `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        {(title || onClose) && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-b-gray-400">
            <div className="flex gap-3 items-center">
              <div className="flex justify-center items-center p-2 rounded-full bg-blue-500/70 text-white w-12 h-12">
                {Icon}
              </div>
              <h2 className="text-3xl font-semibold">{title}</h2>
            </div>

            {onClose && (
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition cursor-pointer"
              >
                <X className="w-7 h-7 text-gray-600" />
              </button>
            )}
          </div>
        )}

        {/* 🔥 SCROLL INTERNO */}
        <div className="max-h-[calc(90vh-80px)] overflow-y-auto px-6 py-3 ml-3">
          {children}
        </div>
      </div>
    </div>
  );
}

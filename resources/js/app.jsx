import React from "react";
import { createRoot } from "react-dom/client";
import "../css/app.css";
import Router from "./router";
import { IRMProvider } from "./context/IRMProvider";
import "driver.js/dist/driver.css";

const container = document.getElementById("app");

if (!container) {
    throw new Error("No se encontró el elemento #app");
}

createRoot(container).render(
    <React.StrictMode>
        <IRMProvider>
            <Router />
        </IRMProvider>
    </React.StrictMode>,
);

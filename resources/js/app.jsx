import React from "react";
import { createRoot } from "react-dom/client";

import Router from "./router";

const container = document.getElementById("app");

if (!container) {
    throw new Error("No se encontró el elemento #app");
}

createRoot(container).render(
    <React.StrictMode>
        <Router />
    </React.StrictMode>,
);

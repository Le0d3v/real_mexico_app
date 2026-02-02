import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./views/public/Home";
import Login from "./views/auth/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/auth",
        element: <Login />,
    },
]);

export default function Router() {
    return <RouterProvider router={router} />;
}

import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./views/auth/Login";
import PublicLayout from "./views/public/layouts/PublicLayout";
import AdminLayout from "./views/admin/layouts/AdminLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <PublicLayout />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/admin",
        element: <AdminLayout />,
    },
]);

export default function Router() {
    return <RouterProvider router={router} />;
}

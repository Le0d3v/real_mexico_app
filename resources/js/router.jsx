import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./views/auth/Login";
import PublicLayout from "./views/layouts/PublicLayout";
import AdminLayout from "./views/layouts/AdminLayout";
import TutorLayout from "./views/layouts/TutorLayout";

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
  {
    path: "/home",
    element: <TutorLayout />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}

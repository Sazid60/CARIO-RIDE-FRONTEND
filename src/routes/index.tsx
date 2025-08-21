import App from "@/App";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

import { generateRoutes } from "@/utils/generateRoutes";

import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";

import { withAuth } from "@/utils/withAuth";
import Unauthorized from "@/pages/Unauthorized";
import { role } from "@/constants/role";
import type { TRole } from "@/types";
import { HomePage } from "@/pages/HomePage";
import { ErrorPage } from "@/pages/ErrorPage";


export const router = createBrowserRouter(
    [
        {
            Component: App,
            errorElement: <ErrorPage />,
            path: "/",
            children: [
                {
                    Component: HomePage,
                    index: true,
                },
            ]
        },
        {
            Component: withAuth(DashboardLayout, role.admin as TRole),
            path: "/admin",

            children: [
                { index: true, element: <Navigate to="/admin/analytics" /> },
                ...generateRoutes(adminSidebarItems)]
        },
        {
            Component: Login,
            path: "login"
        },
        {
            Component: Register,
            path: "register"
        },

        {
            path: "/unauthorized",
            Component: Unauthorized,
        },

    ]
)
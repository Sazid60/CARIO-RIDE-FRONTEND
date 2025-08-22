import App from "@/App";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Login from "@/pages/PublicRoutes/Auth/Login";
import Register from "@/pages/PublicRoutes/Auth/Register";

import { generateRoutes } from "@/utils/generateRoutes";

import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";

import { withAuth } from "@/utils/withAuth";
import Unauthorized from "@/pages/PublicRoutes/Error/Unauthorized";
import { role } from "@/constants/role";
import type { TRole } from "@/types";
import { HomePage } from "@/pages/PublicRoutes/Home/HomePage";
import { ErrorPage } from "@/pages/PublicRoutes/Error/ErrorPage";
import Contact from "@/pages/PublicRoutes/Contact/Contact";
import About from "@/pages/PublicRoutes/About/About";
import Features from "@/pages/PublicRoutes/Feature/Features";
import FAQ from "@/pages/PublicRoutes/FAQ/Faq";



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
                {
                    Component: About,
                    path: "/about",
                },
                {
                    Component: Contact,
                    path: "/contact",
                },
                {
                    Component: Features,
                    path: "/features",
                },
                {
                    Component: FAQ,
                    path: "/faq",
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
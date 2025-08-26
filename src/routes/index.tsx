import App from "@/App";
import Login from "@/pages/PublicRoutes/Auth/Login";
import Register from "@/pages/PublicRoutes/Auth/Register";



import { createBrowserRouter, Navigate } from "react-router";


import { withAuth } from "@/utils/withAuth";
import Unauthorized from "@/pages/PublicRoutes/Error/Unauthorized";
import { role } from "@/constants/role";
import type { TRole } from "@/types";
import { HomePage } from "@/pages/PublicRoutes/Home/HomePage";
import { ErrorPage } from "@/pages/PublicRoutes/Error/ErrorPage";
import Contact from "@/pages/PublicRoutes/Contact/Contact";
import About from "@/pages/PublicRoutes/About/About";
import Features from "@/pages/PublicRoutes/Feature/Features";
import FrequentQuestions from "@/pages/PublicRoutes/FAQ/FrequentQuestions";
import BookRide from "@/pages/RiderRoutes/BookRide";
import MyRide from "@/pages/RiderRoutes/MyRide";
import StartDriving from "@/pages/DriverRoutes/StartDriving";
import ContactAdmin from "@/pages/PublicRoutes/Contact/ContactAdmin";
import RideDetails from "@/pages/DriverRoutes/RideDetails";
import RegisterAsDriver from "@/pages/RiderRoutes/RegisterAsDriver";
import { riderSidebarItems } from "./riderSidebarItems";
import { generateRoutes } from "@/utils/generateRoutes";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import MyRideDetails from "@/pages/RiderRoutes/RiderDashboardComponents/MyRideDetails";
import { driverSidebarItems } from "./driverSidebarItems";
import DriverRideDetails from "@/pages/DriverRoutes/DriverDashboardComponents/DriverRideDetails";
import { adminSidebarItems } from "./adminSidebarItems";
import AdminRideDetails from "@/pages/AdminRoutes/AdminDashboardComponents/AdminRideDetails";






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
                    Component: FrequentQuestions,
                    path: "/faq",
                },
                {
                    Component: withAuth(BookRide, role.rider as TRole),
                    path: "/book-ride",
                },
                {
                    Component: withAuth(MyRide, role.rider as TRole),
                    path: "/my-ride/:rideId",
                },
                {
                    Component: withAuth(StartDriving, role.driver as TRole),
                    path: "/start-driving",
                },
                {
                    Component: ContactAdmin,
                    path: "/contact-admin",
                },
                {
                    Component: withAuth(RideDetails, role.driver as TRole),
                    path: "/my-accepted-ride/:id",
                },
                {
                    Component: withAuth(RegisterAsDriver, role.rider as TRole),
                    path: "/driver-register",
                },
                {
                    Component: withAuth(MyRideDetails, role.rider as TRole),
                    path: `/my-ride-details/:id`,
                },
                {
                    Component: withAuth(DriverRideDetails, role.driver as TRole),
                    path: `/my-accepted-ride-details/:id`,
                },
                {
                    Component: withAuth(AdminRideDetails, role.admin as TRole),
                    path: `/single-ride-details/:id`,
                },

            ]
        },
        {
            Component: withAuth(DashboardLayout, role.rider as TRole),
            path: "/rider",
            children: [
                { index: true, element: <Navigate to="/rider/analytics" /> },
                ...generateRoutes(riderSidebarItems)
            ]
        },
        {
            Component: withAuth(DashboardLayout, role.driver as TRole),
            path: "/driver",
            children: [
                { index: true, element: <Navigate to="/driver/analytics" /> },
                ...generateRoutes(driverSidebarItems)
            ]
        },
        {
            Component: withAuth(DashboardLayout, role.admin as TRole),
            path: "/admin",
            children: [
                { index: true, element: <Navigate to="/admin/analytics" /> },
                ...generateRoutes(adminSidebarItems)
            ]
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
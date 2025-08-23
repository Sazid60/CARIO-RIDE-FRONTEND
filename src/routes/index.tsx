import App from "@/App";
import Login from "@/pages/PublicRoutes/Auth/Login";
import Register from "@/pages/PublicRoutes/Auth/Register";



import { createBrowserRouter} from "react-router";


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
                    Component:FrequentQuestions ,
                    path: "/faq",
                },
                {
                    Component:withAuth(BookRide, role.rider as TRole) ,
                    path: "/book-ride",
                },
                {
                    Component:withAuth(MyRide, role.rider as TRole) ,
                    path: "/my-ride",
                },
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
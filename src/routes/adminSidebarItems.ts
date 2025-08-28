


import AdminAnalytics from "@/pages/AdminRoutes/AdminDashboardComponents/AdminAnalytics";
import AdminRideHistory from "@/pages/AdminRoutes/AdminDashboardComponents/AdminRideHistory";
import ManageDrivers from "@/pages/AdminRoutes/AdminDashboardComponents/ManageDrivers";
import ManageFeedBacks from "@/pages/AdminRoutes/AdminDashboardComponents/ManageFeedBacks";

import ManageUsers from "@/pages/AdminRoutes/AdminDashboardComponents/ManageUsers";
import UpdateProfile from "@/pages/PublicRoutes/Auth/UpdateProfile";

import type { ISidebarItems } from "@/types";



export const adminSidebarItems : ISidebarItems[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Analytics",
                url: "/admin/analytics",
                component: AdminAnalytics
            }
        ],
    },
    {
        title: "Ride History",
        items: [
            {
                title: "All Rides",
                url: "/admin/ride-history",
                component: AdminRideHistory
            }
        ],
    },
    {
        title: "User Management",
        items: [
            {
                title: "Manage Users",
                url: "/admin/manage-users",
                component: ManageUsers
            },
            {
                title: "Manage Drivers",
                url: "/admin/manage-drivers",
                component: ManageDrivers
            },
            {
                title: "Manage Feedbacks",
                url: "/admin/manage-feedbacks",
                component: ManageFeedBacks
            }
        ],
    },
    {
        title: "Manage Admin Profile",
        items: [
            {
                title: "Update Profile",
                url: "/admin/update-profile",
                component: UpdateProfile
            }
        ],
    },
]
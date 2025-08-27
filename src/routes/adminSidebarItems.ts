


import AdminAnalytics from "@/pages/AdminRoutes/AdminDashboardComponents/AdminAnalytics";
import AdminRideHistory from "@/pages/AdminRoutes/AdminDashboardComponents/AdminRideHistory";

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
        title: "Manage Profile",
        items: [
            {
                title: "Update Profile",
                url: "/admin/ride-history",
                component: AdminRideHistory
            }
        ],
    },
]
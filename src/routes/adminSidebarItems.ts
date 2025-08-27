


import AdminRideHistory from "@/pages/AdminRoutes/AdminDashboardComponents/AdminRideHistory";

import type { ISidebarItems } from "@/types";



export const adminSidebarItems : ISidebarItems[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Analytics",
                url: "/admin/analytics",
                component: AdminRideHistory
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
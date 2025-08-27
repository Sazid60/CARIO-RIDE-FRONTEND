

import DriverAnalytics from "@/pages/DriverRoutes/DriverDashboardComponents/DriverAnalytics";
import DriverRideHistory from "@/pages/DriverRoutes/DriverDashboardComponents/DriverRideHistory";
import UpdateProfile from "@/pages/PublicRoutes/Auth/UpdateProfile";


import type { ISidebarItems } from "@/types";



export const driverSidebarItems : ISidebarItems[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Analytics",
                url: "/driver/analytics",
                component: DriverAnalytics
            }
        ],
    },
    {
        title: "Ride History",
        items: [
            {
                title: "Riding History",
                url: "/driver/ride-history",
                component: DriverRideHistory
            }
        ],
    },
    {
        title: "Manage User Profile",
        items: [
            {
                title: "Update Profile",
                url: "/driver/update-profile",
                component: UpdateProfile
            }
        ],
    }
]
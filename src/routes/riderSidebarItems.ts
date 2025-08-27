

import UpdateProfile from "@/pages/PublicRoutes/Auth/UpdateProfile";
import RideAnalytics from "@/pages/RiderRoutes/RiderDashboardComponents/RideAnalytics";
import RiderRideHistory from "@/pages/RiderRoutes/RiderDashboardComponents/RiderRideHistory";



import type { ISidebarItems } from "@/types";



export const riderSidebarItems : ISidebarItems[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Analytics",
                url: "/rider/analytics",
                component: RideAnalytics
            }
        ],
    },
    {
        title: "Ride History",
        items: [
            {
                title: "My Ride History",
                url: "/rider/ride-history",
                component: RiderRideHistory
            }
        ],
    },
    {
        title: "Manage Profile",
        items: [
            {
                title: "Update Rider Profile",
                url: "/rider/update-profile",
                component: UpdateProfile
            }
        ],
    },
]


import type { ISidebarItems } from "@/types";
import HeroSection from '../components/modules/HomePage/HeroSection';






export const adminSidebarItems : ISidebarItems[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Analytics",
                url: "/admin/analytics",
                component: HeroSection
            }
        ],
    }
]
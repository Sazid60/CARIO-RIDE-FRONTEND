
import { role } from "@/constants/role";
import { riderSidebarItems } from "@/routes/riderSidebarItems";


import type { TRole } from "@/types";

export const generateSidebarItems = (userRole: TRole) => {

    switch (userRole) {
        case role.rider: {
            return [...riderSidebarItems]
        }

        default:
            return []

    }
}
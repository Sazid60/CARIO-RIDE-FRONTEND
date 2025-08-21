
import { role } from "@/constants/role";
import { adminSidebarItems } from "@/routes/adminSidebarItems";

import type { TRole } from "@/types";

export const generateSidebarItems = (userRole: TRole) => {

    switch (userRole) {
        case role.admin: {
            return [...adminSidebarItems]
        }

        default:
            return []

    }
}
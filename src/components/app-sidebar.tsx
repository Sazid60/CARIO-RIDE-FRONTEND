import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Logo from "@/assets/icons/Logo"
import { Link } from "react-router"
import { generateSidebarItems } from "@/utils/generateSidebarItems"
import { useUserInfoQuery } from "@/redux/features/auth/auth.api"



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {data : userData} = useUserInfoQuery(undefined)
  const data = {
    navMain: generateSidebarItems(userData?.data?.role)
  }

  console.log(data)
  return (
    <Sidebar className="" {...props}>
      <SidebarHeader className="bg-background pl-4 py-4">
        <Link to="/"><Logo /></Link>
      </SidebarHeader>
      <SidebarContent className="bg-background border-t">
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className="rounded-none" >{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem className="rounded-none" key={item.title}>
                    <SidebarMenuButton className="rounded-none" asChild>
                      <Link to={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

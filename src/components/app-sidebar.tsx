"use client"

import * as React from "react"

import { NavDocuments } from "@src/components/nav-documents"
import { NavMain } from "@src/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@src/components/ui/sidebar"
import { 
  IconAperture,
  IconDashboard, IconGlassChampagne, 
  IconHandLoveYou, IconHome, 
  IconInfoCircle, IconMessage2, 
  IconPaint, IconUser 
} from "@tabler/icons-react"
import { cn } from "@src/lib/utils"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: <IconDashboard />,
    },
  ],
  mainSiteLinks: [
    {
      name: "Home",
      url: "/",
      icon: <IconHome />,
    },
    {
      name: "Despre",
      url: "/despre",
      icon: <IconInfoCircle />,
    },
    {
      name: "Contact",
      url: "/contact",
      icon: <IconMessage2 />,
    },
    {
      name: "Evenimente",
      url: "/evenimente",
      icon: <IconGlassChampagne />,
    },
    {
      name: "Concerte & Festivaluri",
      url: "/concerte",
      icon: <IconHandLoveYou />,
    },
    {
      name: "Proiecte personale",
      url: "/proiecte-personale",
      icon: <IconUser />,
    },
    {
      name: "Portrete",
      url: "/portrete",
      icon: <IconPaint />,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="#">
                <IconAperture className="size-5!" />
                <span className={cn(
                  "text-base font-semibold",
                  "sm:text-xl",
                )}>MifariRaw</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.mainSiteLinks} />
      </SidebarContent>
    </Sidebar>
  )
}

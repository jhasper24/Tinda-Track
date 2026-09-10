import { redirect } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { getCurrentUser } from "@/dal/session"
import { NavMain } from "./NavMain"
import { NavStore } from "./NavStore"
import { NavUser } from "./NavUser"

export async function AppSideBar() {
  const session = await getCurrentUser()
  if (session == null) redirect("/signin")

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <NavStore />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <NavMain />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}

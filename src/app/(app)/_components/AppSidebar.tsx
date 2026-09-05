import { LogOut } from "lucide-react"
import { redirect } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { signOutAction } from "@/server/actions/auth"
import { getCurrentUser } from "@/server/dal/session"
import { NavMain } from "./NavMain"
import { NavStore } from "./NavStore"

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
        <SidebarMenu>
          <SidebarMenuItem>
            <form action={signOutAction} className="w-full">
              <SidebarMenuButton type="submit">
                <LogOut />
                <span>Log Out</span>
              </SidebarMenuButton>
            </form>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

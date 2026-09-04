import { LogOut, Store } from "lucide-react"
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
import { findStoreByOwnerId } from "@/server/dal/store"
import { NavMain } from "./NavMain"

export async function AppSideBar() {
  const session = await getCurrentUser()
  if (session == null) redirect("/signin")

  const store = await findStoreByOwnerId(session.user.id)

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<div />} className="pointer-events-none">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                <Store />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{store?.name ?? "TindaTrack"}</span>
                <span className="truncate text-muted-foreground text-xs">Owner</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
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

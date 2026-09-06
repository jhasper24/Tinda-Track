import { Plus, Store } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { getCurrentUser } from "@/server/dal/session"
import { findStoreByOwnerId } from "@/server/dal/store"

export async function NavStore() {
  const session = await getCurrentUser()
  if (session == null) redirect("/signin")

  const store = await findStoreByOwnerId(session.user.id)

  if (store == null) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" className="p-0" render={<Link href="/create-store" />}>
            <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
              <Plus />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">Create Store</span>
              <span className="truncate text-muted-foreground text-xs">Set up your store</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" className="pointer-events-none p-0" render={<div />}>
          <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
            <Store />
          </div>
          <div className="grid flex-1 text-left text-sm">
            <span className="truncate font-medium">{store.name}</span>
            <span className="truncate text-muted-foreground text-xs">Owner</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

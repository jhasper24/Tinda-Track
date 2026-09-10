import { ChevronsUpDown, LogOut } from "lucide-react"
import { redirect } from "next/navigation"
import { signOutAction } from "@/app/(app)/_actions/auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { getCurrentUser } from "@/dal/session"

export async function NavUser() {
  const session = await getCurrentUser()
  if (session == null) {
    redirect("/signin")
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton size="lg" className="p-0">
                <Avatar className="size-8 shrink-0">
                  <AvatarImage src={session.user.image ?? undefined} alt={session.user.name} />
                  <AvatarFallback>{session.user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1">
                  <span className="truncate font-medium text-sm">{session.user.email}</span>
                  <span className="truncate text-muted-foreground text-xs">
                    {session.user.name}
                  </span>
                </div>
                <ChevronsUpDown />
              </SidebarMenuButton>
            }
          ></DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-64">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5">
                  <Avatar className="size-8">
                    <AvatarImage src={session.user.image ?? undefined} alt={session.user.name} />
                    <AvatarFallback className="rounded-lg">
                      {session.user.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1">
                    <span className="truncate font-medium text-foreground text-sm">
                      {session.user.email}
                    </span>
                    <span className="truncate text-muted-foreground text-xs">
                      {session.user.name}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <form action={signOutAction}>
                <DropdownMenuItem nativeButton render={<button type="submit" className="w-full" />}>
                  <LogOut className="ml-0.5" />
                  Log Out
                </DropdownMenuItem>
              </form>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

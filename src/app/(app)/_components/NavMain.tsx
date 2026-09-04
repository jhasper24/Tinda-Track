"use client"

import { LayoutDashboard } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"

const navItems = [
  {
    title: "dashboard",
    Icon: LayoutDashboard,
    href: "/dashboard",
  },
] as const

export function NavMain() {
  const pathName = usePathname()

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton isActive={pathName === item.href} render={<Link href={item.href} />}>
            <item.Icon />
            <span>{item.title}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}

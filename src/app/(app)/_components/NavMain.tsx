"use client"

import { LayoutDashboard, LayoutList } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"

const navItems = [
  {
    title: "Dashboard",
    Icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Product",
    Icon: LayoutList,
    href: "/product",
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

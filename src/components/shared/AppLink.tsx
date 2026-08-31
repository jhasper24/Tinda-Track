import Link from "next/link"
import type React from "react"
import { cn } from "@/lib/utils"

export function AppLink({
  className,
  href,
  children,
  ...props
}: React.ComponentProps<typeof Link>) {
  return (
    <Link className={cn("text-blue-500 hover:underline", className)} {...props} href={href}>
      {children}
    </Link>
  )
}

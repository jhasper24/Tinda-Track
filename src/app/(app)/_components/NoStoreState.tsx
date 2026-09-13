import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"

export function NoStoreState() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="font-medium">You don't have a store yet.</div>
      <Link href="/create-store" className={buttonVariants()}>
        Create Store
      </Link>
    </div>
  )
}

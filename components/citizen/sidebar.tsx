"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { FileText, Home, MessageSquare, Settings, History } from "lucide-react"

const sidebarItems = [
  { name: "Home", href: "/citizen-portal", icon: Home },
  { name: "Submit Feedback", href: "/citizen-portal/submit-feedback", icon: MessageSquare },
  { name: "Policies", href: "/citizen-portal/policies", icon: FileText },
  { name: "My Submissions", href: "/citizen-portal/my-submissions", icon: History },
  { name: "Settings", href: "/citizen-portal/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="pb-12 min-h-screen">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
                  )}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}


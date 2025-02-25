"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SwitchCamera } from "lucide-react"
import { useRouter } from "next/navigation"

export function RoleSwitcher() {
  const router = useRouter()
  const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "{}") : {}

  if (user.role !== "admin") return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <SwitchCamera className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Switch view</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => router.push("/dashboard")}>Admin Dashboard</DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/citizen-portal")}>Citizen Portal</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, LogOut, MessageSquare, Settings, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { RoleSwitcher } from "@/components/role-switcher"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

export function Header() {
  const router = useRouter()

  const handleLogout = () => {
    // Clear user data
    localStorage.removeItem("user")
    // Redirect to login
    router.push("/")
  }

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="font-bold text-lg">GovVoice Citizen Portal</div>
        <div className="ml-auto flex items-center space-x-4">
          <Link href="/citizen-portal/chat">
            <Button variant="ghost" size="icon" className="relative">
              <MessageSquare className="h-5 w-5" />
            </Button>
          </Link>
          <RoleSwitcher />
          <ThemeToggle />
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" alt="@user" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">John Citizen</p>
                  <p className="text-xs leading-none text-muted-foreground">john@example.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/citizen-portal/profile">
                  <div className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}


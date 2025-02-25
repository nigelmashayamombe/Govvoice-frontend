import type React from "react"
import { Header } from "@/components/citizen/header"
import { Sidebar } from "@/components/citizen/sidebar"

export default function CitizenPortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <div className="border-b">
        <Header />
      </div>
      <div className="flex">
        <aside className="w-64 border-r bg-muted/40">
          <Sidebar />
        </aside>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  )
}


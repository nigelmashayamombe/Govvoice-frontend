"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { NotificationList } from "@/components/notifications/notification-list"

// Mock notifications data for citizens
const mockNotifications = [
  {
    id: "1",
    title: "Feedback Response",
    message: "Your feedback about healthcare services has been reviewed.",
    timestamp: new Date().toISOString(),
    read: false,
    type: "info" as const,
    sender: {
      name: "GovVoice Team",
      avatar: "/placeholder-avatar.jpg",
    },
  },
  {
    id: "2",
    title: "New Policy Update",
    message: "A new agricultural policy has been published. Click to view.",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    read: true,
    type: "info" as const,
    sender: {
      name: "Policy Team",
      avatar: "/placeholder-avatar.jpg",
    },
  },
  // Add more mock notifications...
]

export default function Notifications() {
  const [notifications, setNotifications] = useState(mockNotifications)

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const handleDismiss = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  return (
    <div className="container py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated with responses to your feedback and important announcements.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
            <CardDescription>View and manage your notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <NotificationList notifications={notifications} onMarkAsRead={handleMarkAsRead} onDismiss={handleDismiss} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


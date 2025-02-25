"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NotificationList } from "@/components/notifications/notification-list"

// Mock notifications data
const mockNotifications = [
  {
    id: "1",
    title: "New Feedback Submission",
    message: "A new feedback has been submitted regarding healthcare services.",
    timestamp: new Date().toISOString(),
    read: false,
    type: "info" as const,
    sender: {
      name: "John Citizen",
      avatar: "/placeholder-user.jpg",
    },
  },
  {
    id: "2",
    title: "Policy Update Required",
    message: "The Agricultural Policy needs to be reviewed and updated.",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    read: true,
    type: "warning" as const,
    sender: {
      name: "System",
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

  const unreadNotifications = notifications.filter((n) => !n.read)
  const readNotifications = notifications.filter((n) => n.read)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Notifications</h1>
        <p className="text-muted-foreground">Stay updated with the latest activities and updates.</p>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
          <TabsTrigger value="unread">Unread ({unreadNotifications.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Notifications</CardTitle>
              <CardDescription>View all your notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <NotificationList
                notifications={notifications}
                onMarkAsRead={handleMarkAsRead}
                onDismiss={handleDismiss}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="unread">
          <Card>
            <CardHeader>
              <CardTitle>Unread Notifications</CardTitle>
              <CardDescription>View your unread notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <NotificationList
                notifications={unreadNotifications}
                onMarkAsRead={handleMarkAsRead}
                onDismiss={handleDismiss}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


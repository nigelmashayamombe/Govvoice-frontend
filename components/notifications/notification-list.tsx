import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bell, Check, X } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface Notification {
  id: string
  title: string
  message: string
  timestamp: string
  read: boolean
  type: "info" | "success" | "warning" | "error"
  sender?: {
    name: string
    avatar?: string
  }
}

interface NotificationListProps {
  notifications: Notification[]
  onMarkAsRead: (id: string) => void
  onDismiss: (id: string) => void
}

export function NotificationList({ notifications, onMarkAsRead, onDismiss }: NotificationListProps) {
  if (notifications.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Bell className="mx-auto h-8 w-8 mb-2" />
        <p>No notifications</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <Card key={notification.id} className={`relative ${notification.read ? "bg-muted/50" : "bg-background"}`}>
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              {notification.sender && (
                <Avatar>
                  <AvatarImage src={notification.sender.avatar} />
                  <AvatarFallback>{notification.sender.name[0]}</AvatarFallback>
                </Avatar>
              )}
              <div className="flex-1 space-y-1">
                <p className="font-medium leading-none">{notification.title}</p>
                <p className="text-sm text-muted-foreground">{notification.message}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                </p>
              </div>
              <div className="flex gap-2">
                {!notification.read && (
                  <Button variant="ghost" size="icon" onClick={() => onMarkAsRead(notification.id)} className="h-8 w-8">
                    <Check className="h-4 w-4" />
                    <span className="sr-only">Mark as read</span>
                  </Button>
                )}
                <Button variant="ghost" size="icon" onClick={() => onDismiss(notification.id)} className="h-8 w-8">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Dismiss</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}


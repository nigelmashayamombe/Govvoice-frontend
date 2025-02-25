import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const activities = [
  {
    user: "John D.",
    action: "submitted feedback about healthcare services",
    time: "2 minutes ago",
    avatar: "/placeholder-user.jpg",
    initials: "JD",
  },
  {
    user: "Sarah M.",
    action: "viewed Agricultural Policy Summary",
    time: "5 minutes ago",
    avatar: "/placeholder-user.jpg",
    initials: "SM",
  },
  {
    user: "David K.",
    action: "reported infrastructure issue",
    time: "10 minutes ago",
    avatar: "/placeholder-user.jpg",
    initials: "DK",
  },
  {
    user: "Grace T.",
    action: "commented on Education Policy",
    time: "15 minutes ago",
    avatar: "/placeholder-user.jpg",
    initials: "GT",
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={activity.avatar} alt={activity.user} />
            <AvatarFallback>{activity.initials}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.user}</p>
            <p className="text-sm text-muted-foreground">{activity.action}</p>
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}


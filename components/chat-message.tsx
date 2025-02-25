import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface ChatMessageProps {
  message: {
    role: "user" | "assistant"
    content: string
  }
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"

  return (
    <div className={cn("flex gap-3 mb-4", isUser && "flex-row-reverse")}>
      <Avatar>
        <AvatarImage src={isUser ? "/user-avatar.png" : "/bot-avatar.png"} />
        <AvatarFallback>{isUser ? "U" : "A"}</AvatarFallback>
      </Avatar>
      <div
        className={cn("rounded-lg px-4 py-2 max-w-[80%]", isUser ? "bg-primary text-primary-foreground" : "bg-muted")}
      >
        <p className="text-sm">{message.content}</p>
      </div>
    </div>
  )
}


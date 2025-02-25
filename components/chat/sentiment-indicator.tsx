import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { ThumbsDown, ThumbsUp, Minus } from "lucide-react"
import type { Message } from "@/lib/types/chat"

interface SentimentIndicatorProps {
  sentiment: Message["sentiment"]
}

export function SentimentIndicator({ sentiment }: SentimentIndicatorProps) {
  if (!sentiment) return null

  const { label, score } = sentiment

  const icon = label === "positive" ? ThumbsUp : label === "negative" ? ThumbsDown : Minus

  const color = label === "positive" ? "bg-green-500" : label === "negative" ? "bg-red-500" : "bg-yellow-500"

  return (
    <Tooltip>
      <TooltipTrigger>
        <Badge variant="outline" className={`${color} text-white`}>
          <icon className="h-3 w-3 mr-1" />
          {Math.round(score * 100)}%
        </Badge>
      </TooltipTrigger>
      <TooltipContent>
        <p>Message Sentiment: {label}</p>
        <p>Confidence Score: {Math.round(score * 100)}%</p>
      </TooltipContent>
    </Tooltip>
  )
}


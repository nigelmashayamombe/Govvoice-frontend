export type Language = "en" | "sn" | "nd"

export interface Message {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  language?: Language
  timestamp: string
  sentiment?: {
    score: number // -1 to 1
    label: "negative" | "neutral" | "positive"
  }
}

export interface ChatSession {
  id: string
  messages: Message[]
  language: Language
  createdAt: string
  updatedAt: string
}


"use client"

import { useCallback, useState } from "react"
import { nanoid } from "nanoid"
import type { Message, Language } from "@/lib/types/chat"
import { translateText } from "@/lib/utils/translation"
import { analyzeSentiment } from "@/lib/utils/sentiment"

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [language, setLanguage] = useState<Language>("en")
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = useCallback(
    async (content: string) => {
      setIsLoading(true)

      try {
        // Create new message
        const userMessage: Message = {
          id: nanoid(),
          role: "user",
          content,
          language,
          timestamp: new Date().toISOString(),
        }

        // Add user message to state
        setMessages((prev) => [...prev, userMessage])

        // Analyze sentiment
        const sentiment = await analyzeSentiment(content)
        userMessage.sentiment = sentiment

        // Get assistant response
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [...messages, userMessage],
            language,
          }),
        })

        if (!response.ok) throw new Error("Failed to send message")

        const data = await response.json()

        // Translate response if needed
        const translatedContent = language !== "en" ? await translateText(data.content, "en", language) : data.content

        // Create assistant message
        const assistantMessage: Message = {
          id: nanoid(),
          role: "assistant",
          content: translatedContent,
          language,
          timestamp: new Date().toISOString(),
        }

        // Add assistant message to state
        setMessages((prev) => [...prev, assistantMessage])
      } catch (error) {
        console.error("Chat Error:", error)
      } finally {
        setIsLoading(false)
      }
    },
    [messages, language],
  )

  const changeLanguage = useCallback(
    async (newLanguage: Language) => {
      setLanguage(newLanguage)

      // Translate existing messages to new language
      const translatedMessages = await Promise.all(
        messages.map(async (message) => ({
          ...message,
          content: await translateText(message.content, message.language || "en", newLanguage),
          language: newLanguage,
        })),
      )

      setMessages(translatedMessages)
    },
    [messages],
  )

  return {
    messages,
    language,
    isLoading,
    sendMessage,
    changeLanguage,
  }
}


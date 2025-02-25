"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Mic, Send } from "lucide-react"
import { ChatMessage } from "@/components/chat-message"
import { VoiceInput } from "@/components/voice-input"

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your GovVoice assistant. How can I help you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [showVoiceInput, setShowVoiceInput] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [scrollToBottom])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        role: "assistant",
        content: "I understand your concern. Let me help you with that...",
      }
      setMessages((prev) => [...prev, assistantMessage])
    }, 1000)
  }

  const handleVoiceInput = (transcript: string) => {
    setInput(transcript)
    setShowVoiceInput(false)
  }

  return (
    <div className="container py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Chat Assistant</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[500px] flex flex-col">
            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </div>
            {showVoiceInput && (
              <div className="mb-4">
                <VoiceInput onTranscript={handleVoiceInput} />
              </div>
            )}
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={() => setShowVoiceInput(!showVoiceInput)}>
                <Mic className="h-4 w-4" />
              </Button>
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
              />
              <Button onClick={handleSend}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


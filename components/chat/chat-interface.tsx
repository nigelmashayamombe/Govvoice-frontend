"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mic, Send, Bot } from "lucide-react"
import { VoiceInput } from "@/components/voice-input"
import { LanguageSwitcher } from "./language-switcher"
import { SentimentIndicator } from "./sentiment-indicator"
import { useChat } from "@/lib/hooks/use-chat"
import type { Language } from "@/lib/types/chat"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ChatInterface() {
  const [input, setInput] = useState("")
  const [showVoiceInput, setShowVoiceInput] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  // Add new state for file upload
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const { messages, language, isLoading, sendMessage, changeLanguage } = useChat()

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [scrollToBottom])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const message = input
    setInput("")
    await sendMessage(message)
  }

  const handleVoiceInput = (transcript: string) => {
    setInput(transcript)
    setShowVoiceInput(false)
  }

  const handleLanguageChange = (newLanguage: Language) => {
    changeLanguage(newLanguage)
  }

  // Add file upload handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      // Here you would typically upload the file and process it
      // For now, we'll just add a message about the upload
      await sendMessage(`I'm uploading a document: ${file.name}`)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-6 w-6" />
          GovVoice Assistant
        </CardTitle>
        <LanguageSwitcher currentLanguage={language} onLanguageChange={handleLanguageChange} />
      </CardHeader>
      <CardContent>
        <div className="h-[600px] flex flex-col">
          <div className="flex-1 overflow-y-auto mb-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {message.role === "user" && message.sentiment && (
                      <SentimentIndicator sentiment={message.sentiment} />
                    )}
                    <span className="text-xs opacity-70">{new Date(message.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Add document upload section */}
          <div className="border-t pt-4 mb-4">
            <div className="flex items-center gap-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="document">Upload Document</Label>
                <Input id="document" type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleFileUpload} />
              </div>
              {selectedFile && <div className="text-sm text-muted-foreground">Selected: {selectedFile.name}</div>}
            </div>
          </div>

          {showVoiceInput && (
            <div className="mb-4">
              <VoiceInput
                onTranscript={handleVoiceInput}
                language={language === "sn" ? "sn" : language === "nd" ? "zu" : "en-US"}
              />
            </div>
          )}

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowVoiceInput(!showVoiceInput)}
              disabled={isLoading}
            >
              <Mic className="h-4 w-4" />
            </Button>
            <Input
              placeholder={
                language === "sn"
                  ? "Nyorai mhinduro yenyu pano..."
                  : language === "nd"
                    ? "Bhala umbuzo wakho lapha..."
                    : "Type your message here..."
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              disabled={isLoading}
            />
            <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


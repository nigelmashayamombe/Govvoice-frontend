"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mic, MicOff, Volume2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface VoiceInputProps {
  onTranscript: (text: string) => void
  language?: string
}

// Declare SpeechRecognition interface
declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
  interface SpeechRecognition extends EventTarget {
    continuous: boolean
    interimResults: boolean
    lang: string
    onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null
    onend: ((this: SpeechRecognition, ev: Event) => any) | null
    start: () => void
    stop: () => void
  }

  interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList
    resultIndex: number
  }

  interface SpeechRecognitionResultList {
    [index: number]: SpeechRecognitionResult
  }

  interface SpeechRecognitionResult {
    [index: number]: SpeechRecognitionAlternative
    isFinal: boolean
  }

  interface SpeechRecognitionAlternative {
    transcript: string
    confidence: number
  }
}

export function VoiceInput({ onTranscript, language = "en-US" }: VoiceInputProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = language

      recognition.onresult = (event) => {
        const current = event.resultIndex
        const transcriptText = event.results[current][0].transcript
        setTranscript(transcriptText)
        onTranscript(transcriptText)
      }

      recognition.onend = () => {
        setIsRecording(false)
      }

      setRecognition(recognition)
    }
  }, [language, onTranscript])

  const toggleRecording = useCallback(() => {
    if (!recognition) return

    if (isRecording) {
      recognition.stop()
      setIsRecording(false)
    } else {
      recognition.start()
      setIsRecording(true)
      setTranscript("")
    }
  }, [recognition, isRecording])

  return (
    <Card className="relative">
      <CardContent className="p-4">
        <div className="flex items-center gap-4 mb-4">
          <Select
            defaultValue={language}
            onValueChange={(value) => {
              if (recognition) {
                recognition.lang = value
              }
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en-US">English</SelectItem>
              <SelectItem value="sn">Shona</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant={isRecording ? "destructive" : "default"}
            onClick={toggleRecording}
            className="flex items-center gap-2"
          >
            {isRecording ? (
              <>
                <MicOff className="h-4 w-4" /> Stop Recording
              </>
            ) : (
              <>
                <Mic className="h-4 w-4" /> Start Recording
              </>
            )}
          </Button>
        </div>
        {isRecording && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Volume2 className="h-4 w-4 animate-pulse" />
            Recording...
          </div>
        )}
        {transcript && (
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <p className="text-sm">{transcript}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}


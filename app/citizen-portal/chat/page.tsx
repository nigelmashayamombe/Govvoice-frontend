import { ChatInterface } from "@/components/chat/chat-interface"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Bot, HelpCircle, Languages } from "lucide-react"

export default function ChatPage() {
  return (
    <div className="container py-10">
      <div className="grid gap-6 md:grid-cols-4">
        <div className="md:col-span-3">
          <ChatInterface />
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Help Topics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Common Questions</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• How do I submit feedback?</li>
                  <li>• Where can I find policy updates?</li>
                  <li>• What services are available?</li>
                  <li>• How to track my submissions?</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Alert>
            <Languages className="h-4 w-4" />
            <AlertTitle>Language Support</AlertTitle>
            <AlertDescription>
              Our AI assistant can communicate in English, Shona, and Ndebele. Use the language switcher to change
              languages.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                About the Assistant
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                The GovVoice AI Assistant is designed to help you with government services, policy information, and
                feedback submission. It uses advanced language processing to understand and respond in multiple
                languages.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


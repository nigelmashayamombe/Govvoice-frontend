"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { VoiceInput } from "@/components/voice-input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2, MessageSquare, Mic, Phone } from "lucide-react"
import { useFeedbackStore } from "@/lib/store/feedback-store"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  feedbackType: z.string(),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export default function SubmitFeedback() {
  const [showVoiceInput, setShowVoiceInput] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { addFeedback } = useFeedbackStore()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      feedbackType: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      // Add feedback to store
      addFeedback({
        userId: "current-user-id", // In real app, get from auth context
        type: values.feedbackType,
        message: values.message,
        status: "pending",
      })

      toast({
        title: "Feedback Submitted",
        description: "Thank you for your feedback. We will review it shortly.",
      })

      form.reset()
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error submitting your feedback. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleVoiceInput = (transcript: string) => {
    form.setValue("message", transcript)
    setShowVoiceInput(false)
  }

  return (
    <div className="container py-10">
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Submit Your Feedback</CardTitle>
            <CardDescription>Share your thoughts with us to help improve governance</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="feedbackType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Feedback Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="agriculture">Agriculture</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="infrastructure">Infrastructure</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Feedback</FormLabel>
                      <FormControl>
                        <div className="space-y-4">
                          <Textarea
                            placeholder="Type your feedback here or use voice input..."
                            className="min-h-[150px]"
                            {...field}
                          />
                          <Button type="button" variant="outline" onClick={() => setShowVoiceInput(!showVoiceInput)}>
                            <Mic className="mr-2 h-4 w-4" />
                            {showVoiceInput ? "Hide Voice Input" : "Use Voice Input"}
                          </Button>
                          {showVoiceInput && <VoiceInput onTranscript={handleVoiceInput} />}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <MessageSquare className="mr-2 h-4 w-4" /> Submit Feedback
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Alternative Methods</CardTitle>
              <CardDescription>Other ways to submit your feedback</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold flex items-center mb-2">
                  <Phone className="mr-2 h-4 w-4" /> SMS Feedback
                </h3>
                <p className="text-sm text-muted-foreground">Send your feedback via SMS to:</p>
                <p className="text-sm font-medium">+263 XX XXX XXXX</p>
                <p className="text-xs text-muted-foreground mt-2">Format: FEEDBACK [Type] [Your message]</p>
                <p className="text-xs text-muted-foreground">
                  Example: FEEDBACK HEALTH Need more clinics in rural areas
                </p>
              </div>
              <div>
                <h3 className="font-semibold flex items-center mb-2">
                  <Mic className="mr-2 h-4 w-4" /> Voice Feedback
                </h3>
                <p className="text-sm text-muted-foreground">Call our automated voice feedback line:</p>
                <p className="text-sm font-medium">+263 XX XXX XXXX</p>
                <p className="text-xs text-muted-foreground mt-2">Available 24/7 in English and Shona</p>
              </div>
            </CardContent>
          </Card>

          <Alert>
            <AlertTitle>Need Help?</AlertTitle>
            <AlertDescription>
              Contact our support team for assistance:
              <br />
              Email: support@govvoice.co.zw
              <br />
              Phone: +263 XX XXX XXXX
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  )
}


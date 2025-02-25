"use client"

import { useFeedbackStore } from "@/lib/store/feedback-store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useState } from "react"

const statusColors = {
  pending: "bg-yellow-500",
  reviewed: "bg-blue-500",
  resolved: "bg-green-500",
}

export default function MySubmissions() {
  const feedback = useFeedbackStore((state) => state.feedback)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredFeedback = feedback.filter((item) => {
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    const matchesSearch = item.message.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  return (
    <div className="container py-10">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <h1 className="text-3xl font-bold">My Submissions</h1>
          <div className="flex gap-4">
            <Input
              placeholder="Search submissions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[200px]"
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="reviewed">Reviewed</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-6">
          {filteredFeedback.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center text-muted-foreground">No submissions found.</CardContent>
            </Card>
          ) : (
            filteredFeedback.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>Feedback #{item.id}</CardTitle>
                      <CardDescription>Submitted on {new Date(item.createdAt).toLocaleDateString()}</CardDescription>
                    </div>
                    <Badge className={statusColors[item.status as keyof typeof statusColors]}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Your Message:</h3>
                      <p className="text-muted-foreground">{item.message}</p>
                    </div>
                    {item.response && (
                      <div>
                        <h3 className="font-medium mb-2">Response:</h3>
                        <p className="text-muted-foreground">{item.response}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}


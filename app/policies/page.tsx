"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

// Mock policy data
const policies = [
  {
    id: 1,
    title: "Agricultural Modernization Policy",
    summary: {
      en: "Focuses on modernizing farming practices and improving food security through technology adoption.",
      sn: "Kuwedzera unyanzvi hwekurima nekushandisa nzira dzazvino dzekurima.",
    },
    category: "Agriculture",
    date: "2024-02-20",
  },
  {
    id: 2,
    title: "Rural Healthcare Initiative",
    summary: {
      en: "Expanding healthcare access to rural communities through mobile clinics and telemedicine.",
      sn: "Kuwedzera zvekurapwa munzvimbo dzekumamisha kuburikidza nekiriniki dzinofamba.",
    },
    category: "Healthcare",
    date: "2024-01-15",
  },
  // Add more policies as needed
]

export default function Policies() {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedPolicy, setExpandedPolicy] = useState<number | null>(null)

  const filteredPolicies = policies.filter(
    (policy) =>
      policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center space-x-2">
          <Search className="w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search policies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <div className="grid gap-4">
          {filteredPolicies.map((policy) => (
            <Card key={policy.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{policy.title}</CardTitle>
                    <CardDescription>
                      {policy.category} • Published: {policy.date}
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => setExpandedPolicy(expandedPolicy === policy.id ? null : policy.id)}
                  >
                    {expandedPolicy === policy.id ? "Show Less" : "Read More"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-1">English Summary</h4>
                    <p>{policy.summary.en}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Shona Summary</h4>
                    <p>{policy.summary.sn}</p>
                  </div>
                  {expandedPolicy === policy.id && (
                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-2">Additional Details</h4>
                      <p className="text-muted-foreground">
                        More detailed information about the policy would be displayed here, including implementation
                        timelines, key stakeholders, and expected outcomes.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}


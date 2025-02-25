"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, ChevronRight } from "lucide-react"
import Link from "next/link"
import { usePolicyStore } from "@/lib/store/policy-store"

export default function Policies() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("english")
  const policies = usePolicyStore((state) => state.policies)

  const filteredPolicies = policies.filter(
    (policy) =>
      policy.status === "published" &&
      (policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        policy.category.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="container py-10">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <h1 className="text-2xl font-bold">Government Policies</h1>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search policies..."
                className="pl-8 w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Tabs defaultValue="english" onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="english">English</TabsTrigger>
                <TabsTrigger value="shona">Shona</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="grid gap-6">
          {filteredPolicies.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center text-muted-foreground">
                No policies found matching your search criteria.
              </CardContent>
            </Card>
          ) : (
            filteredPolicies.map((policy) => (
              <Card key={policy.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{policy.title}</CardTitle>
                      <CardDescription>
                        {policy.category} • Last updated: {new Date(policy.updatedAt).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <Link href={`/citizen-portal/policies/${policy.id}`}>
                      <Button variant="outline" size="sm">
                        Read More <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm">{activeTab === "english" ? policy.summary.en : policy.summary.sn}</p>
                    <div className="text-sm text-muted-foreground">
                      <h4 className="font-medium mb-2">Key Objectives:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {(activeTab === "english" ? policy.details.en.objectives : policy.details.sn.objectives)
                          .slice(0, 3)
                          .map((objective, index) => (
                            <li key={index}>{objective}</li>
                          ))}
                      </ul>
                    </div>
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


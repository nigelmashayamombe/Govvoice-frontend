import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, FileText, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function CitizenPortal() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome to GovVoice</h1>
        <p className="text-muted-foreground mt-2">Your platform for civic engagement and government feedback</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Submit Feedback</CardTitle>
            <CardDescription>Share your thoughts on government services</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/citizen-portal/submit-feedback">
              <Button className="w-full">
                <MessageSquare className="mr-2 h-4 w-4" /> Submit Feedback
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>View Policies</CardTitle>
            <CardDescription>Access and review government policies</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/citizen-portal/policies">
              <Button className="w-full">
                <FileText className="mr-2 h-4 w-4" /> Browse Policies
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Submissions</CardTitle>
            <CardDescription>Track your feedback and responses</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/citizen-portal/my-submissions">
              <Button className="w-full">
                <ChevronRight className="mr-2 h-4 w-4" /> View History
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Updates</CardTitle>
          <CardDescription>Latest policy changes and government responses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold">Healthcare Policy Update</h3>
              <p className="text-sm text-muted-foreground">
                New guidelines for rural healthcare access - Posted 2 days ago
              </p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold">Agricultural Subsidy Program</h3>
              <p className="text-sm text-muted-foreground">
                Registration now open for the 2024 season - Posted 5 days ago
              </p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold">Education Initiative</h3>
              <p className="text-sm text-muted-foreground">
                New resources available for rural schools - Posted 1 week ago
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


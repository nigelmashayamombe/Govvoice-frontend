// Move the landing page content here
import { Button } from "@/components/ui/button"
import { ChevronRight, MessageSquare, FileText, Users } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center font-bold" href="/">
          GovVoice
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/">
            Home
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/submit-feedback">
            Submit Feedback
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/policies">
            Policy Summaries
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/about">
            About Us
          </Link>
        </nav>
      </header>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-[#006400] text-white dark:bg-[#004d00]">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Bridging the Urban-Rural Divide
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
              GovVoice empowers citizens to participate in governance through innovative communication channels.
            </p>
            <Link href="/register">
              <Button size="lg" className="bg-[#ffd700] text-black hover:bg-[#ccac00]">
                Get Started <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-6 w-6" />
                <h2 className="text-2xl font-bold">Voice Your Opinion</h2>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                Submit feedback through voice, text, or SMS. Your voice matters in shaping policies.
              </p>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="flex items-center space-x-2">
                <FileText className="h-6 w-6" />
                <h2 className="text-2xl font-bold">Access Policies</h2>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                Read and understand government policies in both English and Shona.
              </p>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="flex items-center space-x-2">
                <Users className="h-6 w-6" />
                <h2 className="text-2xl font-bold">Community Impact</h2>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                Join a community of engaged citizens working together to improve governance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Make a Difference?</h2>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Join GovVoice today and help shape the future of Zimbabwe through active participation.
            </p>
            <div className="space-x-4">
              <Link href="/register">
                <Button>Create Account</Button>
              </Link>
              <Link href="/about">
                <Button variant="outline">Learn More</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


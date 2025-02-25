"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"
import { validateCredentials, validateNationalId } from "@/lib/auth"
import { ThemeToggle } from "@/components/theme-toggle"
import { initializeMockData } from "@/lib/auth"

export function LoginForm() {
  // Initialize mock data when component mounts
  useEffect(() => {
    initializeMockData()
  }, [])

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const nationalId = formData.get("nationalId") as string
    const password = formData.get("password") as string

    try {
      // Validate National ID format
      if (!validateNationalId(nationalId)) {
        throw new Error("Invalid National ID format. Use format: XX-XXXXXX-X-XX")
      }

      // Validate credentials
      const user = validateCredentials(nationalId, password)
      if (!user) {
        throw new Error("Invalid credentials")
      }

      // Store user info in localStorage (in real app, use proper session management)
      localStorage.setItem("user", JSON.stringify(user))

      // Redirect based on role
      if (user.role === "admin" || user.role === "staff") {
        router.push("/dashboard")
      } else {
        router.push("/citizen-portal")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="relative">
        <div className="absolute right-4 top-4">
          <ThemeToggle />
        </div>
        <CardTitle>Login to GovVoice</CardTitle>
        <CardDescription>Enter your National ID and password to access the platform</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="nationalId">National ID</Label>
            <Input id="nationalId" name="nationalId" placeholder="e.g., 63-123456-A-42" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" placeholder="Enter your password" required />
          </div>
        </CardContent>
        <CardFooter className="flex-col space-y-4">
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
          <div className="text-sm text-center space-y-2">
            <p>
              Don't have an account?{" "}
              <Link href="/register" className="text-primary hover:underline">
                Register here
              </Link>
            </p>
            <div className="p-4 bg-muted rounded-lg">
              <p className="font-medium mb-2">Test Credentials:</p>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>Admin: 63-123456-A-42 / admin123</p>
                <p>Staff: 63-789012-B-42 / staff123</p>
                <p>User: 63-345678-C-42 / user123</p>
              </div>
            </div>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}


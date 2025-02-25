export type UserRole = "admin" | "staff" | "user"

export interface User {
  id: string
  nationalId: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}

// Mock user database
export const mockUsers: User[] = [
  {
    id: "1",
    nationalId: "63-123456-A-42",
    name: "Admin User",
    email: "admin@govvoice.co.zw",
    role: "admin",
    avatar: "/admin-avatar.jpg",
  },
  {
    id: "2",
    nationalId: "63-789012-B-42",
    name: "Staff Member",
    email: "staff@govvoice.co.zw",
    role: "staff",
    avatar: "/staff-avatar.jpg",
  },
  {
    id: "3",
    nationalId: "63-345678-C-42",
    name: "John Citizen",
    email: "john@example.com",
    role: "user",
    avatar: "/user-avatar.jpg",
  },
]

// Mock credentials (in real app, passwords would be hashed)
export const mockCredentials = [
  {
    nationalId: "63-123456-A-42",
    password: "admin123",
    userId: "1",
  },
  {
    nationalId: "63-789012-B-42",
    password: "staff123",
    userId: "2",
  },
  {
    nationalId: "63-345678-C-42",
    password: "user123",
    userId: "3",
  },
]

export function validateNationalId(nationalId: string): boolean {
  // Basic Zimbabwe National ID format validation
  // Format: XX-XXXXXX-X-XX (e.g., 63-123456-A-42)
  const regex = /^\d{2}-\d{6}-[A-Z]-\d{2}$/
  return regex.test(nationalId)
}

export function validateCredentials(nationalId: string, password: string) {
  // Get credentials from localStorage if available, otherwise use mock data
  const storedCredentials =
    typeof window !== "undefined" ? JSON.parse(localStorage.getItem("mock_credentials") || "null") : null
  const storedUsers = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("mock_users") || "null") : null

  const credentials = storedCredentials || mockCredentials
  const users = storedUsers || mockUsers

  const credential = credentials.find((c) => c.nationalId === nationalId)
  if (!credential) return null
  if (credential.password !== password) return null

  return users.find((u) => u.id === credential.userId) || null
}

export function initializeMockData() {
  // Only initialize if running in browser and data doesn't exist
  if (typeof window !== "undefined") {
    // Check if mock data is already initialized
    const existingUsers = localStorage.getItem("mock_users")
    if (!existingUsers) {
      // Store mock users in localStorage
      localStorage.setItem("mock_users", JSON.stringify(mockUsers))
      localStorage.setItem("mock_credentials", JSON.stringify(mockCredentials))
    }
  }
}


import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Feedback {
  id: string
  userId: string
  type: string
  message: string
  status: "pending" | "reviewed" | "resolved"
  createdAt: string
  response?: string
}

interface FeedbackStore {
  feedback: Feedback[]
  addFeedback: (feedback: Omit<Feedback, "id" | "createdAt">) => void
  updateFeedback: (id: string, updates: Partial<Feedback>) => void
  getFeedbackById: (id: string) => Feedback | undefined
  getUserFeedback: (userId: string) => Feedback[]
}

export const useFeedbackStore = create<FeedbackStore>()(
  persist(
    (set, get) => ({
      feedback: [],
      addFeedback: (newFeedback) => {
        set((state) => ({
          feedback: [
            ...state.feedback,
            {
              ...newFeedback,
              id: Math.random().toString(36).substr(2, 9),
              createdAt: new Date().toISOString(),
            },
          ],
        }))
      },
      updateFeedback: (id, updates) => {
        set((state) => ({
          feedback: state.feedback.map((item) => (item.id === id ? { ...item, ...updates } : item)),
        }))
      },
      getFeedbackById: (id) => {
        return get().feedback.find((item) => item.id === id)
      },
      getUserFeedback: (userId) => {
        return get().feedback.filter((item) => item.userId === userId)
      },
    }),
    {
      name: "feedback-storage",
    },
  ),
)


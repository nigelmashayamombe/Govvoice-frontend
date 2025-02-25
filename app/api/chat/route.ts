import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages, language = "en" } = await req.json()

  // System message to handle multilingual responses
  const systemMessage = {
    role: "system",
    content: `You are a helpful government service assistant that can communicate in English, Shona, and Ndebele. 
    You help citizens with government services, policies, and feedback.
    When responding in Shona or Ndebele, ensure cultural sensitivity and use appropriate formal language.
    Current language: ${language}`,
  }

  try {
    const result = streamText({
      model: openai("gpt-4-turbo"),
      system: systemMessage.content,
      messages,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Chat API Error:", error)
    return new Response(JSON.stringify({ error: "Failed to generate response" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}


import type { Language } from "@/lib/types/chat"

const translations = {
  sn: {
    Hello: "Mhoro",
    "How can I help you?": "Ndingakubatsirei?",
    "I understand": "Ndanzwisisa",
    "Please wait": "Ndapota mirai",
    // Add more translations
  },
  nd: {
    Hello: "Sawubona",
    "How can I help you?": "Ngingakusiza njani?",
    "I understand": "Ngiyezwa",
    "Please wait": "Sicela ulinde",
    // Add more translations
  },
}

export async function translateText(text: string, from: Language, to: Language): Promise<string> {
  if (from === to) return text

  // In production, this would use a real translation API
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Mock translation
  if (translations[to]?.[text]) {
    return translations[to][text]
  }

  return text + ` (${to})`
}


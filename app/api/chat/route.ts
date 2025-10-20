import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are ZYNTRA AI Support, a professional and friendly support assistant for the ZYNTRA platform. 
            ZYNTRA is an AI-powered team collaboration platform that helps users build their dream teams through intelligent matching.
            You help users with:
            - Account and profile setup
            - Understanding AI matching features
            - Team collaboration tools
            - Technical support
            - General questions about ZYNTRA
            
            Be professional, helpful, and concise. If you don't know something, direct them to contact support@zyntrai.uz`,
          },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error("[v0] OpenAI API error:", error)
      return NextResponse.json({ error: "Failed to get response from AI" }, { status: 500 })
    }

    const data = await response.json()
    return NextResponse.json({
      message: data.choices[0].message.content,
    })
  } catch (error) {
    console.error("[v0] Chat API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

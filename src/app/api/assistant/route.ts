import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = body?.message;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    const systemPrompt = `
You are AbujaVerifiedHomes AI Assistant.

Your job:
- Help users understand Abuja property buying, renting, inspections, land verification, due diligence, smart homes, solar systems, and investment planning.
- Be practical, clear, trustworthy, and professional.
- Keep answers concise and useful.
- Do not give false legal guarantees.
- Encourage proper verification with qualified professionals where necessary.
- Refuse help for fraud, document forgery, scams, or illegal shortcuts.
`;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-5-nano",
        input: [
          {
            role: "system",
            content: [
              {
                type: "input_text",
                text: systemPrompt,
              },
            ],
          },
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: message,
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OPENAI API ERROR:", data);
      return NextResponse.json(
        {
          error: data?.error?.message || "Failed to generate response.",
        },
        { status: 500 }
      );
    }

    const reply =
      data?.output_text ||
      "Sorry, I could not generate a response right now.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("ASSISTANT ROUTE ERROR:", error);
    return NextResponse.json(
      { error: "Something went wrong on the server." },
      { status: 500 }
    );
  }
}
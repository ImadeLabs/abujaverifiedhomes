"use client";

import { useEffect, useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

function getSessionId() {
  if (typeof window === "undefined") return "";
  let sessionId = localStorage.getItem("avh_session_id");
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem("avh_session_id", sessionId);
  }
  return sessionId;
}

export default function AIRealEstateAssistant() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hello. I am your AbujaVerifiedHomes assistant. Ask me about buying property in Abuja, due diligence, inspection, smart homes, or investment strategy.",
    },
  ]);

  useEffect(() => {
    setSessionId(getSessionId());
  }, []);

  async function handleSend() {
    if (!input.trim() || !sessionId) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.content,
          sessionId,
          name,
          email,
          phone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response.");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I could not process that request right now. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-[#f7f8f2] py-20">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-green-700">
            AI Assistant
          </p>
          <h2 className="mt-2 text-3xl font-bold text-[#16351f] md:text-4xl">
            Ask questions before you invest
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-gray-700">
            Buyers and diaspora investors can ask questions about Abuja property,
            documentation, smart homes, solar systems, and project planning.
          </p>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-green-100 bg-white shadow-xl">
          <div className="grid gap-6 border-b border-green-100 p-6 md:grid-cols-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="rounded-2xl border border-green-100 bg-[#f7f8f2] px-4 py-3 text-gray-900 outline-none focus:border-green-600"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="rounded-2xl border border-green-100 bg-[#f7f8f2] px-4 py-3 text-gray-900 outline-none focus:border-green-600"
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Your phone / WhatsApp"
              className="rounded-2xl border border-green-100 bg-[#f7f8f2] px-4 py-3 text-gray-900 outline-none focus:border-green-600"
            />
          </div>

          <div className="h-[420px] space-y-4 overflow-y-auto bg-[#fcfdf8] p-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-7 ${
                  message.role === "user"
                    ? "ml-auto bg-green-700 text-white"
                    : "bg-green-50 text-[#16351f]"
                }`}
              >
                {message.content}
              </div>
            ))}

            {loading && (
              <div className="max-w-[85%] rounded-2xl bg-green-50 px-4 py-3 text-sm text-[#16351f]">
                Thinking...
              </div>
            )}
          </div>

          <div className="border-t border-green-100 p-4">
            <div className="flex flex-col gap-3 md:flex-row">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about listings, due diligence, title, smart homes, ROI..."
                className="flex-1 rounded-2xl border border-green-100 bg-[#f7f8f2] px-4 py-3 text-gray-900 outline-none placeholder:text-gray-500 focus:border-green-600"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
              />
              <button
                onClick={handleSend}
                disabled={loading}
                className="rounded-2xl bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
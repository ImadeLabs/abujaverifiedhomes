"use client";

import { useState } from "react";

export default function PropertyAssistant() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleAsk() {
    if (!message.trim()) {
      setError("Please enter your question first.");
      return;
    }

    setLoading(true);
    setError("");
    setReply("");

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to get AI response.");
        return;
      }

      setReply(data.reply || "No response received.");
    } catch (err) {
      console.error("ASSISTANT UI ERROR:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Ask Questions Before You Invest
        </h2>
        <p className="mt-2 text-sm leading-6 text-gray-600">
          Ask about Abuja property, due diligence, inspections, documentation,
          smart homes, solar systems, and investment planning.
        </p>
      </div>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Example: Is C of O necessary before buying land in Abuja?"
        className="min-h-[130px] w-full rounded-xl border border-gray-300 p-4 text-sm text-gray-900 outline-none focus:border-green-700"
      />

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          onClick={handleAsk}
          disabled={loading}
          className="rounded-xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Thinking..." : "Ask AI Assistant"}
        </button>

        <button
          onClick={() => {
            setMessage("");
            setReply("");
            setError("");
          }}
          type="button"
          className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          Clear
        </button>
      </div>

      {error && (
        <div className="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {reply && (
        <div className="mt-6 rounded-2xl bg-gray-50 p-5">
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
            AI Assistant Reply
          </h3>
          <p className="whitespace-pre-line text-sm leading-7 text-gray-800">
            {reply}
          </p>
        </div>
      )}
    </section>
  );
}
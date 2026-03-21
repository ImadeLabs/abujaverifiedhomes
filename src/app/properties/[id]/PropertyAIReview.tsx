"use client";

import { useState } from "react";

type Props = {
  title: string;
  price: number;
  area: string | null;
  city: string | null;
  listingType: string;
  propertyType: string | null;
  verified: boolean;
};

export default function PropertyAIReview(props: Props) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  async function handleReview() {
    try {
      setLoading(true);
      setError("");
      setResult("");

      const res = await fetch("/api/ai/property-review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(props),
      });

      if (!res.ok) {
        throw new Error("Failed to generate AI review");
      }

      const data = await res.json();
      setResult(data.result || "");
    } catch (err) {
      console.error(err);
      setError("Could not generate AI review right now.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border bg-white p-5">
      <h2 className="text-xl font-bold text-slate-900">
        AI Verification Assistant
      </h2>
      <p className="mt-2 text-slate-600">
        Get a quick AI-guided review of what to verify before paying for this
        property.
      </p>

      <button
        onClick={handleReview}
        disabled={loading}
        className="mt-4 rounded-xl bg-black px-5 py-3 font-semibold text-white hover:opacity-90 disabled:opacity-60"
      >
        {loading ? "Generating review..." : "Get AI Review"}
      </button>

      {error && <p className="mt-4 text-red-600">{error}</p>}

      {result && (
        <div className="mt-4 whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
          {result}
        </div>
      )}
    </div>
  );
}

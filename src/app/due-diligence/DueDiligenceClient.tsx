"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function DueDiligenceClient() {
  const searchParams = useSearchParams();
  const propertyId = searchParams.get("propertyId");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setErrorMessage("");

    const form = e.currentTarget;

    const payload = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      propertyId,
      notes: (form.elements.namedItem("notes") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/due-diligence", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to submit request");
      }

      setSuccess("Inspection request submitted successfully!");
      form.reset();
    } catch (error) {
      console.error(error);
      setErrorMessage("Error submitting request.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1 className="text-3xl font-bold">Request Due Diligence Inspection</h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          name="name"
          type="text"
          placeholder="Full Name"
          className="w-full border p-3"
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email Address"
          className="w-full border p-3"
          required
        />

        <input
          name="phone"
          type="tel"
          placeholder="Phone Number"
          className="w-full border p-3"
        />

        <textarea
          name="notes"
          placeholder="Extra inspection notes"
          className="w-full border p-3"
        />

        <button
          type="submit"
          disabled={loading}
          className="rounded bg-black px-6 py-3 text-white"
        >
          {loading ? "Submitting..." : "Submit Inspection Request"}
        </button>
      </form>

      {success && <p className="mt-4 text-green-600">{success}</p>}
      {errorMessage && <p className="mt-4 text-red-600">{errorMessage}</p>}
    </>
  );
}
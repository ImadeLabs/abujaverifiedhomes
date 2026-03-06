"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DueDiligencePage() {
  const searchParams = useSearchParams();
  const propertyId = searchParams.get("propertyId");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;

    const payload = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      property_id: propertyId,
      notes: (form.elements.namedItem("notes") as HTMLTextAreaElement).value,
    };

    const { error } = await supabase.from("due_diligence").insert(payload);

    if (error) {
      alert("Error submitting request");
      console.log(error);
    } else {
      setSuccess("Inspection request submitted successfully!");
      form.reset();
    }

    setLoading(false);
  }

  return (
    <main className="p-10 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold">Request Due Diligence Inspection</h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          name="name"
          placeholder="Full Name"
          className="border p-3 w-full"
          required
        />

        <input
          name="email"
          placeholder="Email Address"
          className="border p-3 w-full"
          required
        />

        <input
          name="phone"
          placeholder="Phone Number"
          className="border p-3 w-full"
        />

        <textarea
          name="notes"
          placeholder="Extra inspection notes"
          className="border p-3 w-full"
        />

        <button
          disabled={loading}
          className="bg-black text-white px-6 py-3 rounded"
        >
          {loading ? "Submitting..." : "Submit Inspection Request"}
        </button>
      </form>

      {success && <p className="mt-4 text-green-600">{success}</p>}
    </main>
  );
}
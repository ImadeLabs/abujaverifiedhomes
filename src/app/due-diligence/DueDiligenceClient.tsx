"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function DueDiligenceClient() {
  const searchParams = useSearchParams();
  const propertyIdFromUrl = searchParams.get("propertyId");

  const [requestType, setRequestType] = useState<"internal" | "external">(
    propertyIdFromUrl ? "internal" : "external"
  );
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

      requestType,
      propertyId:
        requestType === "internal"
          ? propertyIdFromUrl ||
            (form.elements.namedItem("propertyId") as HTMLInputElement)?.value ||
            null
          : null,

      externalPropertyUrl:
        requestType === "external"
          ? (form.elements.namedItem("externalPropertyUrl") as HTMLInputElement)
              ?.value || null
          : null,

      externalPropertyAddress:
        requestType === "external"
          ? (
              form.elements.namedItem(
                "externalPropertyAddress"
              ) as HTMLInputElement
            )?.value || null
          : null,

      externalAgentPhone:
        requestType === "external"
          ? (form.elements.namedItem("externalAgentPhone") as HTMLInputElement)
              ?.value || null
          : null,

      sourcePlatform:
        requestType === "external"
          ? (form.elements.namedItem("sourcePlatform") as HTMLSelectElement)
              ?.value || null
          : null,

      notes: (form.elements.namedItem("notes") as HTMLTextAreaElement).value,
    };

    if (
      requestType === "external" &&
      !payload.externalPropertyUrl &&
      !payload.externalPropertyAddress
    ) {
      setErrorMessage(
        "For external verification, provide a property link or address."
      );
      setLoading(false);
      return;
    }

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

      if (propertyIdFromUrl) {
        setRequestType("internal");
      } else {
        setRequestType("external");
      }
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
        <div>
          <label className="mb-2 block font-medium">Request Type</label>

          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="requestType"
                checked={requestType === "internal"}
                onChange={() => setRequestType("internal")}
              />
              Internal Property
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="requestType"
                checked={requestType === "external"}
                onChange={() => setRequestType("external")}
              />
              External Property
            </label>
          </div>
        </div>

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

        {requestType === "internal" && !propertyIdFromUrl && (
          <input
            name="propertyId"
            type="text"
            placeholder="Property ID"
            className="w-full border p-3"
          />
        )}

        {requestType === "internal" && propertyIdFromUrl && (
          <div className="rounded border bg-green-50 p-3 text-sm text-green-700">
            Property reference detected: <strong>{propertyIdFromUrl}</strong>
          </div>
        )}

        {requestType === "external" && (
          <>
            <input
              name="externalPropertyUrl"
              type="url"
              placeholder="External Property Link (optional if address provided)"
              className="w-full border p-3"
            />

            <input
              name="externalPropertyAddress"
              type="text"
              placeholder="External Property Address"
              className="w-full border p-3"
            />

            <input
              name="externalAgentPhone"
              type="tel"
              placeholder="Agent / Seller Phone"
              className="w-full border p-3"
            />

            <select
              name="sourcePlatform"
              className="w-full border p-3"
              defaultValue=""
            >
              <option value="" disabled>
                Select Source Platform
              </option>
              <option value="whatsapp">WhatsApp</option>
              <option value="jiji">Jiji</option>
              <option value="facebook">Facebook</option>
              <option value="private_agent">Private Agent</option>
              <option value="friend_referral">Friend Referral</option>
              <option value="other">Other</option>
            </select>
          </>
        )}

        <textarea
          name="notes"
          placeholder="What exactly do you want us to verify?"
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
"use client";

import { useEffect, useState } from "react";

type DueDiligenceRequest = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  requestType: string;
  propertyId: string | null;
  externalPropertyUrl: string | null;
  externalPropertyAddress: string | null;
  externalAgentPhone: string | null;
  sourcePlatform: string | null;
  notes: string | null;
  adminNote: string | null;
  status: string;
  createdAt: string;
};

export default function AdminPage() {
  const [requests, setRequests] = useState<DueDiligenceRequest[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchRequests() {
    try {
      const res = await fetch("/api/due-diligence", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch requests");
      }

      const data = await res.json();
      setRequests(data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: string, status: string, adminNote?: string) {
    try {
      const res = await fetch("/api/due-diligence", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          status,
          adminNote: adminNote || "",
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update request");
      }

      fetchRequests();
    } catch (error) {
      console.error("Error updating request:", error);
      alert("Failed to update request");
    }
  }

  useEffect(() => {
    fetchRequests();
  }, []);

  function statusBadge(status: string) {
    if (status === "approved") {
      return (
        <span className="rounded bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
          approved
        </span>
      );
    }

    if (status === "rejected") {
      return (
        <span className="rounded bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">
          rejected
        </span>
      );
    }

    if (status === "completed") {
      return (
        <span className="rounded bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
          completed
        </span>
      );
    }

    if (status === "in_review") {
      return (
        <span className="rounded bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-700">
          in_review
        </span>
      );
    }

    return (
      <span className="rounded bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-700">
        pending
      </span>
    );
  }

  return (
    <main className="p-10">
      <h1 className="mb-6 text-3xl font-bold">Admin Dashboard</h1>

      {loading && <p>Loading inspection requests...</p>}

      {!loading && requests.length === 0 && (
        <p>No due diligence requests found.</p>
      )}

      {!loading && requests.length > 0 && (
        <div className="space-y-6">
          {requests.map((req) => (
            <div key={req.id} className="rounded-xl border p-5 shadow-sm">
              <div className="grid gap-2 md:grid-cols-2">
                <p>
                  <strong>Name:</strong> {req.name}
                </p>
                <p>
                  <strong>Email:</strong> {req.email}
                </p>
                <p>
                  <strong>Phone:</strong> {req.phone || "-"}
                </p>
                <p>
                  <strong>Request Type:</strong> {req.requestType}
                </p>
                <p>
                  <strong>Status:</strong> {statusBadge(req.status)}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(req.createdAt).toLocaleString()}
                </p>
              </div>

              {req.requestType === "internal" && (
                <div className="mt-3">
                  <p>
                    <strong>Internal Property ID:</strong>{" "}
                    {req.propertyId || "-"}
                  </p>
                </div>
              )}

              {req.requestType === "external" && (
                <div className="mt-3 space-y-1 rounded border bg-slate-50 p-4">
                  <p>
                    <strong>External Property URL:</strong>{" "}
                    {req.externalPropertyUrl || "-"}
                  </p>
                  <p>
                    <strong>External Address:</strong>{" "}
                    {req.externalPropertyAddress || "-"}
                  </p>
                  <p>
                    <strong>Agent/Seller Phone:</strong>{" "}
                    {req.externalAgentPhone || "-"}
                  </p>
                  <p>
                    <strong>Source Platform:</strong>{" "}
                    {req.sourcePlatform || "-"}
                  </p>
                </div>
              )}

              <div className="mt-3">
                <p>
                  <strong>Client Note:</strong> {req.notes || "-"}
                </p>
              </div>

              <div className="mt-4">
                <textarea
                  defaultValue={req.adminNote || ""}
                  placeholder="Admin internal note"
                  className="w-full rounded border p-3"
                  onBlur={(e) =>
                    updateStatus(req.id, req.status, e.target.value)
                  }
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  onClick={() =>
                    updateStatus(req.id, "approved", req.adminNote || "")
                  }
                  className="rounded bg-green-600 px-4 py-2 text-white"
                >
                  Approve
                </button>

                <button
                  onClick={() =>
                    updateStatus(req.id, "rejected", req.adminNote || "")
                  }
                  className="rounded bg-red-600 px-4 py-2 text-white"
                >
                  Reject
                </button>

                <button
                  onClick={() =>
                    updateStatus(req.id, "in_review", req.adminNote || "")
                  }
                  className="rounded bg-yellow-500 px-4 py-2 text-white"
                >
                  In Review
                </button>

                <button
                  onClick={() =>
                    updateStatus(req.id, "completed", req.adminNote || "")
                  }
                  className="rounded bg-blue-600 px-4 py-2 text-white"
                >
                  Completed
                </button>

                {req.email && (
                  <a
                    href={`mailto:${req.email}`}
                    className="rounded border px-4 py-2 text-sm font-medium text-slate-700"
                  >
                    Email Client
                  </a>
                )}

                {req.phone && (
                  <a
                    href={`https://wa.me/${req.phone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded border px-4 py-2 text-sm font-medium text-slate-700"
                  >
                    WhatsApp
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

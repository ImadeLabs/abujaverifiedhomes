"use client";

import { useEffect, useState } from "react";

type DueDiligenceRequest = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  propertyId: string | null;
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

  async function updateRequest(
    id: string,
    status: string,
    adminNote: string
  ) {
    try {
      const res = await fetch(`/api/due-diligence/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status, adminNote }),
      });

      if (!res.ok) {
        throw new Error("Failed to update request");
      }

      setRequests((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status, adminNote } : item
        )
      );
    } catch (error) {
      console.error("Error updating request:", error);
      alert("Failed to update request");
    }
  }

  useEffect(() => {
    fetchRequests();
  }, []);

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
                <p><strong>Name:</strong> {req.name}</p>
                <p><strong>Email:</strong> {req.email}</p>
                <p><strong>Phone:</strong> {req.phone || "-"}</p>
                <p><strong>Property:</strong> {req.propertyId || "-"}</p>
                <p><strong>Status:</strong> {req.status}</p>
                <p><strong>Date:</strong> {new Date(req.createdAt).toLocaleString()}</p>
              </div>

              <div className="mt-3">
                <p><strong>Client Note:</strong> {req.notes || "-"}</p>
              </div>

              <div className="mt-4 space-y-3">
                <select
                  value={req.status}
                  onChange={(e) =>
                    updateRequest(req.id, e.target.value, req.adminNote || "")
                  }
                  className="rounded border p-2"
                >
                  <option value="pending">Pending</option>
                  <option value="in_review">In Review</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="completed">Completed</option>
                </select>

                <textarea
                  defaultValue={req.adminNote || ""}
                  placeholder="Admin internal note"
                  className="w-full rounded border p-3"
                  onBlur={(e) =>
                    updateRequest(req.id, req.status, e.target.value)
                  }
                />

                <div className="flex gap-3">
                  <button
                    onClick={() =>
                      updateRequest(req.id, "approved", req.adminNote || "")
                    }
                    className="rounded bg-green-600 px-4 py-2 text-white"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      updateRequest(req.id, "rejected", req.adminNote || "")
                    }
                    className="rounded bg-red-600 px-4 py-2 text-white"
                  >
                    Reject
                  </button>

                  <button
                    onClick={() =>
                      updateRequest(req.id, "in_review", req.adminNote || "")
                    }
                    className="rounded bg-yellow-500 px-4 py-2 text-white"
                  >
                    Mark In Review
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
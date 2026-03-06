"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchRequests() {
    const { data, error } = await supabase
      .from("due_diligence")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
    } else {
      setRequests(data);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {loading && <p>Loading inspection requests...</p>}

      {!loading && (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3">Name</th>
              <th className="border p-3">Email</th>
              <th className="border p-3">Phone</th>
              <th className="border p-3">Property</th>
              <th className="border p-3">Notes</th>
              <th className="border p-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td className="border p-3">{req.name}</td>
                <td className="border p-3">{req.email}</td>
                <td className="border p-3">{req.phone}</td>
                <td className="border p-3">{req.property_id}</td>
                <td className="border p-3">{req.notes}</td>
                <td className="border p-3">
                  {new Date(req.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
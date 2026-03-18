"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Property = {
  id: string;
  title: string;
  price: number;
  area: string | null;
  city: string | null;
  listing_type: "sale" | "rent";
  property_type: string | null;
  verified: boolean;
  featured: boolean;
  status: "draft" | "published" | "sold" | "rented" | "hidden";
  cover_image_url: string | null;
  created_at: string;
};

function formatPrice(price: number, listingType: string) {
  const formatted = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(price || 0);

  return listingType === "rent" ? `${formatted} / year` : formatted;
}

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    fetchProperties();
  }, []);

  async function fetchProperties() {
    setLoading(true);
    setFeedback("");

    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setFeedback("Failed to load properties.");
      setLoading(false);
      return;
    }

    setProperties((data || []) as Property[]);
    setLoading(false);
  }

  async function handleDelete(propertyId: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this property?"
    );
    if (!confirmed) return;

    setFeedback("");

    const { error } = await supabase
      .from("properties")
      .delete()
      .eq("id", propertyId);

    if (error) {
      console.error(error);
      setFeedback("Failed to delete property.");
      return;
    }

    setProperties((prev) => prev.filter((item) => item.id !== propertyId));
    setFeedback("Property deleted successfully.");
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-7xl p-6 md:p-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Admin Properties Dashboard
            </h1>
            <p className="mt-2 text-slate-600">
              Manage all AbujaVerifiedHomes listings from one place.
            </p>
          </div>

          <Link
            href="/admin/properties/new"
            className="rounded-xl bg-black px-5 py-3 font-semibold text-white"
          >
            Add New Property
          </Link>
        </div>

        {feedback && (
          <div className="mb-6 rounded-xl border bg-white p-4 text-sm text-slate-700">
            {feedback}
          </div>
        )}

        {loading && (
          <div className="rounded-xl border bg-white p-6 text-slate-500">
            Loading properties...
          </div>
        )}

        {!loading && properties.length === 0 && (
          <div className="rounded-xl border bg-white p-6 text-slate-500">
            No properties found. Add your first one.
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {properties.map((property) => (
            <div
              key={property.id}
              className="overflow-hidden rounded-2xl border bg-white shadow-sm"
            >
              <img
                src={
                  property.cover_image_url ||
                  "https://placehold.co/800x500?text=No+Image"
                }
                alt={property.title}
                className="h-56 w-full object-cover"
              />

              <div className="space-y-4 p-5">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    {property.listing_type === "rent" ? "For Rent" : "For Sale"}
                  </span>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    {property.status}
                  </span>

                  {property.verified && (
                    <span className="rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
                      Verified
                    </span>
                  )}

                  {property.featured && (
                    <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white">
                      Featured
                    </span>
                  )}
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {property.title}
                  </h2>
                  <p className="mt-1 text-lg font-semibold text-slate-900">
                    {formatPrice(property.price, property.listing_type)}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    {property.area || "No area"}, {property.city || "Abuja"}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {property.property_type || "Property"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href={`/properties/${property.id}`}
                    className="rounded-lg border px-4 py-2 text-center text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    View Public
                  </Link>

                  <Link
                    href={`/admin/properties/${property.id}`}
                    className="rounded-lg border px-4 py-2 text-center text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Manage Images
                  </Link>

                  <Link
                    href={`/upload?propertyId=${property.id}`}
                    className="rounded-lg border px-4 py-2 text-center text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Upload Media
                  </Link>

                  <button
                    onClick={() => handleDelete(property.id)}
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                  >
                    Delete
                  </button>
                </div>

                <div className="border-t pt-3 text-xs text-slate-500">
                  ID: {property.id}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
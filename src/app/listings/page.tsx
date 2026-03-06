import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Property = {
  id: string;
  title: string;
  price: number;
  currency: string;
  location_text: string;
  property_type: string;
  bedrooms: number | null;
  bathrooms: number | null;
  status: string;
};

export default async function ListingsPage() {
  const { data, error } = await supabase
    .from("properties")
    .select(
      "id,title,price,currency,location_text,property_type,bedrooms,bathrooms,status,created_at"
    )
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="p-10">
        <h1 className="text-2xl font-bold">Listings</h1>
        <p className="mt-4 text-red-600">Could not load listings: {error.message}</p>
        <p className="mt-2 text-sm text-gray-600">
          Check your Supabase key + RLS policies, and make sure you have at least 1 published
          property.
        </p>
      </main>
    );
  }

  const properties = (data ?? []) as Property[];

  return (
    <main className="p-6 md:p-10">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Available Listings</h1>
        <p className="mt-2 text-gray-600">Verified Abuja properties for diaspora buyers.</p>
      </header>

      {properties.length === 0 ? (
        <div className="rounded border p-6">
          <p className="font-medium">No published properties yet.</p>
          <p className="mt-2 text-gray-600">
            Add one in Supabase Table Editor → <b>properties</b> and set <b>status</b> to{" "}
            <b>published</b>.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((p) => (
            <Link
              key={p.id}
              href={`/listings/${p.id}`}
              className="rounded-xl border p-5 hover:shadow-sm transition"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-semibold leading-snug">{p.title}</h2>
                <span className="text-xs rounded-full border px-2 py-1">{p.property_type}</span>
              </div>

              <p className="mt-2 text-sm text-gray-600">{p.location_text}</p>

              <p className="mt-4 text-xl font-bold">
                {p.currency === "NGN" ? "₦" : ""}
                {Number(p.price).toLocaleString()}
                {p.currency !== "NGN" ? ` ${p.currency}` : ""}
              </p>

              <div className="mt-4 flex gap-3 text-sm text-gray-700">
                {p.bedrooms != null && <span>🛏 {p.bedrooms}</span>}
                {p.bathrooms != null && <span>🛁 {p.bathrooms}</span>}
              </div>

              <p className="mt-4 text-sm underline">View details →</p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
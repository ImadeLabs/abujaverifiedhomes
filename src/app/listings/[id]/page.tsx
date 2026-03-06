import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function PropertyDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: property, error } = await supabase
    .from("properties")
    .select(
      "id,title,description,price,currency,location_text,property_type,bedrooms,bathrooms,status"
    )
    .eq("id", id)
    .eq("status", "published")
    .single();

  if (error || !property) {
    return (
      <main className="p-10 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold">Property not found</h1>
        <p className="mt-2 text-sm text-gray-600">
          {error?.message ?? "No data returned"}
        </p>

        <Link href="/listings" className="mt-6 inline-block underline">
          ← Back to listings
        </Link>
      </main>
    );
  }

  return (
    <main className="p-10 max-w-3xl mx-auto">
      <Link href="/listings" className="inline-block text-sm underline">
        ← Back to listings
      </Link>

      <h1
        className="mt-4 text-3xl font-bold"
        data-cy="property-details-title"
      >
        {property.title}
      </h1>

      <p className="mt-2 text-gray-600">{property.location_text}</p>

      <p
        className="mt-6 text-2xl font-bold"
        data-cy="property-details-price"
      >
        ₦{Number(property.price).toLocaleString()}
      </p>

      <div className="mt-4 flex gap-4 text-sm text-gray-700">
        {property.bedrooms != null && (
          <span>🛏 {property.bedrooms} bedrooms</span>
        )}

        {property.bathrooms != null && (
          <span>🛁 {property.bathrooms} bathrooms</span>
        )}

        {property.property_type && (
          <span>🏠 {property.property_type}</span>
        )}
      </div>

      <div className="mt-6 rounded-xl border p-5">
        <h2 className="font-semibold">Description</h2>

        <p className="mt-2 text-gray-700">
          {property.description || "No description yet."}
        </p>
      </div>

      <div className="mt-8 grid gap-3 md:grid-cols-3">
        <Link
          href={`/due-diligence?propertyId=${property.id}`}
          className="rounded-lg border px-4 py-3 text-center hover:bg-gray-50"
          data-cy="cta-due-diligence"
        >
          Request Due Diligence
        </Link>

        <Link
          href={`/buyer-representation?propertyId=${property.id}`}
          className="rounded-lg border px-4 py-3 text-center hover:bg-gray-50"
          data-cy="cta-buyer-rep"
        >
          Buyer Representation
        </Link>

        <Link
          href={`/escrow?propertyId=${property.id}`}
          className="rounded-lg bg-black px-4 py-3 text-center text-white"
          data-cy="cta-escrow"
        >
          Start Escrow
        </Link>
      </div>
    </main>
  );
}
type Property = {
  id: string;
  title: string;
  price: number;
  area: string | null;
  city: string | null;
  listingType: string;
  propertyType: string | null;
  verified: boolean;
  featured: boolean;
  status: string;
  coverImageUrl: string | null;
};

function formatPrice(price: number, listingType: string) {
  const formatted = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(price || 0);

  return listingType === "rent" ? `${formatted} / year` : formatted;
}

async function getProperty(id: string): Promise<Property | null> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/properties`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch properties");
  }

  const properties: Property[] = await res.json();
  return properties.find((property) => property.id === id) || null;
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = await getProperty(id);

  if (!property) {
    return (
      <main className="min-h-screen bg-slate-50 p-10">
        <div className="mx-auto max-w-4xl rounded-2xl border bg-white p-8">
          <h1 className="text-2xl font-bold text-slate-900">
            Property not found
          </h1>
          <p className="mt-3 text-slate-600">
            The property you are looking for does not exist or is no longer available.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-6xl p-6 md:p-10">
        <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
          <img
            src={
              property.coverImageUrl ||
              "https://placehold.co/1200x700?text=No+Image"
            }
            alt={property.title}
            className="h-[420px] w-full object-cover"
          />

          <div className="space-y-6 p-6 md:p-8">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {property.listingType === "rent" ? "For Rent" : "For Sale"}
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
              <h1 className="text-3xl font-bold text-slate-900">
                {property.title}
              </h1>
              <p className="mt-2 text-2xl font-semibold text-slate-900">
                {formatPrice(property.price, property.listingType)}
              </p>
            </div>

            <div className="grid gap-4 rounded-2xl bg-slate-50 p-5 md:grid-cols-3">
              <div>
                <p className="text-sm text-slate-500">Area</p>
                <p className="font-semibold text-slate-900">
                  {property.area || "Not specified"}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">City</p>
                <p className="font-semibold text-slate-900">
                  {property.city || "Abuja"}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Property Type</p>
                <p className="font-semibold text-slate-900">
                  {property.propertyType || "Property"}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-5">
              <h2 className="text-xl font-bold text-slate-900">
                Why verify this property?
              </h2>
              <p className="mt-3 text-slate-600">
                Request due diligence to help confirm the property details,
                inspect documentation, review location risk, and improve buyer confidence
                before payment or commitment.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href={`/due-diligence?propertyId=${property.id}`}
                className="rounded-xl bg-black px-6 py-3 font-semibold text-white hover:opacity-90"
              >
                Request Due Diligence
              </a>

              <a
                href="/listings"
                className="rounded-xl border px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
              >
                Back to Listings
              </a>
            </div>

            <div className="border-t pt-4 text-sm text-slate-500">
              Listing ID: {property.id}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
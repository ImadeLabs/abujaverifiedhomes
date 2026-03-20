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

async function getProperties(): Promise<Property[]> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/properties`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch properties");
  }

  return res.json();
}

export default async function ListingsPage() {
  const properties = await getProperties();

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-7xl p-6 md:p-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Abuja Verified Homes Listings
          </h1>
          <p className="mt-2 text-slate-600">
            Browse available verified and featured properties in Abuja.
          </p>
        </div>

        {properties.length === 0 && (
          <div className="rounded-xl border bg-white p-6 text-slate-500">
            No properties found.
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
                  property.coverImageUrl ||
                  "https://placehold.co/800x500?text=No+Image"
                }
                alt={property.title}
                className="h-56 w-full object-cover"
              />

              <div className="space-y-4 p-5">
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
                  <h2 className="text-xl font-bold text-slate-900">
                    {property.title}
                  </h2>
                  <p className="mt-1 text-lg font-semibold text-slate-900">
                    {formatPrice(property.price, property.listingType)}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    {property.area || "No area"}, {property.city || "Abuja"}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {property.propertyType || "Property"}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <a
              href={`/properties/${property.id}`}
    className="rounded-lg border px-4 py-3 text-center text-sm font-medium text-slate-700 hover:bg-slate-50"
  >
    View Details
  </a>

  <a
    href={`/due-diligence?propertyId=${property.id}`}
    className="rounded-lg bg-black px-4 py-3 text-center text-sm font-medium text-white hover:opacity-90"
  >
    Request Verification
  </a>
</div>

                <div className="border-t pt-3 text-xs text-slate-500">
                  Listing ID: {property.id}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
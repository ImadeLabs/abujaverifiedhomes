import Link from "next/link";

const demoProperties = [
  {
    id: "1",
    title: "4 Bedroom Terrace",
    location: "Guzape, Abuja",
    price: "₦180,000,000",
    tag: "Smart Home",
  },
  {
    id: "2",
    title: "Luxury Duplex",
    location: "Maitama, Abuja",
    price: "₦350,000,000",
    tag: "Premium",
  },
  {
    id: "3",
    title: "Serviced Plot",
    location: "Lokogoma, Abuja",
    price: "₦45,000,000",
    tag: "Land Investment",
  },
];

export default function FeaturedProperties() {
  return (
    <section className="bg-slate-950 py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
              Featured Listings
            </p>
            <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
              Verified opportunities in Abuja
            </h2>
          </div>
          <Link href="/listings" className="text-sm font-medium text-emerald-400 hover:text-emerald-300">
            View all listings
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {demoProperties.map((property) => (
            <div
              key={property.id}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/5"
            >
              <div className="h-56 bg-gradient-to-br from-slate-800 to-slate-700" />
              <div className="p-6">
                <div className="mb-3 inline-flex rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-300">
                  {property.tag}
                </div>
                <h3 className="text-xl font-bold text-white">{property.title}</h3>
                <p className="mt-2 text-slate-400">{property.location}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-lg font-bold text-emerald-400">{property.price}</span>
                  <Link
                    href={`/listings/${property.id}`}
                    className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/5"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
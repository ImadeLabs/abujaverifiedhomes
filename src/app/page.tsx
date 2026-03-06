import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <header className="border-b">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold">AbujaVerifiedHomes</h1>

          <nav className="flex gap-4 text-sm">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link href="/listings" className="hover:underline">
              Listings
            </Link>
            <Link href="/due-diligence" className="hover:underline">
              Due Diligence
            </Link>
            <Link href="/admin" className="hover:underline">
              Admin
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
          Verified Abuja property marketplace
        </p>

        <h2 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
          Buy Abuja property with confidence from anywhere in the world.
        </h2>

        <p className="mt-6 max-w-2xl text-lg text-gray-600">
          We help diaspora buyers discover listings, request due diligence,
          inspect properties, and move toward safe transactions with confidence.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/listings"
            className="rounded-lg bg-black px-6 py-3 text-white"
          >
            View Listings
          </Link>

          <Link
            href="/due-diligence"
            className="rounded-lg border px-6 py-3"
          >
            Request Due Diligence
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-16 md:grid-cols-3">
        <div className="rounded-xl border p-6">
          <h3 className="text-lg font-semibold">Verified Listings</h3>
          <p className="mt-2 text-sm text-gray-600">
            Property data and media connected through your platform.
          </p>
        </div>

        <div className="rounded-xl border p-6">
          <h3 className="text-lg font-semibold">Inspection Requests</h3>
          <p className="mt-2 text-sm text-gray-600">
            Buyers can request due diligence directly from the property page.
          </p>
        </div>

        <div className="rounded-xl border p-6">
          <h3 className="text-lg font-semibold">Admin Control</h3>
          <p className="mt-2 text-sm text-gray-600">
            Manage uploads, requests, and listings from your dashboard.
          </p>
        </div>
      </section>
    </main>
  );
}
import PropertyAssistant from "@/components/PropertyAssistant";

export default function HomePage() {
  return (
    <main className="bg-white text-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-50 to-white px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="mb-3 inline-block rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-green-800">
              Abuja Property • Smart Homes • Due Diligence
            </p>

            <h1 className="text-4xl font-bold leading-tight md:text-6xl">
              Verify listings, request due diligence, and make safer property decisions in Abuja, Nigeria— before you pay.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Explore verified property opportunities, ask smart questions
              before you invest, and get guidance on documentation, inspection,
              smart homes, and property planning in Abuja.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/listings"
                className="rounded-xl bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
              >
                View Listings
              </a>

              <a
                href="/contact"
                className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-800 hover:bg-gray-50"
              >
                Speak with Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold">Property Guidance</h2>
            <p className="mt-3 text-sm leading-7 text-gray-600">
              Understand property types, locations, risks, and buying steps
              before making any payment.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold">Due Diligence Support</h2>
            <p className="mt-3 text-sm leading-7 text-gray-600">
              Learn what to verify, which documents matter, and how to reduce
              risk before traveling or investing.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold">Smart Property Insight</h2>
            <p className="mt-3 text-sm leading-7 text-gray-600">
              Ask questions about solar systems, smart homes, infrastructure,
              estate living, and long-term investment potential.
            </p>
          </div>
        </div>
      </section>

      {/* AI Assistant Section */}
      <section className="bg-gray-50 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <PropertyAssistant />
        </div>
      </section>

      {/* Footer CTA */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl rounded-3xl bg-green-700 p-10 text-white">
          <h2 className="text-3xl font-bold">
            Planning a trip to Nigeria for property inspection?
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-green-50">
            Start asking questions now so you can travel with more clarity,
            better preparation, and reduced risk.
          </p>

          <div className="mt-6">
            <a
              href="/contact"
              className="inline-block rounded-xl bg-white px-6 py-3 font-semibold text-green-800 hover:bg-green-50"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
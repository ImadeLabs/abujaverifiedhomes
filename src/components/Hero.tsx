import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.18),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.12),_transparent_25%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 md:grid-cols-2 md:px-6 md:py-28">
        <div>
          <div className="mb-4 inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
            Trusted Abuja property discovery for diaspora buyers and investors
          </div>

          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-white md:text-6xl">
            Buy Abuja property with confidence from anywhere in the world
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            We help diaspora buyers discover listings, request due diligence,
            inspect properties, and move toward safe transactions with confidence.
            We also support investors interested in smart homes, schools, hotels,
            and modern infrastructure opportunities in Abuja.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/listings"
              className="rounded-full bg-emerald-500 px-6 py-3 text-center font-semibold text-slate-950 hover:bg-emerald-400"
            >
              Explore Listings
            </Link>
            <Link
              href="/due-diligence"
              className="rounded-full border border-white/15 px-6 py-3 text-center font-semibold text-white hover:bg-white/5"
            >
              Request Due Diligence
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-2xl font-bold text-white">Verified</p>
              <p className="text-sm text-slate-300">Property-first trust model</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-2xl font-bold text-white">Diaspora</p>
              <p className="text-sm text-slate-300">Remote inspection support</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-2xl font-bold text-white">ROI</p>
              <p className="text-sm text-slate-300">Investment-focused tools</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-emerald-900/10">
          <div className="grid gap-4">
            <div className="rounded-2xl bg-slate-900 p-5">
              <p className="text-sm text-slate-400">Sample Opportunity</p>
              <h3 className="mt-2 text-2xl font-bold text-white">
                4 Bedroom Smart Terrace — Guzape
              </h3>
              <p className="mt-2 text-slate-300">
                Premium land-backed investment with smart automation, solar inverter,
                long-life lithium storage, and backup power planning.
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-emerald-400 text-xl font-bold">₦180,000,000</span>
                <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm text-emerald-300">
                  High demand area
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
                <p className="text-sm text-slate-400">For buyers</p>
                <p className="mt-2 text-lg font-semibold text-white">
                  Safer purchase process
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
                <p className="text-sm text-slate-400">For investors</p>
                <p className="mt-2 text-lg font-semibold text-white">
                  Land + build + resale planning
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">
              <p className="text-sm font-medium text-emerald-300">
                Extra investment categories
              </p>
              <p className="mt-2 text-slate-100">
                Schools, hotels, smart estates, energy-efficient housing, and state-of-the-art infrastructure projects.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
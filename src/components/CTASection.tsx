import Link from "next/link";

export default function CTASection() {
  return (
    <section className="bg-slate-900 py-20">
      <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-gradient-to-r from-emerald-500/15 to-blue-500/10 px-6 py-14 text-center md:px-10">
        <h2 className="text-3xl font-bold text-white md:text-4xl">
          Start building wealth in Abuja real estate with more confidence
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-300">
          Whether you want to buy, verify, develop, or invest in residential,
          educational, hotel, or smart infrastructure projects, AbujaVerifiedHomes
          helps you move with clarity.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/listings"
            className="rounded-full bg-emerald-500 px-6 py-3 font-semibold text-slate-950 hover:bg-emerald-400"
          >
            Browse Listings
          </Link>
          <Link
            href="/calculator"
            className="rounded-full border border-white/10 px-6 py-3 font-semibold text-white hover:bg-white/5"
          >
            Calculate ROI
          </Link>
        </div>
      </div>
    </section>
  );
}
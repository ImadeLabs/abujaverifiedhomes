import Link from "next/link";

export default function InvestmentSection() {
  return (
    <section className="bg-slate-900 py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-2 md:px-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
            Investment Opportunities
          </p>
          <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
            Build, calculate, and invest smarter in Abuja
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            From land acquisition to construction materials, smart home systems,
            solar inverter planning, lithium battery systems, and resale strategy,
            AbujaVerifiedHomes helps investors understand the full picture.
          </p>

          <div className="mt-8 grid gap-4">
            <div className="rounded-2xl border border-white/10 bg-slate-950 p-5 text-slate-200">
              Residential developments
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950 p-5 text-slate-200">
              State-of-the-art schools
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950 p-5 text-slate-200">
              Hotels and hospitality projects
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950 p-5 text-slate-200">
              Smart infrastructure and energy-efficient housing
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-950 p-8">
          <h3 className="text-2xl font-bold text-white">Investor Snapshot</h3>
          <div className="mt-6 space-y-5">
            <div className="rounded-2xl bg-white/5 p-5">
              <p className="text-sm text-slate-400">Land acquisition</p>
              <p className="mt-1 text-white">Estimate plot cost and site preparation</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-5">
              <p className="text-sm text-slate-400">Build planning</p>
              <p className="mt-1 text-white">Calculate construction and materials budget</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-5">
              <p className="text-sm text-slate-400">Power independence</p>
              <p className="mt-1 text-white">
                Plan for solar inverter, lithium battery, and backup power
              </p>
            </div>
            <div className="rounded-2xl bg-white/5 p-5">
              <p className="text-sm text-slate-400">Exit strategy</p>
              <p className="mt-1 text-white">Estimate resale value and projected profit</p>
            </div>
          </div>

          <Link
            href="/calculator"
            className="mt-8 inline-block rounded-full bg-emerald-500 px-6 py-3 font-semibold text-slate-950 hover:bg-emerald-400"
          >
            Open Investment Calculator
          </Link>
        </div>
      </div>
    </section>
  );
}
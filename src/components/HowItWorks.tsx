export default function HowItWorks() {
  const steps = [
    {
      title: "Discover listings",
      description:
        "Browse verified Abuja properties from anywhere in the world.",
    },
    {
      title: "Request due diligence",
      description:
        "Ask for document checks, title verification, and transaction support.",
    },
    {
      title: "Inspect and decide",
      description:
        "Use remote support, site inspection options, and investment tools.",
    },
  ];

  return (
    <section className="bg-slate-950 py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
            How It Works
          </p>
          <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
            A safer property journey for buyers and investors
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-8"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-lg font-bold text-slate-950">
                {index + 1}
              </div>
              <h3 className="text-xl font-bold text-white">{step.title}</h3>
              <p className="mt-3 leading-7 text-slate-300">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
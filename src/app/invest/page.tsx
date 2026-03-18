export default function InvestPage() {
  const sectors = [
    {
      title: "Residential Development",
      desc: "Terrace duplexes, apartments, gated estates, and build-to-sell opportunities.",
    },
    {
      title: "Shortlets & Rentals",
      desc: "Properties positioned for recurring monthly or short-stay income.",
    },
    {
      title: "Hotels & Hospitality",
      desc: "Boutique hotels, serviced apartments, conference stays, and premium hospitality assets.",
    },
    {
      title: "Education Infrastructure",
      desc: "State-of-the-art schools, smart campuses, vocational institutes, and education-focused projects.",
    },
    {
      title: "Smart Infrastructure",
      desc: "Smart estates, automated security systems, solar integration, and resilient property systems.",
    },
    {
      title: "Land Banking & Resale",
      desc: "Acquire land in growth corridors, estimate development potential, and position for future resale.",
    },
  ];

  return (
    <main className="bg-white text-gray-900">
      <section className="bg-gradient-to-r from-green-900 to-green-700 px-6 py-20 text-white">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-4xl font-bold md:text-5xl">
            Smart Investment Opportunities in Abuja
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-white/90">
            Explore investment opportunities in real estate, hospitality,
            education, smart infrastructure, and renewable energy-ready housing.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {sectors.map((sector) => (
            <div
              key={sector.title}
              className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-green-800">
                {sector.title}
              </h2>
              <p className="mt-3 text-gray-600">{sector.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-green-800">
                Build Smarter in Abuja
              </h3>
              <p className="mt-4 text-gray-600">
                We are interested in projects that move Abuja toward smarter,
                safer, and more resilient urban development.
              </p>
              <ul className="mt-6 space-y-3 text-gray-700">
                <li>• Solar-ready homes and estates</li>
                <li>• Inverter and lithium battery systems</li>
                <li>• Automated security and access control</li>
                <li>• Education and hospitality infrastructure</li>
                <li>• Smart residential and mixed-use developments</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-green-800">
                What We Help Investors Do
              </h3>
              <ul className="mt-6 space-y-3 text-gray-700">
                <li>• Discover opportunities</li>
                <li>• Review listings and project ideas</li>
                <li>• Request due diligence</li>
                <li>• Arrange site inspection support</li>
                <li>• Understand land + build positioning</li>
                <li>• Move toward safer transactions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
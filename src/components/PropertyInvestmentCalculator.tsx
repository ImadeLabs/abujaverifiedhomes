"use client";

import { useMemo, useState } from "react";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function PropertyInvestmentCalculator() {
  const [landCost, setLandCost] = useState(45000000);
  const [constructionCost, setConstructionCost] = useState(90000000);
  const [legalFees, setLegalFees] = useState(5000000);
  const [furnishingCost, setFurnishingCost] = useState(12000000);
  const [solarCost, setSolarCost] = useState(15000000);
  const [otherCosts, setOtherCosts] = useState(7000000);
  const [expectedSalePrice, setExpectedSalePrice] = useState(210000000);

  const results = useMemo(() => {
    const totalInvestment =
      landCost +
      constructionCost +
      legalFees +
      furnishingCost +
      solarCost +
      otherCosts;

    const profit = expectedSalePrice - totalInvestment;
    const roi = totalInvestment > 0 ? (profit / totalInvestment) * 100 : 0;

    return { totalInvestment, profit, roi };
  }, [
    landCost,
    constructionCost,
    legalFees,
    furnishingCost,
    solarCost,
    otherCosts,
    expectedSalePrice,
  ]);

  const Field = ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: number;
    onChange: (value: number) => void;
  }) => (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none ring-0 placeholder:text-slate-500 focus:border-emerald-500"
      />
    </div>
  );

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950 p-6 md:p-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
          Investment Calculator
        </p>
        <h2 className="mt-2 text-3xl font-bold text-white">
          Estimate your Abuja property investment potential
        </h2>
        <p className="mt-3 max-w-3xl text-slate-300">
          Use this to estimate land cost, construction, legal fees, furnishing,
          solar and lithium setup, and expected resale value.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="grid gap-5">
          <Field label="Land Cost (₦)" value={landCost} onChange={setLandCost} />
          <Field
            label="Construction Cost (₦)"
            value={constructionCost}
            onChange={setConstructionCost}
          />
          <Field label="Legal / Documentation Fees (₦)" value={legalFees} onChange={setLegalFees} />
          <Field
            label="Furnishing / Finishing Cost (₦)"
            value={furnishingCost}
            onChange={setFurnishingCost}
          />
          <Field
            label="Solar + Inverter + Lithium Battery (₦)"
            value={solarCost}
            onChange={setSolarCost}
          />
          <Field label="Other Costs (₦)" value={otherCosts} onChange={setOtherCosts} />
          <Field
            label="Expected Sale Price (₦)"
            value={expectedSalePrice}
            onChange={setExpectedSalePrice}
          />
        </div>

        <div className="space-y-5">
          <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-6">
            <p className="text-sm text-emerald-300">Total Investment</p>
            <h3 className="mt-2 text-3xl font-bold text-white">
              {formatCurrency(results.totalInvestment)}
            </h3>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-slate-300">Projected Profit</p>
            <h3 className="mt-2 text-3xl font-bold text-white">
              {formatCurrency(results.profit)}
            </h3>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-slate-300">Estimated ROI</p>
            <h3 className="mt-2 text-3xl font-bold text-white">
              {results.roi.toFixed(2)}%
            </h3>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
            <h4 className="text-lg font-semibold text-white">Smart Investor Note</h4>
            <p className="mt-3 leading-7 text-slate-300">
              This calculator is useful for diaspora buyers who want to compare
              direct purchase versus land acquisition + development + resale strategy.
              You can later connect this to your database and save each calculation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
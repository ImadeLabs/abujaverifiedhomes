import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyInvestmentCalculator from "@/components/PropertyInvestmentCalculator";

export default function CalculatorPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <PropertyInvestmentCalculator />
      </div>
      <Footer />
    </main>
  );
}
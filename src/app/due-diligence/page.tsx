import { Suspense } from "react";
import DueDiligenceClient from "./DueDiligenceClient";

export default function DueDiligencePage() {
  return (
    <main className="p-10 max-w-xl mx-auto">
      <Suspense fallback={<div>Loading...</div>}>
        <DueDiligenceClient />
      </Suspense>
    </main>
  );
}
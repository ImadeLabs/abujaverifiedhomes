"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="text-xl font-bold tracking-tight text-white">
          Abuja<span className="text-emerald-400">VerifiedHomes</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm text-slate-200 hover:text-white">
            Home
          </Link>
          <Link href="/listings" className="text-sm text-slate-200 hover:text-white">
            Listings
          </Link>
          <Link href="/calculator" className="text-sm text-slate-200 hover:text-white">
            Investment Calculator
          </Link>
          <Link href="/due-diligence" className="text-sm text-slate-200 hover:text-white">
            Due Diligence
          </Link>
          <Link
            href="/admin"
            className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
          >
            Admin
          </Link>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-md border border-white/10 px-3 py-2 text-sm text-white md:hidden"
        >
          Menu
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-slate-950 md:hidden">
          <div className="flex flex-col gap-4 px-4 py-4">
            <Link href="/" className="text-slate-200">
              Home
            </Link>
            <Link href="/listings" className="text-slate-200">
              Listings
            </Link>
            <Link href="/calculator" className="text-slate-200">
              Investment Calculator
            </Link>
            <Link href="/due-diligence" className="text-slate-200">
              Due Diligence
            </Link>
            <Link
              href="/admin"
              className="inline-block rounded-full bg-emerald-500 px-4 py-2 font-semibold text-slate-950"
            >
              Admin
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
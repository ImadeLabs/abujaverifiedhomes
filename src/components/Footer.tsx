export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-slate-400 md:px-6">
        <p>© {new Date().getFullYear()} AbujaVerifiedHomes. All rights reserved.</p>
      </div>
    </footer>
  );
}
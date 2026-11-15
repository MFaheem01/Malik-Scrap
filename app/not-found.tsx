import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white px-4 text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-600/20 border border-orange-500/30 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-4">
        404 - Page Not Found
      </div>
      <h1 className="text-4xl sm:text-6xl font-black text-white mb-4">
        Material Lot Not Found
      </h1>
      <p className="text-slate-400 text-sm sm:text-base max-w-md mx-auto mb-8">
        The page you are looking for has been relocated or recycled. Please return to the homepage or browse our scrap purchasing services.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm px-6 py-3 rounded-lg shadow-md transition-all cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
        <Link
          href="/services"
          className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm px-6 py-3 rounded-lg border border-slate-700 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>View Scrap Services</span>
        </Link>
      </div>
    </div>
  );
}


"use client";

import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          📚 Web Učebnice
        </Link>
        
        <div className="flex gap-6">
          <Link href="/fyzika" className="hover:text-blue-200">Fyzika</Link>
          <Link href="/matematika" className="hover:text-blue-200">Matematika</Link>
          <Link href="/chemie" className="hover:text-blue-200">Chemie</Link>
          <Link href="/kalkulacka" className="hover:text-blue-200">Kalkulačka</Link>
          <Link href="/ucebnice" className="hover:text-blue-200">Učebnice</Link>
        </div>
      </div>
    </nav>
  );
}

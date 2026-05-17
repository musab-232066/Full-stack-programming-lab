'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [search, setSearch] = useState('');
  return (
    <header className="border-b border-gray-200">
      {/* Top bar: social + phone */}
      <div className="flex justify-end items-center px-6 py-1 text-xs text-gray-500 gap-4 border-b border-gray-100">
        <span>✦ g+ 𝕏 f</span>
        <span>07584 031409</span>
      </div>

      {/* Logo row */}
      <div className="flex items-center justify-between px-6 py-3">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          <span className="text-brand-orange">R</span>ustik Plank
        </Link>
        <nav className="flex gap-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-brand-orange">Home</Link>
          <Link href="/blog" className="hover:text-brand-orange">Blog</Link>
          <Link href="/about" className="hover:text-brand-orange">About Us</Link>
          <Link href="/contact" className="hover:text-brand-orange">Contact Us</Link>
        </nav>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>My Account (login/Register)</span>
          <span>🛒 0 Item</span>
        </div>
      </div>

      {/* Category nav */}
      <div className="flex items-center justify-between px-6 py-2 border-t border-gray-200">
        <nav className="flex gap-8 text-sm font-semibold text-gray-700 uppercase tracking-wide">
          {['Beds','Cabinets','Bookcases','Boxes','Chairs','Tables'].map(cat => (
            <Link key={cat} href={`/?category=${cat.toLowerCase()}`}
              className="hover:text-brand-orange transition-colors">
              {cat}
            </Link>
          ))}
        </nav>
        <div className="flex items-center border border-gray-300 rounded overflow-hidden">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="search"
            className="text-sm px-3 py-1 w-40 focus:outline-none"
          />
          <button className="bg-gray-100 border-l border-gray-300 px-3 py-1 text-gray-500 hover:bg-gray-200">🔍</button>
        </div>
      </div>
    </header>
  );
}
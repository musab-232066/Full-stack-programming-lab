'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [query, setQuery] = useState('');

  return (
    <div className="bg-red-600 flex items-center px-4 py-2 gap-6">
      <Link href="/category" className="text-white font-semibold text-sm px-3 py-1 border-r border-red-400 hover:underline">CATAGORY</Link>
      <Link href="#" className="text-white font-semibold text-sm px-3 py-1 border-r border-red-400 hover:underline">BRAND</Link>
      <Link href="#" className="text-white font-semibold text-sm px-3 py-1 hover:underline">INFO</Link>
      <div className="ml-auto flex">
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-3 py-1 text-sm w-64 outline-none"
        />
        <button className="bg-gray-800 text-white px-4 py-1 text-sm font-semibold hover:bg-gray-700">
          SEARCH
        </button>
      </div>
    </div>
  );
}
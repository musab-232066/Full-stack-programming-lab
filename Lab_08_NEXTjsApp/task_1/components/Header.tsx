import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-extrabold text-indigo-600 tracking-tight hover:text-indigo-700 transition">
          Lab 08 App
        </Link>
        <div className="space-x-6 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-indigo-600 transition">Home</Link>
          <Link href="/about" className="hover:text-indigo-600 transition">About</Link>
          <Link href="/contact" className="hover:text-indigo-600 transition">Contact</Link>
        </div>
      </nav>
    </header>
  );
}
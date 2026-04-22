import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-extrabold text-sky-500 tracking-tight hover:text-sky-600 transition">
          Lab 08 App
        </Link>
        <div className="space-x-6 text-sm font-medium text-gray-500">
          <Link href="/" className="hover:text-sky-500 transition">Home</Link>
          <Link href="/about" className="hover:text-sky-500 transition">About</Link>
          <Link href="/products" className="hover:text-sky-500 transition">Products</Link>
          <Link href="/contact" className="hover:text-sky-500 transition">Contact</Link>
        </div>
      </nav>
    </header>
  );
}
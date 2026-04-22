import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-6 pb-2">
        Welcome to the Home Page
      </h1>
      <p className="text-lg text-slate-600 max-w-2xl mb-8 leading-relaxed">
        This is the main landing page for Lab Task 1. The design has been upgraded using modern utility classes to create a clean, highly responsive layout.
      </p>
      <Link href="/about" className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-lg transition duration-300">
        Learn More About Us
      </Link>
    </div>
  );
}
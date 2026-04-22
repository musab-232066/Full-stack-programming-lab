import { products } from "@/lib/data";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  // Find the specific product based on the dynamic ID in the URL
  const product = products.find((p) => p.id === resolvedParams.id);

  // If the product doesn't exist, show a 404 page
  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto py-16 px-6">
      <Link href="/products" className="text-sky-500 font-medium hover:underline mb-8 inline-block">
        &larr; Back to Products
      </Link>
      
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 text-center">
        <span className="inline-block px-4 py-1 bg-teal-50 text-teal-600 rounded-full text-sm font-bold tracking-wide mb-6">
          Product ID: {product.id}
        </span>
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">{product.title}</h1>
        <p className="text-xl text-gray-500 mb-8 leading-relaxed">{product.description}</p>
        <div className="text-3xl font-black text-sky-500 mb-8">{product.price}</div>
        
        <button className="w-full py-4 bg-sky-500 text-white font-bold rounded-xl shadow-sm hover:bg-sky-600 hover:shadow-md transition duration-300">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
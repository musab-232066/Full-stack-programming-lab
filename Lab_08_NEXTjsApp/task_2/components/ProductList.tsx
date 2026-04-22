import Link from "next/link";
import { products } from "@/lib/data";

export default function ProductList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col hover:shadow-md transition-shadow">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.title}</h2>
          <p className="text-gray-500 mb-6 flex-grow">{product.description}</p>
          <div className="flex justify-between items-center mt-auto">
            <span className="text-xl font-extrabold text-teal-500">{product.price}</span>
            <Link 
              href={`/products/${product.id}`} 
              className="px-5 py-2 bg-sky-50 text-sky-600 font-semibold rounded-full hover:bg-sky-500 hover:text-white transition-colors"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
import Link from 'next/link';

const categories = ['Hot Tubs','Portable Spas','Swim Spas','Inflatable Spas','Accessories','Parts & Filters','Chemicals','Cover Lifters'];

export default function CategoryPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <p className="text-sm text-gray-500 mb-2"><Link href="/" className="hover:underline">Home</Link> &gt; Category</p>
      <h1 className="text-2xl font-bold mb-6">All Categories</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <div key={cat} className="bg-white border rounded p-4 text-center hover:shadow-md cursor-pointer">
            <div className="bg-gray-100 h-24 flex items-center justify-center rounded mb-3 text-gray-400">[Image]</div>
            <p className="text-sm font-semibold">{cat}</p>
            <Link href="/" className="text-xs text-red-600 hover:underline mt-1 block">Shop Now →</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
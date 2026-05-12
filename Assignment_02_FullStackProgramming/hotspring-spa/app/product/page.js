import Link from 'next/link';

export default function ProductPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <p className="text-sm text-gray-500 mb-4"><Link href="/" className="hover:underline">Home</Link> &gt; <Link href="/category" className="hover:underline">Category</Link> &gt; Product</p>
      <div className="grid md:grid-cols-2 gap-8 bg-white rounded border p-6">
        <div className="bg-gray-100 h-72 flex items-center justify-center rounded text-gray-400">[Product Image]</div>
        <div>
          <h1 className="text-2xl font-bold">XS SCYBA X SERIES 119</h1>
          <p className="text-red-600 text-2xl font-bold mt-2">$500.00</p>
          <p className="text-sm text-gray-600 mt-3">The goods of our stores are very reliable and we care about the customer. High quality portable spa for your relaxation needs.</p>
          <div className="flex items-center gap-3 mt-4">
            <label className="text-sm font-semibold">Qty:</label>
            <input type="number" defaultValue={1} min={1} className="border w-16 px-2 py-1 text-sm rounded" />
          </div>
          <div className="flex gap-3 mt-4">
            <button className="bg-red-600 text-white px-6 py-2 rounded text-sm font-semibold hover:bg-red-700">🛒 ADD TO CART</button>
            <button className="border px-6 py-2 rounded text-sm hover:bg-gray-50">♡ WISHLIST</button>
          </div>
          <div className="mt-4 text-sm space-y-1 text-gray-600">
            <p><strong>SKU:</strong> SCY-119</p>
            <p><strong>Availability:</strong> In Stock</p>
            <p><strong>Brand:</strong> HotSpring</p>
          </div>
        </div>
      </div>
      <div className="mt-6 bg-white rounded border p-6">
        <h2 className="font-bold text-lg mb-2">Product Description</h2>
        <p className="text-sm text-gray-600">This is a lorem ipsum placeholder description. The product features state of the art jet technology for the ultimate relaxation experience. Includes warranty and free delivery.</p>
      </div>
    </div>
  );
}
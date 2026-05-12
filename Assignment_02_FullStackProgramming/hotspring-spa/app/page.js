import Link from 'next/link';

const products = Array(8).fill({
  name: 'XS SCYBA X SERIES 119',
  desc: 'The goods of our stores are very reliable and we care about the customer.',
  price: '$500.00',
});

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-4">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-500 text-white rounded p-10 mb-6 relative overflow-hidden">
        <h1 className="text-4xl font-bold text-red-400">Barrier Reef 158 Jet<br />TV-Stereo - Home Theater<br />Supter Spa</h1>
        <p className="mt-2 text-sm">Extra Large and Deep 8 Person<br />158 Jet Supper Spa, TV-Home Theater Spa System,</p>
        <p className="mt-4 text-3xl font-bold">$4899.00</p>
        <Link href="/product" className="mt-3 inline-block bg-red-600 text-white px-6 py-2 text-sm rounded hover:bg-red-700">More Details</Link>
      </div>

      {/* Feature Banners */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-gray-600 text-white p-4 rounded">
          <p className="font-bold">5-7 PERSON SPA</p>
          <p className="text-xs mt-1">This is placeholder version of lorem ipsum proin gravida nibh vel velit auctor</p>
        </div>
        <div className="bg-gray-500 text-white p-4 rounded">
          <p className="font-bold">TV THEATER SPA</p>
          <p className="text-xs mt-1">This is placeholder version of lorem ipsum proin gravida nibh vel velit auctor</p>
        </div>
        <div className="bg-red-600 text-white p-4 rounded flex items-center justify-center">
          <p className="text-4xl font-black">SAVE<br />50%</p>
        </div>
      </div>

      {/* New Products */}
      <h2 className="text-xl font-bold mb-4 border-b-2 border-red-600 pb-1">NEW PRODUCTS</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((p, i) => (
          <div key={i} className="bg-white rounded shadow p-3">
            <div className="bg-gray-100 h-32 flex items-center justify-center text-gray-400 mb-2 rounded">[Spa Image]</div>
            <p className="text-sm font-semibold">{p.name}</p>
            <p className="text-xs text-gray-500 mt-1">{p.desc}</p>
            <p className="text-red-600 font-bold mt-2">{p.price}</p>
            <button className="mt-2 w-full bg-red-600 text-white text-xs py-1.5 rounded hover:bg-red-700">
              🛒 ADD TO CART
            </button>
            <div className="flex justify-between text-xs text-red-600 mt-1">
              <button>ADD TO WISH LIST</button>
              <Link href="/product" className="hover:underline">MORE DETAILS</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
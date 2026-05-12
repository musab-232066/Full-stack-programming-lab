import Link from 'next/link';

const fields = ['First Name *','Last Name *','Company','Address Line 1 *','Address Line 2','City *','State/Province *','Zip/Postal Code *','Country *','Phone *'];

export default function ShippingPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <p className="text-sm text-gray-500 mb-2"><Link href="/" className="hover:underline">Home</Link> &gt; Edit Shipping Address</p>
      <h1 className="text-2xl font-bold mb-6">Edit Shipping Address</h1>
      <div className="bg-white border rounded p-6 space-y-4">
        {fields.map(f=>(
          <div key={f} className="flex items-center gap-4">
            <label className="w-52 text-sm text-right">{f}</label>
            <input type="text" className="border flex-1 px-3 py-1.5 text-sm rounded" />
          </div>
        ))}
        <div className="flex items-center gap-2 ml-56">
          <input type="checkbox" id="default" />
          <label htmlFor="default" className="text-sm">Use as my default shipping address</label>
        </div>
        <div className="ml-56">
          <button className="bg-red-600 text-white px-8 py-2 text-sm rounded hover:bg-red-700 font-semibold">SAVE ADDRESS</button>
        </div>
      </div>
    </div>
  );
}
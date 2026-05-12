import Link from 'next/link';

export default function PaymentPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <p className="text-sm text-gray-500 mb-2"><Link href="/" className="hover:underline">Home</Link> &gt; Checkout &gt; Payment</p>
      <h1 className="text-2xl font-bold mb-6">Payment Information</h1>
      <div className="bg-white border rounded p-6 space-y-4">
        <h2 className="font-bold text-base">Credit / Debit Card</h2>
        <div className="flex gap-2 mb-2">
          {['Visa','MC','Amex','PayPal'].map(p=>(
            <span key={p} className="border px-3 py-1 text-xs rounded bg-gray-50">{p}</span>
          ))}
        </div>
        {[['Cardholder Name *','text'],['Card Number *','text'],['Expiry Date (MM/YY) *','text'],['CVV *','text']].map(([label,type])=>(
          <div key={label} className="flex items-center gap-4">
            <label className="w-52 text-sm text-right">{label}</label>
            <input type={type} className="border flex-1 px-3 py-1.5 text-sm rounded" />
          </div>
        ))}
        <div className="ml-56">
          <button className="bg-red-600 text-white px-8 py-2 text-sm rounded hover:bg-red-700 font-semibold">PLACE ORDER</button>
        </div>
      </div>
    </div>
  );
}
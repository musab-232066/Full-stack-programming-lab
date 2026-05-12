import Link from 'next/link';

export default function OrderDetailsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <p className="text-sm text-gray-500 mb-2"><Link href="/" className="hover:underline">Home</Link> &gt; <Link href="/profile/orders" className="hover:underline">My Orders</Link> &gt; Order Details</p>
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white border rounded p-4">
          <h2 className="font-bold border-b pb-1 mb-2">Order Information</h2>
          <p className="text-sm"><span className="font-semibold">Order #:</span> 100000001</p>
          <p className="text-sm"><span className="font-semibold">Order Date:</span> March 2, 2025</p>
          <p className="text-sm"><span className="font-semibold">Order Status:</span> <span className="text-yellow-600">Pending</span></p>
        </div>
        <div className="bg-white border rounded p-4">
          <h2 className="font-bold border-b pb-1 mb-2">Shipping Address</h2>
          <p className="text-sm">John Doe<br />123 Main Street<br />City, State 12345<br />United States</p>
        </div>
      </div>
      <div className="bg-white border rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>{['Product','SKU','Price','Qty','Subtotal'].map(h=><th key={h} className="px-4 py-2 text-left font-semibold">{h}</th>)}</tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-2">XS SCYBA X SERIES 119</td>
              <td className="px-4 py-2">SKU-001</td>
              <td className="px-4 py-2">$500.00</td>
              <td className="px-4 py-2">1</td>
              <td className="px-4 py-2 font-semibold">$500.00</td>
            </tr>
          </tbody>
          <tfoot>
            <tr className="border-t bg-gray-50">
              <td colSpan={4} className="px-4 py-2 text-right font-bold">Grand Total:</td>
              <td className="px-4 py-2 font-bold text-red-600">$500.00</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
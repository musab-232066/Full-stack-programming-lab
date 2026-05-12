import Link from 'next/link';

const orders = [
  { id: '#100000001', date: '03/02/2025', ship: 'N/A', total: '$500.00', status: 'Pending' },
  { id: '#100000002', date: '03/05/2025', ship: '03/10/2025', total: '$1,000.00', status: 'Complete' },
];

export default function OrdersPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <p className="text-sm text-gray-500 mb-2"><Link href="/" className="hover:underline">Home</Link> &gt; My Orders</p>
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      <div className="bg-white border rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              {['Order #','Date','Ship To','Order Total','Status','Action'].map(h => (
                <th key={h} className="px-4 py-2 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2 text-red-600">{o.id}</td>
                <td className="px-4 py-2">{o.date}</td>
                <td className="px-4 py-2">{o.ship}</td>
                <td className="px-4 py-2 font-semibold">{o.total}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-semibold ${o.status === 'Complete' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{o.status}</span>
                </td>
                <td className="px-4 py-2">
                  <Link href="/profile/order-details" className="text-red-600 hover:underline text-xs">View Order</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

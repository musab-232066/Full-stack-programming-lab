import Link from 'next/link';

export default function MyAccountPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <p className="text-sm text-gray-500 mb-2"><Link href="/" className="hover:underline">Home</Link> &gt; My Account</p>
      <h1 className="text-2xl font-bold mb-6">My Account</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { title: 'Account Information', links: [['Edit Account', '/profile/edit'],['Change Password', '/forgot-password']] },
          { title: 'Address Book', links: [['Manage Addresses', '#'],['Edit Billing Address', '/checkout/billing'],['Edit Shipping Address', '/checkout/shipping']] },
          { title: 'My Orders', links: [['Order History', '/profile/orders'],['Order Details', '/profile/order-details']] },
        ].map(({ title, links }) => (
          <div key={title} className="bg-white border rounded p-4">
            <h2 className="font-bold text-base border-b pb-2 mb-3">{title}</h2>
            <ul className="space-y-1">
              {links.map(([label, href]) => (
                <li key={label}><Link href={href} className="text-red-600 text-sm hover:underline">{label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <p className="text-sm text-gray-500 mb-2"><Link href="/" className="hover:underline">Home</Link> &gt; My Account</p>
      <h1 className="text-2xl font-bold mb-6">Login Or Create Account</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Login Form */}
        <div className="bg-white border rounded p-6">
          <h2 className="font-bold text-lg mb-2">User Login Details</h2>
          <p className="text-sm text-gray-500 mb-1">Please sign in below with your login information.</p>
          <p className="text-xs text-gray-400 mb-4">*Required Fields</p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <label className="w-24 text-sm text-right">Email *</label>
              <input type="email" className="border flex-1 px-3 py-1.5 text-sm rounded" />
            </div>
            <div className="flex items-center gap-3">
              <label className="w-24 text-sm text-right">Password *</label>
              <input type="password" className="border flex-1 px-3 py-1.5 text-sm rounded" />
            </div>
            <div className="flex items-center gap-2 ml-28">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember" className="text-sm">Remember me the next time I visit</label>
            </div>
            <div className="flex items-center gap-4 ml-28">
              <button className="bg-red-600 text-white px-6 py-1.5 text-sm rounded hover:bg-red-700 font-semibold">SIGN IN</button>
              <Link href="/forgot-password" className="text-blue-600 text-sm hover:underline">Forgot your password?</Link>
            </div>
          </div>
        </div>

        {/* New Customer */}
        <div className="bg-white border rounded p-6">
          <h2 className="font-bold text-lg mb-3">New Customer</h2>
          <p className="text-sm mb-3">As a registered Abt.com customer you can:</p>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>Store billing &amp; shipping information</li>
            <li>Check your order status</li>
            <li>Track your delivery status</li>
            <li>View your order history</li>
          </ul>
          <Link href="/register">
            <button className="mt-4 bg-red-600 text-white px-6 py-2 text-sm rounded hover:bg-red-700 font-semibold">CREATE NEW ACCOUNT</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <p className="text-sm text-gray-500 mb-2"><Link href="/" className="hover:underline">Home</Link> &gt; Register</p>
      <h1 className="text-2xl font-bold mb-6">Create New Customer Account</h1>
      <div className="bg-white border rounded p-6 space-y-4">
        <h2 className="font-bold text-base">Personal Information</h2>
        {[['First Name *', 'text'],['Last Name *', 'text'],['Email Address *', 'email'],['Password *', 'password'],['Confirm Password *', 'password']].map(([label, type]) => (
          <div key={label} className="flex items-center gap-4">
            <label className="w-48 text-sm text-right">{label}</label>
            <input type={type} className="border flex-1 px-3 py-1.5 text-sm rounded" />
          </div>
        ))}
        <div className="flex items-center gap-2 ml-52">
          <input type="checkbox" id="newsletter" />
          <label htmlFor="newsletter" className="text-sm">Sign Up for Newsletter</label>
        </div>
        <div className="ml-52">
          <button className="bg-red-600 text-white px-8 py-2 text-sm rounded hover:bg-red-700 font-semibold">REGISTER</button>
        </div>
      </div>
    </div>
  );
}
import Link from 'next/link';

export default function EditAccountPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <p className="text-sm text-gray-500 mb-2"><Link href="/" className="hover:underline">Home</Link> &gt; <Link href="/account" className="hover:underline">My Account</Link> &gt; Edit Account</p>
      <h1 className="text-2xl font-bold mb-6">Edit Account Information</h1>
      <div className="bg-white border rounded p-6 space-y-4">
        {[['First Name *','text'],['Last Name *','text'],['Email Address *','email'],['Current Password *','password'],['New Password','password'],['Confirm New Password','password']].map(([label,type]) => (
          <div key={label} className="flex items-center gap-4">
            <label className="w-52 text-sm text-right">{label}</label>
            <input type={type} className="border flex-1 px-3 py-1.5 text-sm rounded" />
          </div>
        ))}
        <div className="ml-56">
          <button className="bg-red-600 text-white px-8 py-2 text-sm rounded hover:bg-red-700 font-semibold">SAVE CHANGES</button>
        </div>
      </div>
    </div>
  );
}
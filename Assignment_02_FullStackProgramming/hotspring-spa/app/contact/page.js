import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <p className="text-sm text-gray-500 mb-2"><Link href="/" className="hover:underline">Home</Link> &gt; Contact Us</p>
      <h1 className="text-2xl font-bold mb-6">Contact Us</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white border rounded p-6 space-y-4">
          <h2 className="font-bold text-base mb-2">Send Us a Message</h2>
          {[['Name *','text'],['Email *','email'],['Phone','tel'],['Subject *','text']].map(([label,type])=>(
            <div key={label} className="flex flex-col gap-1">
              <label className="text-sm font-medium">{label}</label>
              <input type={type} className="border px-3 py-1.5 text-sm rounded w-full" />
            </div>
          ))}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Message *</label>
            <textarea rows={4} className="border px-3 py-1.5 text-sm rounded w-full"></textarea>
          </div>
          <button className="bg-red-600 text-white px-6 py-2 text-sm rounded hover:bg-red-700 font-semibold">SEND MESSAGE</button>
        </div>
        <div className="bg-white border rounded p-6">
          <h2 className="font-bold text-base mb-4">Contact Information</h2>
          <p className="text-sm mb-2"><strong>Phone:</strong> 888-201-8899</p>
          <p className="text-sm mb-2"><strong>Email:</strong> servicemail@yoursite.com</p>
          <p className="text-sm mb-2"><strong>Hours:</strong> Mon–Fri, 9am–6pm</p>
          <p className="text-sm"><strong>Address:</strong><br />Your Street Address<br />City, State, ZIP</p>
        </div>
      </div>
    </div>
  );
}
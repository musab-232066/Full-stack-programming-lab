export default function Contact() {
  return (
    <div className="max-w-xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-slate-800 mb-8 text-center">Contact Us</h1>
      <form className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
          <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition" placeholder="John Doe" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
          <input type="email" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition" placeholder="john@example.com" />
        </div>
        <button type="button" className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-lg transition duration-300">
          Send Message
        </button>
      </form>
    </div>
  );
}
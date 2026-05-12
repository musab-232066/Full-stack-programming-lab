import Link from 'next/link';

export default function ForgotPasswordPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <p className="text-sm text-gray-500 mb-2"><Link href="/" className="hover:underline">Home</Link> &gt; Forgot Password</p>
      <h1 className="text-2xl font-bold mb-2">Forgot Your Password?</h1>
      <p className="text-sm text-gray-600 mb-6">Please enter your email address below to receive a password reset link.</p>
      <div className="bg-white border rounded p-6 space-y-4 max-w-md">
        <div className="flex items-center gap-4">
          <label className="w-32 text-sm text-right">Email Address *</label>
          <input type="email" className="border flex-1 px-3 py-1.5 text-sm rounded" />
        </div>
        <div className="ml-36">
          <button className="bg-red-600 text-white px-6 py-1.5 text-sm rounded hover:bg-red-700 font-semibold">RESET PASSWORD</button>
        </div>
      </div>
    </div>
  );
}
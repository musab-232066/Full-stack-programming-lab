import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <p className="text-sm text-gray-500 mb-2"><Link href="/" className="hover:underline">Home</Link> &gt; Terms &amp; Conditions</p>
      <h1 className="text-2xl font-bold mb-6">Terms &amp; Conditions</h1>
      <div className="bg-white border rounded p-6 text-sm text-gray-600 space-y-4">
        <h2 className="font-bold text-base text-gray-800">1. Acceptance of Terms</h2>
        <p>By accessing and using this website, you accept and agree to be bound by the terms and conditions of this agreement.</p>
        <h2 className="font-bold text-base text-gray-800">2. Use of the Website</h2>
        <p>You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of others.</p>
        <h2 className="font-bold text-base text-gray-800">3. Privacy Policy</h2>
        <p>We respect your privacy and are committed to protecting your personal data. Please review our privacy policy for details.</p>
        <h2 className="font-bold text-base text-gray-800">4. Returns & Refunds</h2>
        <p>Items may be returned within 30 days of purchase in original condition. Shipping costs for returns are the responsibility of the customer.</p>
        <h2 className="font-bold text-base text-gray-800">5. Limitation of Liability</h2>
        <p>HotSpring Portable Spas shall not be liable for any indirect, incidental, or consequential damages arising from the use of this website.</p>
        <div className="border-t pt-4">
          <p className="font-semibold">By completing your purchase, you agree to these Terms &amp; Conditions.</p>
          <Link href="/cart" className="mt-2 inline-block text-red-600 hover:underline text-sm">← Return to Cart</Link>
        </div>
      </div>
    </div>
  );
}
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <p className="text-sm text-gray-500 mb-2"><Link href="/" className="hover:underline">Home</Link> &gt; About Us</p>
      <h1 className="text-2xl font-bold mb-6">About HotSpring Portable Spas</h1>
      <div className="bg-white border rounded p-6 space-y-4 text-sm text-gray-600">
        <div className="bg-gray-100 h-40 flex items-center justify-center rounded text-gray-400 mb-4">[About Us Image]</div>
        <p>HotSpring Portable Spas has been a leader in the hot tub and portable spa industry for over 20 years. We are committed to providing our customers with the highest quality products at the best possible prices.</p>
        <p>Our team of experts is always on hand to help you find the perfect spa for your needs. Whether you're looking for a small 2-person spa or a large 8-person entertainment system, we have the right product for you.</p>
        <h2 className="font-bold text-base text-gray-800">Our Mission</h2>
        <p>To provide every customer with a relaxing and enjoyable spa experience backed by excellent customer service and industry-leading warranties.</p>
        <h2 className="font-bold text-base text-gray-800">Why Choose Us?</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>20+ years of industry experience</li>
          <li>Top brand products at discounted prices</li>
          <li>Free delivery on all orders</li>
          <li>24/7 customer support</li>
          <li>Industry-leading warranties</li>
        </ul>
      </div>
    </div>
  );
}
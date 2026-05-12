import Link from 'next/link';
import { FaTwitter, FaFacebook, FaLinkedin, FaGoogle, FaYoutube, FaPinterest } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 text-sm mt-8">
      <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Contact */}
        <div>
          <h4 className="text-white font-bold mb-3">CONTACT US</h4>
          <p>yoursite.com</p>
          <p>CALL 24/7: 888-201-8899</p>
          <p>Your Address, Street</p>
          <p>State &amp; Zip Code</p>
          <p>City &amp; Country</p>
          <p>Email: servicemail@yoursite.com</p>
          <div className="flex gap-2 mt-3">
            <FaTwitter /><FaFacebook /><FaLinkedin /><FaGoogle /><FaYoutube /><FaPinterest />
          </div>
        </div>

        {/* Information */}
        <div>
          <h4 className="text-white font-bold mb-3">INFORMATION</h4>
          {['About Us','Customer Service','Privacy Policy','Site Map','Search Terms','Contact Us'].map(item => (
            <Link key={item} href="#" className="block hover:text-white border-b border-gray-600 py-1">{item}</Link>
          ))}
        </div>

        {/* My Account */}
        <div>
          <h4 className="text-white font-bold mb-3">MY ACCOUNT</h4>
          {['Sign In','View Cart','My Wishlist'].map(item => (
            <Link key={item} href="#" className="block hover:text-white border-b border-gray-600 py-1">{item}</Link>
          ))}
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-white font-bold mb-3">SIGNUP FOR A NEWSLETTER</h4>
          <p className="mb-2">Sign up for our news letter:</p>
          <input type="email" className="w-full px-2 py-1 text-gray-900 text-sm" placeholder="Your email" />
          <p className="text-white font-bold mt-3 mb-1">PAYMENT SOLUTIONS</p>
          <div className="flex gap-1 flex-wrap">
            {['Visa','MC','Amex','PayPal'].map(p => (
              <span key={p} className="bg-gray-600 text-xs px-2 py-1 rounded">{p}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="text-center py-3 border-t border-gray-700 text-xs">
        © 2014 Hotubspaservice.com. All Rights Reserved.
      </div>
    </footer>
  );
}
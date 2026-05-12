import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';

export default function Header() {
  return (
    <>
      {/* Top bar */}
      <div className="bg-white text-sm py-1 px-4 flex justify-between items-center border-b">
        <span>Call for Customer support: <a href="tel:02038989565" className="text-red-600 font-medium">020 38989565</a></span>
        <div className="flex gap-4">
          <Link href="/account" className="hover:text-red-600">My Account</Link>
          <Link href="/wishlist" className="hover:text-red-600">Wishlist</Link>
          <Link href="/cart" className="hover:text-red-600">To Checkout</Link>
        </div>
      </div>

      {/* Logo + Cart */}
      <div className="bg-white px-6 py-3 flex justify-between items-center">
        <Link href="/">
          <div>
            <span className="text-3xl font-black tracking-tight">HOTSPRING</span>
            <span className="text-red-600 font-semibold text-sm block">Portable Spas</span>
          </div>
        </Link>
        <div className="flex items-center gap-2 border px-3 py-1 rounded">
          <FaShoppingCart className="text-red-600" />
          <Link href="/cart" className="text-sm hover:text-red-600">My Cart: 0 Items (s)</Link>
        </div>
      </div>
    </>
  );
}
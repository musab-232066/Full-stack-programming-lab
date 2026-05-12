'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function CartPage() {
  const [items, setItems] = useState([
    { id: 1, name: 'The Cabaret 3 Person 41 Jet Hot Tub-110 Volt Plug in or 220 Volt Version', qty: 10, price: 9.00 },
    { id: 2, name: 'The Cabaret 3 Person 41 Jet Hot Tub-110 Volt Plug in or 220 Volt Version', qty: 10, price: 9.00 },
  ]);

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <p className="text-sm text-gray-500 mb-2"><Link href="/" className="hover:underline">Home</Link> &gt; Shopping Cart</p>
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      <div className="bg-white border rounded p-4">
        <h2 className="font-bold mb-3">Your Shopping Cart</h2>
        <div className="bg-green-50 border border-green-300 text-green-700 text-sm px-3 py-2 rounded mb-4">
          ✓ Item was just added to cart.
        </div>
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 border-t py-4 items-start">
            <div className="bg-gray-100 w-20 h-20 flex items-center justify-center rounded text-gray-400 text-xs flex-shrink-0">[Img]</div>
            <div className="flex-1">
              <p className="text-sm text-blue-600 font-medium hover:underline cursor-pointer">{item.name}</p>
              <p className="text-xs text-gray-500 mt-1">220 V/50 AMP – 4.5KW Heater 110 V/15 AMP convertible to 220V</p>
              <div className="flex gap-4 mt-2 text-xs">
                <span>Qty: <input type="number" defaultValue={item.qty} className="border w-14 px-1 py-0.5 rounded" /></span>
                <span className="text-gray-500">Standard (7-10 business days)</span>
              </div>
              <div className="flex gap-4 mt-2 text-xs">
                <button className="text-red-600 hover:underline" onClick={() => setItems(items.filter(i => i.id !== item.id))}>Remove</button>
                <button className="text-red-600 hover:underline">Edit Your Order</button>
              </div>
            </div>
            <div className="text-right font-semibold text-sm">${(item.price * item.qty).toFixed(2)}</div>
          </div>
        ))}
        <div className="border-t pt-4 text-right">
          <p className="text-sm font-semibold">Cart summary ({items.length} items)</p>
          <p className="text-xl font-bold mt-1">Total: ${total.toFixed(2)}</p>
          <div className="flex justify-end gap-3 mt-3">
            <Link href="/" className="border px-4 py-2 text-sm rounded hover:bg-gray-50">CONTINUE SHOPPING</Link>
            <Link href="/checkout/payment" className="bg-red-600 text-white px-4 py-2 text-sm rounded hover:bg-red-700 font-semibold">PROCEED TO CHECKOUT</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getProduct } from '../../../lib/api';
import Link from 'next/link';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProduct(id)
      .then((res) => setProduct(res.data))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center py-20 text-gray-400">Loading...</div>;
  if (!product) return <div className="text-center py-20 text-red-400">Product not found.</div>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <Link href="/" className="text-brand-orange hover:underline text-sm mb-4 inline-block">← Back to Shop</Link>
      <div className="flex gap-8 mt-4">
        <div className="w-80 h-80 bg-gray-100 rounded-lg flex items-center justify-center text-8xl flex-shrink-0">
          {product.image ? <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-lg" /> : '🪑'}
        </div>
        <div className="flex-1">
          <span className="text-xs bg-brand-orange text-white px-2 py-0.5 rounded uppercase">{product.category}</span>
          <h1 className="text-3xl font-bold mt-2 mb-3">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          {product.onSale && (
            <p className="text-sm text-red-500 font-semibold mb-1">{product.salePercent}% OFF – LIMITED TIME!</p>
          )}
          <p className="text-4xl font-black text-brand-orange mb-6">£{product.price}</p>
          <button className="bg-brand-orange text-white px-8 py-3 rounded text-lg font-semibold hover:bg-orange-600 transition-colors">
            🛒 Add to Cart
          </button>
          <p className="text-xs text-gray-400 mt-4">In stock: {product.stock} units</p>
        </div>
      </div>
    </div>
  );
}

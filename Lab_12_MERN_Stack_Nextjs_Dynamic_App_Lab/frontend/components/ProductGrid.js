'use client';
import { useState, useEffect } from 'react';
import { getProducts } from '../lib/api';
import ProductCard from './ProductCard';

const columns = [
  { label: 'Featured', type: 'featured' },
  { label: 'Special', type: 'special' },
  { label: 'Popular', type: 'popular' },
];

export default function ProductGrid() {
  const [allProducts, setAllProducts] = useState({ featured: [], special: [], popular: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all(columns.map(c => getProducts({ type: c.type })))
      .then(([feat, spec, pop]) => {
        setAllProducts({ featured: feat.data, special: spec.data, popular: pop.data });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 py-6">
      <div className="grid grid-cols-3 divide-x divide-gray-200 border border-gray-200 rounded bg-white">
        {columns.map(col => (
          <div key={col.type} className="p-4">
            {/* Column header */}
            <h3 className="text-center text-sm font-bold uppercase text-gray-600 mb-4 pb-2 border-b border-gray-200">
              {col.label}
            </h3>

            {/* Products list */}
            {loading ? (
              <p className="text-center text-gray-400 text-xs py-4">Loading...</p>
            ) : allProducts[col.type].length === 0 ? (
              <p className="text-center text-gray-400 text-xs py-4">No products</p>
            ) : (
              <div className="space-y-3">
                {allProducts[col.type].slice(0, 4).map(p => (
                  <ProductCard key={p._id} product={p} />
                ))}
              </div>
            )}

            {/* See All button */}
            <div className="mt-4 pt-3 border-t border-gray-200 text-center">
              <a href={`/?type=${col.type}`}
                className="text-sm text-gray-600 hover:text-brand-orange transition-colors">
                See All {col.label}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
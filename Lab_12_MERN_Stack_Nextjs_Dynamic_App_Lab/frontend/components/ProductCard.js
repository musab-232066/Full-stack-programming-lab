import Link from 'next/link';

export default function ProductCard({ product }) {
  return (
    <div className="flex items-start gap-3 py-2 border-b border-gray-100 last:border-0">
      {/* Image */}
      <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-200">
        {product.image
          ? <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          : <span className="text-2xl">🪑</span>
        }
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-400 leading-tight mb-0.5">This is Photoshop's version Lorem...</p>
        {product.onSale && (
          <p className="text-xs text-gray-400 line-through">£{(product.price * 1.2).toFixed(2)}</p>
        )}
        <p className={`text-sm font-bold ${product.onSale ? 'text-brand-orange' : 'text-gray-800'}`}>
          £{product.price}
        </p>
        <Link href={`/products/${product._id}`}
          className="inline-block mt-1 border border-gray-300 text-xs px-3 py-0.5 rounded hover:bg-brand-orange hover:text-white hover:border-brand-orange transition-colors">
          Detail
        </Link>
      </div>
    </div>
  );
}
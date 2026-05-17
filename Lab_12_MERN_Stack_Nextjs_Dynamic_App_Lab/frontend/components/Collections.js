import Image from 'next/image';

const collections = [
  {
    name: 'Chairs', category: 'chairs',
    img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=300&h=200&fit=crop'
  },
  {
    name: 'Beds', category: 'beds',
    img: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=300&h=200&fit=crop'
  },
  {
    name: 'Tabales', category: 'tables',
    img: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=300&h=200&fit=crop'
  },
];

export default function Collections() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-6">
      <div className="grid grid-cols-3 gap-4">
        {collections.map(col => (
          <a key={col.name} href={`/?category=${col.category}`}
            className="flex items-center justify-between border border-gray-200 rounded p-5 hover:border-brand-orange hover:shadow transition-all group bg-white overflow-hidden">
            <div>
              <p className="text-lg font-bold uppercase text-gray-800 tracking-wide">{col.name}</p>
              <p className="text-brand-orange font-bold uppercase text-sm tracking-widest">Collection</p>
            </div>
            <div className="relative w-24 h-20 rounded overflow-hidden flex-shrink-0">
              <Image src={col.img} alt={col.name} fill className="object-cover group-hover:scale-105 transition-transform" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
const collections = [
  { name: 'Chairs', emoji: '🪑' },
  { name: 'Beds', emoji: '🛏️' },
  { name: 'Tabales', emoji: '🪵' },
];

export default function Collections() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-6">
      <div className="grid grid-cols-3 gap-4">
        {collections.map(col => (
          <a key={col.name} href={`/?category=${col.name.toLowerCase()}`}
            className="flex items-center justify-between border border-gray-200 rounded p-5 hover:border-brand-orange hover:shadow transition-all group bg-white">
            <div>
              <p className="text-lg font-bold uppercase text-gray-800 tracking-wide">{col.name}</p>
              <p className="text-brand-orange font-bold uppercase text-sm tracking-widest">Collection</p>
            </div>
            <div className="text-6xl">{col.emoji}</div>
          </a>
        ))}
      </div>
    </section>
  );
}
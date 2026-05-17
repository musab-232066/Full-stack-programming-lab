const partners = ['f4b', 'Australian Gov', 'QANTAS', 'INTERRISK', 'GE Money', 'Rockwell Collins', 'LexisNexis', 'ohlmedia'];

export default function PartnerLogos() {
  return (
    <section className="border-t border-b border-gray-200 py-5 my-4">
      <div className="max-w-6xl mx-auto flex items-center justify-around px-4 flex-wrap gap-4">
        {partners.map(p => (
          <span key={p} className="text-gray-400 text-sm font-semibold">{p}</span>
        ))}
      </div>
    </section>
  );
}
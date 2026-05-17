export default function HotDeal() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-2xl text-center mb-5" style={{fontFamily:'Georgia,serif'}}>Hot Deal</h2>
      <div className="grid grid-cols-2 gap-4">
        {/* Elite Collection */}
        <div className="relative bg-gray-200 rounded overflow-hidden h-56 flex items-end">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="relative p-5 text-white">
            <p className="text-lg font-bold">Elite Collection</p>
            <p className="text-brand-orange font-bold">Design Furniture</p>
          </div>
          <div className="absolute top-4 right-4 bg-brand-orange text-white rounded-full w-16 h-16 flex flex-col items-center justify-center text-center leading-tight">
            <span className="text-xl font-black">35%</span>
            <span className="text-xs">Sale Off</span>
          </div>
        </div>

        {/* Reclaimed */}
        <div className="relative bg-gray-300 rounded overflow-hidden h-56 flex items-end">
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="relative p-5 text-white">
            <p className="text-lg font-bold">Reclaimed and hand crafted</p>
            <p className="text-brand-orange text-2xl font-black">Sale OFF</p>
            <p className="text-4xl font-black text-white">50%</p>
          </div>
        </div>
      </div>
    </section>
  );
}
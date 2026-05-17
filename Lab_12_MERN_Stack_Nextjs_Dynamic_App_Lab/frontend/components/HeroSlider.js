export default function HeroSlider() {
  return (
    <section className="relative bg-gradient-to-br from-gray-200 via-gray-100 to-white overflow-hidden" style={{minHeight: '340px'}}>
      {/* Orange wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-brand-orange" />
      <div className="absolute bottom-2 left-0 right-0 h-1 bg-orange-300 opacity-50" />

      <div className="max-w-6xl mx-auto flex items-center px-8 py-10 gap-8">
        {/* Furniture image placeholder */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-72 h-64 bg-gray-300 rounded-lg flex items-center justify-center text-8xl shadow-lg">
            🪑
          </div>
        </div>

        {/* Text + price */}
        <div className="flex-1">
          <div className="text-brand-orange text-4xl mb-2">▼</div>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            This is Photoshop's version of Lorem Ipsum. Proin gravida nibh vel velit
            auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit
            consequat ipsum, nec sagittis sem nibh id elit.
          </p>
          <div className="flex items-baseline gap-1 mb-4">
            <span className="text-4xl font-bold text-brand-orange">£129</span>
            <span className="text-xl font-bold text-brand-orange">.99</span>
            <span className="text-sm text-gray-500 ml-2 uppercase">Our Price</span>
          </div>
          <button className="bg-gray-700 text-white text-sm px-5 py-2 rounded flex items-center gap-2 hover:bg-gray-800 transition-colors">
            ADD TO 🛒
          </button>
        </div>
      </div>

      {/* Arrow nav */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2">
        <button className="text-gray-400 text-2xl hover:text-brand-orange">&lt;</button>
        <button className="text-brand-orange text-2xl hover:text-orange-700">&gt;</button>
      </div>
    </section>
  );
}
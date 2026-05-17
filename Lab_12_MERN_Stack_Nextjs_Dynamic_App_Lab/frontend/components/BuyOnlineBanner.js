export default function BuyOnlineBanner() {
  return (
    <section className="bg-yellow-50 border-y border-yellow-200 py-5 px-4 my-4">
      <div className="max-w-6xl mx-auto flex items-center gap-8">
        <div>
          <p className="text-2xl font-black text-green-600 leading-none">BUY ONLINE</p>
          <p className="text-lg font-bold text-green-500">PICK UP IN STORE</p>
        </div>
        <div>
          <p className="text-base font-semibold text-gray-700">NOW AVAILABLE IN OUR STORE SYSTEM</p>
          <p className="text-xs text-gray-500">
            AVAILABLE ON SELECT PRODUCTS.{' '}
            <a href="#" className="text-brand-orange hover:underline">LEARN MORE</a>
          </p>
        </div>
      </div>
    </section>
  );
}
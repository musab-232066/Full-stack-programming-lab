import ProductList from "@/components/ProductList";

export default function ProductsPage() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Products</h1>
        <p className="text-gray-500 text-lg">Browse our latest collection of premium tech accessories.</p>
      </div>
      
      {/* Rendering the required ProductList component */}
      <ProductList />
    </div>
  );
}
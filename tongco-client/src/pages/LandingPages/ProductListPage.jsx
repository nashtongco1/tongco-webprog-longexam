import Button from '../../components/Button.jsx';
import ProductList from '../../components/ProductList.jsx';
import products from '../../assets/product-content.js';

const ProductListPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-purple-900 bg-purple-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-purple-500">
          Rushline Products
        </p>
        <h1 className="max-w-xl text-3xl font-bold leading-tight text-purple-900 sm:text-4xl">
          Gear up for the planet. Performance kits that protect your track.
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-purple-600 sm:text-base">
         Enter the Rushline. Explore high-performance gear crafted from recycled fibers for zero-waste speed.
        </p>
        <div className="mt-6">
          <Button to="/">Back Home</Button>
        </div>
      </section>

      <section className="border-y-2 border-purple-900 bg-purple-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-purple-500">
            Featured Products
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-purple-900">The Regenerative Lab collection</h2>
        </div>

        <ProductList products={products} />
      </section>
    </div>
  );
}

export default ProductListPage

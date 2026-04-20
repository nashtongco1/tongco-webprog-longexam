import { useParams } from 'react-router-dom';
import Button from '../../components/Button.jsx';
import products from '../../assets/product-content.js'

function ProductPage() {
  const { name } = useParams();
  const product = products.find(product => product.name === name);

  if (!product) {
    return (
      <div className="flex w-full flex-col gap-6">
        <section className="border-y-2 border-purple-900 bg-purple-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold text-purple-900">Product not found</h1>
            <Button to="/products" className="mt-6">Back to Products</Button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6">

      <section className="border-y-2 border-purple-900 bg-purple-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-4">
            <Button to="/products">Back to Products</Button>
          </div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-purple-500">
            {product.category}
          </p>
          <h1 className="text-3xl font-bold leading-tight text-purple-900 sm:text-4xl">
            {product.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-purple-600">
            <span className="font-bold text-purple-900">{product.price}</span>
            <span>{product.stock}</span>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-purple-900 bg-purple-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 aspect-[4/3] overflow-hidden rounded-[1.25rem] border-2 border-purple-900 bg-purple-200">
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="max-w-none space-y-4 text-purple-700">
            {product.content.map((paragraph, index) => (
              <p key={index} className="text-base leading-7 text-purple-700 whitespace-pre-wrap">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 border-t-2 border-purple-900 pt-6">
            <Button variant="primary" className="mr-3">Add to Cart</Button>
            <Button to="/products">Back to Products</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductPage;

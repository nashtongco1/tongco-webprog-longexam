import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Button from '../../components/Button.jsx';
import ProductList from '../../components/ProductList.jsx';

const ProductListPage = () => {
  const [searchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const [error, setError] = useState('');

  const categoryFromHome = searchParams.get('category');

  const fetchProducts = async () => {
    try {
      let url = 'http://localhost:5000/api/products';

      const params = new URLSearchParams();

      if (search) {
        params.append('search', search);
      }

      if (category) {
        params.append('category', category);
      }

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);

      const data = await response.json();

      if (!response.ok) {
        setError('Failed to load products');
        return;
      }

      setProducts(data);
      setError('');
    } catch (error) {
      console.error(error);
      setError('Unable to connect to the server');
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/categories'
      );

      const data = await response.json();

      if (response.ok) {
        setCategories(data);

        if (categoryFromHome) {
          const matchedCategory = data.find(
            (item) =>
              item.name.toLowerCase() ===
              categoryFromHome.toLowerCase()
          );

          if (matchedCategory) {
            setCategory(matchedCategory._id);
          }
        } else {
          setCategory('');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [categoryFromHome]);

  useEffect(() => {
    fetchProducts();
  }, [search, category]);

  return (
    <div className="flex w-full flex-col gap-6">

      <section className="border-y-2 border-purple-900 bg-purple-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-purple-500">
          {categoryFromHome
            ? `${categoryFromHome} Collection`
            : 'Rushline Products'}
        </p>

        <h1 className="max-w-xl text-3xl font-bold leading-tight text-purple-900 sm:text-4xl">
          {categoryFromHome
            ? `Shop ${categoryFromHome}`
            : 'Gear up for the planet. Performance kits that protect your track.'}
        </h1>

        <p className="mt-4 max-w-lg text-sm leading-7 text-purple-600 sm:text-base">
          {categoryFromHome
            ? `Browse our available ${categoryFromHome} products.`
            : 'Enter the Rushline. Explore high-performance gear crafted from recycled fibers for zero-waste speed.'}
        </p>

        <div className="mt-6">
          <Button to="/">
            Back Home
          </Button>

          {categoryFromHome && (
            <Button
              to="/products"
              className="ml-3"
            >
              View All Products
            </Button>
          )}
        </div>

      </section>


      <section className="border-y-2 border-purple-900 bg-purple-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

        <div className="mb-6">

          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-purple-500">
            Featured Products
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-purple-900">
            {categoryFromHome
              ? `${categoryFromHome} Products`
              : 'Rushline Lab collection'}
          </h2>

        </div>


        <div
          className={`mb-6 grid gap-4 ${
            categoryFromHome
              ? 'grid-cols-1'
              : 'sm:grid-cols-2'
          }`}
        >

          <input
            type="text"
            placeholder={
              categoryFromHome
                ? `Search ${categoryFromHome} products`
                : 'Search products'
            }
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="rounded-xl border border-purple-300 bg-purple-100 px-4 py-3 text-sm text-purple-900 outline-none placeholder:text-purple-400 focus:border-purple-900 focus:bg-purple-50"
          />


          {!categoryFromHome && (
            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="rounded-xl border border-purple-300 bg-purple-100 px-4 py-3 text-sm text-purple-900 outline-none focus:border-purple-900 focus:bg-purple-50"
            >

              <option value="">
                All Categories
              </option>

              {categories.map((item) => (
                <option
                  key={item._id}
                  value={item._id}
                >
                  {item.name}
                </option>
              ))}

            </select>
          )}

        </div>


        {error ? (
          <p className="text-sm text-purple-600">
            {error}
          </p>
        ) : products.length === 0 ? (
          <p className="text-sm text-purple-600">
            No products found.
          </p>
        ) : (
          <ProductList products={products} />
        )}

      </section>

    </div>
  );
};

export default ProductListPage;
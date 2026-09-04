import { useEffect, useState } from 'react';
import Button from '../../components/Button.jsx';
import {
  getFallbackProductImage,
  getProductImage,
} from '../../assets/productImages.js';

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const fetchCart = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Please log in first');
      return;
    }

    try {
      const response = await fetch(
        'http://localhost:5000/api/orders/cart',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Unable to load cart');
        return;
      }

      setCart(data);
    } catch (error) {
      console.error(error);
      setError('Unable to connect to the server');
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleCheckout = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setMessage('Please log in first');
      return;
    }

    try {
      const response = await fetch(
        'http://localhost:5000/api/orders/checkout',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || 'Checkout failed');
        return;
      }

      setMessage('Order placed successfully');
      setCart(null);

      fetchCart();
    } catch (error) {
      console.error(error);
      setMessage('Unable to connect to the server');
    }
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-purple-900 bg-purple-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-purple-500">
            Customer Cart
          </p>

          <h1 className="text-3xl font-bold leading-tight text-purple-900 sm:text-4xl">
            My Cart
          </h1>

          <div className="mt-6">
            <Button to="/products">Back to Products</Button>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-purple-900 bg-purple-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-3xl">

          {error && (
            <p className="text-sm text-purple-700">
              {error}
            </p>
          )}

          {!error && (!cart || !cart.items || cart.items.length === 0) && (
            <p className="text-sm text-purple-600">
              Your cart is empty.
            </p>
          )}

          {cart?.items?.map((item) => (
            <div
              key={item.product._id}
              className="mb-4 rounded-3xl border-2 border-purple-900 bg-purple-100 p-4"
            >
              <div className="flex flex-col gap-4 sm:flex-row">

                <div className="h-32 w-full overflow-hidden rounded-[1.25rem] bg-yellow-200 sm:w-40">
                  <img
                    src={getProductImage(item.product)}
                    alt={item.product?.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = getFallbackProductImage(item.product);
                    }}
                  />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-purple-900">
                    {item.product.name}
                  </h2>

                  <p className="mt-2 text-sm text-purple-600">
                    Price: ₱{item.price}
                  </p>

                  <p className="mt-1 text-sm text-purple-600">
                    Quantity: {item.quantity}
                  </p>

                  <p className="mt-1 text-sm font-bold text-purple-900">
                    Subtotal: ₱{item.price * item.quantity}
                  </p>
                </div>

              </div>
            </div>
          ))}

          {cart?.items?.length > 0 && (
            <div className="mt-6 border-t-2 border-purple-900 pt-6">
              <p className="mb-4 text-xl font-bold text-purple-900">
                Total: ₱{cart.totalAmount}
              </p>

              <Button
                variant="primary"
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </div>
          )}

          {message && (
            <p className="mt-4 text-sm text-purple-700">
              {message}
            </p>
          )}

        </div>
      </section>
    </div>
  );
};

export default CartPage;

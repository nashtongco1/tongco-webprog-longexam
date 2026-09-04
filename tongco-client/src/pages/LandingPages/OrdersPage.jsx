import { useEffect, useState } from 'react';
import Button from '../../components/Button.jsx';

import {
  getFallbackProductImage,
  getProductImage,
} from '../../assets/productImages.js';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  const [reviewingProduct, setReviewingProduct] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewMessage, setReviewMessage] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Please log in first');
        return;
      }

      try {
        const response = await fetch(
          'http://localhost:5000/api/orders/my-orders',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || 'Unable to load orders');
          return;
        }

        setOrders(data);
      } catch (error) {
        console.error(error);
        setError('Unable to connect to the server');
      }
    };

    fetchOrders();
  }, []);

  const openReviewForm = (product) => {
    setReviewingProduct(product);
    setRating(5);
    setComment('');
    setReviewMessage('');
  };

  const closeReviewForm = () => {
    setReviewingProduct(null);
    setRating(5);
    setComment('');
    setReviewMessage('');
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    setReviewMessage('');

    const token = localStorage.getItem('token');

    if (!token) {
      setReviewMessage('Please log in first');
      return;
    }

    if (!comment.trim()) {
      setReviewMessage('Please enter your review');
      return;
    }

    if (!reviewingProduct?._id) {
      setReviewMessage('Product not found');
      return;
    }

    try {
      const response = await fetch(
        'http://localhost:5000/api/reviews',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            product: reviewingProduct._id,
            rating: Number(rating),
            comment: comment.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setReviewMessage(
          data.message || 'Unable to submit review'
        );
        return;
      }

      setReviewMessage('Review submitted successfully');
      setRating(5);
      setComment('');
    } catch (error) {
      console.error(error);
      setReviewMessage('Unable to connect to the server');
    }
  };

  return (
    <div className="flex w-full flex-col gap-6">

      <section className="border-y-2 border-purple-900 bg-purple-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-3xl">

          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-purple-500">
            Customer Orders
          </p>

          <h1 className="text-3xl font-bold leading-tight text-purple-900 sm:text-4xl">
            My Orders
          </h1>

          <p className="mt-3 text-sm text-purple-600">
            View your orders and leave a review after your order is ready.
          </p>

          <div className="mt-6">
            <Button to="/products">
              Back to Products
            </Button>
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

          {!error && orders.length === 0 && (
            <p className="text-sm text-purple-600">
              No orders found.
            </p>
          )}

          <div className="space-y-5">

            {orders.map((order) => (
              <div
                key={order._id}
                className="rounded-3xl border-2 border-purple-900 bg-purple-100 p-5"
              >

                <div className="flex flex-wrap items-center justify-between gap-3">

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-purple-500">
                      Order
                    </p>

                    <p className="mt-2 text-xs text-purple-600">
                      ID: {order._id}
                    </p>
                  </div>


                  <div className="rounded-full border-2 border-purple-900 bg-purple-50 px-4 py-2">
                    <p className="text-xs font-bold uppercase text-purple-900">
                      {order.status}
                    </p>
                  </div>

                </div>


                <div className="mt-5 space-y-5">

                  {order.items.map((item) => {
                    const canReview =
                      order.status === 'ready' ||
                      order.status === 'claimed';

                    return (
                      <div
                        key={item.product?._id || item.product}
                        className="rounded-2xl border border-purple-300 bg-purple-50 p-4"
                      >

                        <div className="flex flex-col gap-4 sm:flex-row">

                          <div className="h-28 w-full overflow-hidden rounded-[1.25rem] bg-yellow-200 sm:w-36">

                            <img
                              src={getProductImage(item.product)}
                              alt={item.product?.name}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src =
                                  getFallbackProductImage(
                                    item.product
                                  );
                              }}
                            />

                          </div>


                          <div className="flex-1">

                            <p className="text-base font-semibold text-purple-900">
                              {item.product?.name}
                            </p>

                            <p className="mt-2 text-sm text-purple-600">
                              Quantity: {item.quantity}
                            </p>

                            <p className="mt-1 text-sm text-purple-600">
                              Price: ₱{item.price}
                            </p>


                            {canReview && (
                              <Button
                                className="mt-4"
                                variant="primary"
                                onClick={() =>
                                  openReviewForm(
                                    item.product
                                  )
                                }
                              >
                                Write Review
                              </Button>
                            )}


                            {!canReview && (
                              <p className="mt-4 text-xs text-purple-500">
                                Review will be available once the order is ready.
                              </p>
                            )}

                          </div>

                        </div>

                      </div>
                    );
                  })}

                </div>


                <p className="mt-5 text-base font-bold text-purple-900">
                  Total: ₱{order.totalAmount}
                </p>

              </div>
            ))}

          </div>

        </div>
      </section>


      {/* REVIEW FORM */}
      {reviewingProduct && (
        <section className="border-y-2 border-purple-900 bg-purple-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

          <div className="mx-auto max-w-3xl">

            <div className="rounded-3xl border-2 border-purple-900 bg-purple-100 p-5 sm:p-6">

              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-purple-500">
                Product Review
              </p>

              <h2 className="mt-2 text-2xl font-semibold text-purple-900">
                Review {reviewingProduct.name}
              </h2>

              <p className="mt-2 text-sm text-purple-600">
                Tell us about your experience with this product.
              </p>


              <form
                className="mt-6 space-y-5"
                onSubmit={handleReviewSubmit}
              >

                <div>

                  <label
                    htmlFor="rating"
                    className="text-sm font-semibold text-purple-900"
                  >
                    Rating
                  </label>

                  <select
                    id="rating"
                    value={rating}
                    onChange={(e) =>
                      setRating(e.target.value)
                    }
                    className="mt-2 w-full rounded-xl border-2 border-purple-300 bg-purple-50 px-4 py-3 text-sm text-purple-900 outline-none focus:border-purple-900"
                  >
                    <option value="5">
                      5 - Excellent
                    </option>

                    <option value="4">
                      4 - Very Good
                    </option>

                    <option value="3">
                      3 - Good
                    </option>

                    <option value="2">
                      2 - Fair
                    </option>

                    <option value="1">
                      1 - Poor
                    </option>
                  </select>

                </div>


                <div>

                  <label
                    htmlFor="comment"
                    className="text-sm font-semibold text-purple-900"
                  >
                    Review
                  </label>

                  <textarea
                    id="comment"
                    rows="5"
                    value={comment}
                    onChange={(e) =>
                      setComment(e.target.value)
                    }
                    placeholder="Write your review here..."
                    className="mt-2 w-full resize-none rounded-xl border-2 border-purple-300 bg-purple-50 px-4 py-3 text-sm leading-6 text-purple-900 outline-none placeholder:text-purple-400 focus:border-purple-900"
                  />

                </div>


                <div className="flex flex-wrap gap-3">

                  <Button
                    type="submit"
                    variant="primary"
                  >
                    Submit Review
                  </Button>

                  <Button
                    type="button"
                    onClick={closeReviewForm}
                  >
                    Cancel
                  </Button>

                </div>


                {reviewMessage && (
                  <p className="text-sm font-medium text-purple-700">
                    {reviewMessage}
                  </p>
                )}

              </form>

            </div>

          </div>

        </section>
      )}

    </div>
  );
};

export default OrdersPage;
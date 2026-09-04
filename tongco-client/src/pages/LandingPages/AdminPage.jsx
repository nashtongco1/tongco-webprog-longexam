import { useEffect, useRef, useState } from 'react';
import Button from '../../components/Button.jsx';

const inputClasses =
  'mt-2 w-full rounded-xl border border-purple-300 bg-purple-100 px-4 py-3 text-sm text-purple-900 outline-none transition placeholder:text-purple-400 focus:border-purple-900 focus:bg-purple-50';

const AdminPage = () => {
  const token = localStorage.getItem('token');
  const fileInputRef = useRef(null);

  let loggedInUser = null;

  try {
    loggedInUser = JSON.parse(localStorage.getItem('user'));
  } catch {
    loggedInUser = null;
  }

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);

  const [message, setMessage] = useState('');
  const [imageError, setImageError] = useState('');

  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    supplier: '',
    stock: '',
    image: '',
  });

  const [editingProductId, setEditingProductId] = useState(null);

  const authHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/products'
      );

      const data = await response.json();

      if (response.ok) {
        setProducts(data);
      }
    } catch (error) {
      console.error(error);
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
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/suppliers'
      );

      const data = await response.json();

      if (response.ok) {
        setSuppliers(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/orders',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setOrders(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/reviews'
      );

      const data = await response.json();

      if (response.ok) {
        setReviews(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/users',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setUsers(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (loggedInUser?.role === 'admin') {
      fetchProducts();
      fetchCategories();
      fetchSuppliers();
      fetchOrders();
      fetchReviews();
      fetchUsers();
    }
  }, []);

  const handleProductChange = (e) => {
    setProductForm({
      ...productForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    setImageError('');

    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      setImageError('Please choose an image file.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setImageError('Image must be smaller than 5MB.');
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const image = new Image();

      image.onload = () => {
        const maxSize = 800;

        let width = image.width;
        let height = image.height;

        if (width > height && width > maxSize) {
          height = Math.round(
            height * (maxSize / width)
          );
          width = maxSize;
        } else if (
          height >= width &&
          height > maxSize
        ) {
          width = Math.round(
            width * (maxSize / height)
          );
          height = maxSize;
        }

        const canvas =
          document.createElement('canvas');

        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext('2d');

        context.drawImage(
          image,
          0,
          0,
          width,
          height
        );

        const compressedImage =
          canvas.toDataURL(
            'image/jpeg',
            0.75
          );

        setProductForm((current) => ({
          ...current,
          image: compressedImage,
        }));
      };

      image.src = event.target.result;
    };

    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setProductForm((current) => ({
      ...current,
      image: '',
    }));

    setImageError('');

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const clearProductForm = () => {
    setProductForm({
      name: '',
      description: '',
      price: '',
      category: '',
      supplier: '',
      stock: '',
      image: '',
    });

    setEditingProductId(null);
    setImageError('');

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();

    setMessage('');

    const url = editingProductId
      ? `http://localhost:5000/api/products/${editingProductId}`
      : 'http://localhost:5000/api/products';

    const method = editingProductId
      ? 'PUT'
      : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: authHeaders,
        body: JSON.stringify({
          name: productForm.name,
          description:
            productForm.description,
          price: Number(productForm.price),
          category: productForm.category,
          supplier: productForm.supplier,
          stock: Number(productForm.stock),
          image: productForm.image,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.message ||
            'Product operation failed'
        );

        return;
      }

      setMessage(
        editingProductId
          ? 'Product updated successfully'
          : 'Product created successfully'
      );

      clearProductForm();
      fetchProducts();
    } catch (error) {
      console.error(error);

      setMessage(
        'Unable to connect to the server'
      );
    }
  };

  const handleEditProduct = (product) => {
    setEditingProductId(product._id);

    setProductForm({
      name: product.name || '',
      description:
        product.description || '',
      price: product.price || '',
      category:
        product.category?._id || '',
      supplier:
        product.supplier?._id || '',
      stock: product.stock || '',
      image: product.image || '',
    });

    setMessage('');
    setImageError('');

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleConfirmOrder = async (
    orderId
  ) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/orders/${orderId}/confirm`,
        {
          method: 'PUT',
          headers: authHeaders,
        }
      );

      const data = await response.json();

      setMessage(
        data.message ||
          'Order confirmed successfully'
      );

      if (response.ok) {
        fetchOrders();
      }
    } catch (error) {
      console.error(error);

      setMessage(
        'Unable to connect to the server'
      );
    }
  };

  const handleReadyOrder = async (
    orderId
  ) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/orders/${orderId}/ready`,
        {
          method: 'PUT',
          headers: authHeaders,
        }
      );

      const data = await response.json();

      setMessage(
        data.message ||
          'Order is ready for claiming'
      );

      if (response.ok) {
        fetchOrders();
      }
    } catch (error) {
      console.error(error);

      setMessage(
        'Unable to connect to the server'
      );
    }
  };

  const handleEditReview = async (
    review
  ) => {
    const newComment = window.prompt(
      'Edit review comment:',
      review.comment
    );

    if (newComment === null) {
      return;
    }

    const newRating = window.prompt(
      'Edit rating from 1 to 5:',
      review.rating
    );

    if (newRating === null) {
      return;
    }

    const ratingNumber =
      Number(newRating);

    if (
      ratingNumber < 1 ||
      ratingNumber > 5
    ) {
      setMessage(
        'Rating must be from 1 to 5.'
      );

      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/reviews/${review._id}`,
        {
          method: 'PUT',
          headers: authHeaders,
          body: JSON.stringify({
            rating: ratingNumber,
            comment: newComment,
          }),
        }
      );

      const data = await response.json();

      setMessage(
        data.message ||
          'Review updated successfully'
      );

      if (response.ok) {
        fetchReviews();
      }
    } catch (error) {
      console.error(error);

      setMessage(
        'Unable to connect to the server'
      );
    }
  };

  const handleToggleUser = async (
    user
  ) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${user._id}`,
        {
          method: 'PUT',
          headers: authHeaders,
          body: JSON.stringify({
            isActive: !user.isActive,
          }),
        }
      );

      const data = await response.json();

      setMessage(
        data.message ||
          'User updated successfully'
      );

      if (response.ok) {
        fetchUsers();
      }
    } catch (error) {
      console.error(error);

      setMessage(
        'Unable to connect to the server'
      );
    }
  };

  const handleEditUser = async (user) => {
    const newName = window.prompt(
      'Edit user name:',
      user.name
    );

    if (newName === null) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${user._id}`,
        {
          method: 'PUT',
          headers: authHeaders,
          body: JSON.stringify({
            name: newName,
          }),
        }
      );

      const data = await response.json();

      setMessage(
        data.message ||
          'User updated successfully'
      );

      if (response.ok) {
        fetchUsers();
      }
    } catch (error) {
      console.error(error);

      setMessage(
        'Unable to connect to the server'
      );
    }
  };

  if (!token || !loggedInUser) {
    return (
      <div className="flex w-full flex-col gap-6">

        <section className="border-y-2 border-purple-900 bg-purple-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

          <div className="mx-auto max-w-3xl">

            <h1 className="text-3xl font-bold text-purple-900">
              Please log in first
            </h1>

            <Button
              to="/auth/signin"
              className="mt-6"
            >
              Sign In
            </Button>

          </div>

        </section>

      </div>
    );
  }

  if (loggedInUser.role !== 'admin') {
    return (
      <div className="flex w-full flex-col gap-6">

        <section className="border-y-2 border-purple-900 bg-purple-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

          <div className="mx-auto max-w-3xl">

            <h1 className="text-3xl font-bold text-purple-900">
              Access Denied
            </h1>

            <p className="mt-3 text-sm text-purple-600">
              Admin account required.
            </p>

            <Button
              to="/"
              className="mt-6"
            >
              Back Home
            </Button>

          </div>

        </section>

      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6">

      {/* ADMIN HEADER */}
      <section className="border-y-2 border-purple-900 bg-purple-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

        <div className="mx-auto max-w-5xl">

          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-purple-500">
            Administrator
          </p>

          <h1 className="text-3xl font-bold leading-tight text-purple-900 sm:text-4xl">
            Admin Dashboard
          </h1>

          <p className="mt-3 text-sm text-purple-600">
            Manage Rushline Apparel products,
            orders, reviews, and users.
          </p>

          {message && (
            <p className="mt-4 text-sm font-semibold text-purple-700">
              {message}
            </p>
          )}

        </div>

      </section>


      {/* PRODUCTS */}
      <section className="border-y-2 border-purple-900 bg-purple-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

        <div className="mx-auto max-w-5xl">

          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-purple-500">
            Products
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-purple-900">
            Manage Products
          </h2>


          <form
            className="mt-6 space-y-5"
            onSubmit={handleProductSubmit}
          >

            <div>

              <label className="text-sm font-medium text-purple-700">
                Product Name
              </label>

              <input
                name="name"
                value={productForm.name}
                onChange={handleProductChange}
                className={inputClasses}
                required
              />

            </div>


            <div>

              <label className="text-sm font-medium text-purple-700">
                Description
              </label>

              <textarea
                name="description"
                rows="4"
                value={
                  productForm.description
                }
                onChange={handleProductChange}
                className={inputClasses}
                required
              />

            </div>


            <div className="grid gap-5 sm:grid-cols-2">

              <div>

                <label className="text-sm font-medium text-purple-700">
                  Price
                </label>

                <input
                  name="price"
                  type="number"
                  min="0"
                  value={productForm.price}
                  onChange={
                    handleProductChange
                  }
                  className={inputClasses}
                  required
                />

              </div>


              <div>

                <label className="text-sm font-medium text-purple-700">
                  Stock
                </label>

                <input
                  name="stock"
                  type="number"
                  min="0"
                  value={productForm.stock}
                  onChange={
                    handleProductChange
                  }
                  className={inputClasses}
                  required
                />

              </div>

            </div>


            <div className="grid gap-5 sm:grid-cols-2">

              <div>

                <label className="text-sm font-medium text-purple-700">
                  Category
                </label>

                <select
                  name="category"
                  value={productForm.category}
                  onChange={
                    handleProductChange
                  }
                  className={inputClasses}
                  required
                >

                  <option value="">
                    Select Category
                  </option>

                  {categories.map(
                    (category) => (
                      <option
                        key={category._id}
                        value={category._id}
                      >
                        {category.name}
                      </option>
                    )
                  )}

                </select>

              </div>


              <div>

                <label className="text-sm font-medium text-purple-700">
                  Supplier
                </label>

                <select
                  name="supplier"
                  value={productForm.supplier}
                  onChange={
                    handleProductChange
                  }
                  className={inputClasses}
                  required
                >

                  <option value="">
                    Select Supplier
                  </option>

                  {suppliers.map(
                    (supplier) => (
                      <option
                        key={supplier._id}
                        value={supplier._id}
                      >
                        {supplier.name}
                      </option>
                    )
                  )}

                </select>

              </div>

            </div>

            <div>

              <label className="text-sm font-medium text-purple-700">
                Product Image
              </label>


              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />


              <button
                type="button"
                onClick={handleImageClick}
                className="mt-2 flex min-h-44 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-purple-400 bg-purple-100 px-4 py-5 text-center transition hover:border-purple-900 hover:bg-purple-50"
              >

                {productForm.image ? (

                  <img
                    src={productForm.image}
                    alt="Product preview"
                    className="max-h-56 w-auto rounded-xl object-contain"
                  />

                ) : (

                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-10 w-10 text-purple-900"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.5 6.5 13 4h-2L9.5 6.5H6A2.5 2.5 0 0 0 3.5 9v8A2.5 2.5 0 0 0 6 19.5h12a2.5 2.5 0 0 0 2.5-2.5V9A2.5 2.5 0 0 0 18 6.5h-3.5Z"
                      />

                      <circle
                        cx="12"
                        cy="13"
                        r="3.5"
                      />
                    </svg>


                    <p className="mt-3 text-sm font-semibold text-purple-900">
                      Choose Product Image
                    </p>

                    <p className="mt-1 text-xs text-purple-500">
                      Click the camera to select
                      an image
                    </p>

                  </>

                )}

              </button>


              {productForm.image && (
                <div className="mt-3 flex flex-wrap gap-3">

                  <Button
                    type="button"
                    onClick={
                      handleImageClick
                    }
                  >
                    Change Image
                  </Button>

                  <Button
                    type="button"
                    onClick={removeImage}
                  >
                    Remove Image
                  </Button>

                </div>
              )}


              {imageError && (
                <p className="mt-2 text-sm font-medium text-purple-700">
                  {imageError}
                </p>
              )}

            </div>


            <div className="flex flex-wrap gap-3">

              <Button
                type="submit"
                variant="primary"
              >
                {editingProductId
                  ? 'Update Product'
                  : 'Create Product'}
              </Button>


              {editingProductId && (
                <Button
                  type="button"
                  onClick={clearProductForm}
                >
                  Cancel Edit
                </Button>
              )}

            </div>

          </form>

          <div className="mt-8 space-y-4">

            {products.map((product) => (
              <div
                key={product._id}
                className="rounded-3xl border-2 border-purple-900 bg-purple-100 p-4"
              >

                <div>

                  <h3 className="text-lg font-semibold text-purple-900">
                    {product.name}
                  </h3>

                  <p className="mt-2 text-sm text-purple-600">
                    ₱{product.price} | Stock: {product.stock}
                  </p>

                  <p className="mt-1 text-sm text-purple-600">
                    Category: {product.category?.name}
                  </p>

                  <Button
                    className="mt-4"
                    onClick={() =>
                      handleEditProduct(product)
                    }
                  >
                    Edit Product
                  </Button>

                </div>

              </div>
            ))}

          </div>

        </div>

      </section>


      {/* ORDERS */}
      <section className="border-y-2 border-purple-900 bg-purple-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

        <div className="mx-auto max-w-5xl">

          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-purple-500">
            Orders
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-purple-900">
            Manage Orders
          </h2>


          <div className="mt-6 space-y-4">

            {orders.length === 0 ? (

              <p className="text-sm text-purple-600">
                No orders found.
              </p>

            ) : (

              orders.map((order) => (

                <div
                  key={order._id}
                  className="rounded-3xl border-2 border-purple-900 bg-purple-100 p-4"
                >

                  <p className="font-semibold text-purple-900">
                    Customer:{' '}
                    {order.user?.name}
                  </p>

                  <p className="mt-2 text-sm text-purple-600">
                    Status: {order.status}
                  </p>

                  <p className="mt-1 text-sm text-purple-600">
                    Total: ₱
                    {order.totalAmount}
                  </p>


                  <div className="mt-4">

                    {order.status ===
                      'ongoing' && (

                      <Button
                        variant="primary"
                        onClick={() =>
                          handleConfirmOrder(
                            order._id
                          )
                        }
                      >
                        Confirm Order
                      </Button>

                    )}


                    {order.status ===
                      'confirmed' && (

                      <Button
                        variant="primary"
                        onClick={() =>
                          handleReadyOrder(
                            order._id
                          )
                        }
                      >
                        Ready for Claiming
                      </Button>

                    )}


                    {order.status ===
                      'ready' && (

                      <p className="text-sm font-semibold text-purple-700">
                        Order is ready for
                        claiming.
                      </p>

                    )}

                  </div>

                </div>

              ))

            )}

          </div>

        </div>

      </section>


      {/* REVIEWS */}
      <section className="border-y-2 border-purple-900 bg-purple-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

        <div className="mx-auto max-w-5xl">

          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-purple-500">
            Reviews
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-purple-900">
            Manage Reviews
          </h2>


          <div className="mt-6 space-y-4">

            {reviews.length === 0 ? (

              <p className="text-sm text-purple-600">
                No reviews found.
              </p>

            ) : (

              reviews.map((review) => (

                <div
                  key={review._id}
                  className="rounded-3xl border-2 border-purple-900 bg-purple-100 p-4"
                >

                  <p className="font-semibold text-purple-900">
                    {review.product?.name}
                  </p>

                  <p className="mt-2 text-sm text-purple-600">
                    Customer:{' '}
                    {review.user?.name}
                  </p>

                  <p className="mt-1 text-sm text-purple-600">
                    Rating:{' '}
                    {review.rating}/5
                  </p>

                  <p className="mt-2 text-sm text-purple-700">
                    {review.comment}
                  </p>


                  <Button
                    className="mt-4"
                    onClick={() =>
                      handleEditReview(
                        review
                      )
                    }
                  >
                    Edit Review
                  </Button>

                </div>

              ))

            )}

          </div>

        </div>

      </section>


      {/* USERS */}
      <section className="border-y-2 border-purple-900 bg-purple-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

        <div className="mx-auto max-w-5xl">

          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-purple-500">
            Users
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-purple-900">
            Manage Users
          </h2>


          <div className="mt-6 space-y-4">

            {users.map((user) => (

              <div
                key={user._id}
                className="rounded-3xl border-2 border-purple-900 bg-purple-100 p-4"
              >

                <h3 className="text-lg font-semibold text-purple-900">
                  {user.name}
                </h3>

                <p className="mt-2 text-sm text-purple-600">
                  {user.email}
                </p>

                <p className="mt-1 text-sm text-purple-600">
                  Role: {user.role}
                </p>

                <p className="mt-1 text-sm font-semibold text-purple-900">
                  Status:{' '}
                  {user.isActive
                    ? 'Active'
                    : 'Inactive'}
                </p>


                <div className="mt-4 flex flex-wrap gap-3">

                  <Button
                    onClick={() =>
                      handleEditUser(user)
                    }
                  >
                    Edit User
                  </Button>


                  <Button
                    variant="primary"
                    onClick={() =>
                      handleToggleUser(user)
                    }
                  >
                    {user.isActive
                      ? 'Set Inactive'
                      : 'Set Active'}
                  </Button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

    </div>
  );
};

export default AdminPage;
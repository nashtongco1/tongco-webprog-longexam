# Rushline Apparel

Rushline Apparel is an e-commerce web application made for the Bulldogs Exchange frontend and backend integration activity.

The project uses React for the frontend and Node.js, Express, and MongoDB for the backend. The frontend connects to the backend using REST API requests.

## Features

### Customer

* Register and log in
* View products
* Search products
* Filter products by category
* View product details and reviews
* Add products to cart
* Checkout orders
* View orders
* Add product reviews
* Update profile
* Change password
* Log out

### Admin

* Log in as admin
* Add products
* View and edit products
* View customer orders
* Confirm orders
* Mark orders as ready for claiming
* View and edit reviews
* View users
* Edit user information
* Activate or deactivate user accounts

## Technologies Used

### Frontend

* React
* React Router DOM
* Vite
* Tailwind CSS
* Fetch API
* Local Storage

### Backend

* Node.js
* Express
* MongoDB
* Mongoose
* JSON Web Token (JWT)
* bcryptjs
* dotenv
* cors
* nodemon

## Client and Server Connection

The React frontend connects to the Express backend using the `fetch` API.

The backend API starts with:

```txt
http://localhost:5000/api
```

Examples:

```txt
/api/auth
/api/products
/api/orders
/api/reviews
/api/users
/api/categories
/api/suppliers
```

After login, the JWT token is saved in `localStorage`. The token is used when accessing protected pages such as cart, orders, profile, and admin features.

Protected requests use:

```txt
Authorization: Bearer <token>
```

The system also checks the user's role. Customers can only access customer features, while admins can access management features.

## Project Structure

```txt
tongco-webprog-longexam/
|-- README.md
|-- package.json
|-- server.js
|-- createAdmin.js
|-- seedProducts.js
|
|-- tongco-client/
|   |-- src/
|       |-- components/
|       |-- layouts/
|       |-- pages/
|       |-- App.jsx
|       |-- main.jsx
|
|-- tongco-server/
    |-- config/
    |-- controllers/
    |-- middleware/
    |-- models/
    |-- routes/
    |-- utils/
```

## Main API Endpoints

### Authentication

```txt
POST /api/auth/register
POST /api/auth/login
```

### Products

```txt
GET  /api/products
GET  /api/products/:id
POST /api/products
PUT  /api/products/:id
```

### Orders

```txt
POST /api/orders/cart
GET  /api/orders/cart
POST /api/orders/checkout
GET  /api/orders/my-orders
GET  /api/orders
PUT  /api/orders/:id/confirm
PUT  /api/orders/:id/ready
```

### Reviews

```txt
GET  /api/reviews
POST /api/reviews
PUT  /api/reviews/:id
```

### Users

```txt
GET /api/users/profile
PUT /api/users/profile
PUT /api/users/change-password
GET /api/users
PUT /api/users/:id
```

## Error Handling

The system handles common errors such as:

* `400` - Invalid or missing information
* `401` - User is not logged in or token is invalid
* `403` - User does not have permission
* `404` - Data was not found
* `500` - Server or database error

## How to Run

### Backend

Open the main project folder and run:

```bash
npm install
npm run dev
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

The backend will run on:

```txt
http://localhost:5000
```

### Frontend

Open the `tongco-client` folder and run:

```bash
npm install
npm run dev
```

The frontend will usually run on:

```txt
http://localhost:5173
```

## Design Pattern

The frontend uses React components. Pages and reusable parts such as the navbar, footer, buttons, and product cards are separated into different files.

The backend uses an MVC-like structure. Routes, controllers, models, middleware, configuration, and utilities are separated to keep the project organized.

## Purpose

This project shows how a React frontend can connect to a Node.js and MongoDB backend. It also demonstrates authentication, user roles, API requests, database operations, and error handling.

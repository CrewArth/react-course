# E-Commerce Application

A React e-commerce application built with Redux for state management, featuring user authentication, product listing, and shopping cart functionality.

## Features

- User authentication with JWT token storage
- Product listing with category filters
- Pagination for products
- Add to cart functionality
- Shopping cart with quantity management
- Checkout page with order summary
- Protected routes for authenticated users

## Technologies Used

- React
- Redux Toolkit
- React Router
- DummyJSON API

## Installation

1. Install dependencies:
```bash
npm install
```

## Running the Application

Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## Project Structure

```
src/
  components/
    - Login.jsx          # Login page with authentication
    - Home.jsx            # Product listing page
    - Checkout.jsx        # Checkout page
    - Navbar.jsx          # Navigation bar
    - ProtectedRoute.jsx  # Route protection component
  store/
    slices/
      - authSlice.js      # Authentication state
      - cartSlice.js      # Cart state
    - store.js            # Redux store configuration
  App.js                  # Main app component with routing
  index.js                # Entry point
```

## API Endpoints Used

- Authentication: `https://dummyjson.com/auth/login`
- Products: `https://dummyjson.com/products`
- Categories: `https://dummyjson.com/products/categories`

## Login Credentials

You can use any username and password from the DummyJSON API. For testing:
- Username: `kminchelle`
- Password: `0lelplR`

## Features Breakdown

### Authentication
- Login page with form validation
- JWT token stored in localStorage
- Automatic redirect after successful login
- Protected routes for authenticated pages

### Product Display
- Fetches products from DummyJSON API
- Category-based filtering
- Pagination (12 products per page)
- Product cards with image, title, price, and description

### Shopping Cart
- Add products to cart
- View cart count in navigation bar
- Update product quantities
- Remove items from cart
- Calculate total price

### Checkout
- Display all cart items
- Order summary with subtotal and shipping
- Place order functionality

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner

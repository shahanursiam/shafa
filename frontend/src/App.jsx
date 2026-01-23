import React from 'react';
import { UserProvider } from './contexts/UserContext';
import { CartProvider } from './contexts/CartContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Shipping from './pages/Shipping';
import Orders from './pages/Orders';
import Signup from './pages/Signup';
import Footer from './components/Footer';
import PageNotFound from './pages/PageNotFound';
import Contact from './pages/Contact';
import SellerDashboard from './pages/SellerDashboard';
import UserProfile from './pages/UserProfile';
import { ToastContainer } from "react-toastify";
import ProductDetails from './pages/ProductDetails';
const App = () => {
  return (
    <div>
      <UserProvider>
        <CartProvider>
          <ToastContainer />
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/products" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              <Route
                path="/shipping"
                element={
                  <ProtectedRoute>
                    <Shipping />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                }
              />
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/seller/dashboard"
                element={
                  <ProtectedRoute sellerOnly>
                    <SellerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user/profile"
                element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                }
              />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </CartProvider>
      </UserProvider>
    </div>
  );
};

export default App;
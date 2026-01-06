import React from 'react';
import { UserProvider } from './contexts/UserContext';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Navbar from './components/Navbar';
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
        <ToastContainer />
         <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/seller/dashboard" element={<SellerDashboard />} />
            <Route path="/user/profile" element={<UserProfile />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </UserProvider>
    </div>
  );
};

export default App;
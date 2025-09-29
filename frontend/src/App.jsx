import React from "react";
import { Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from './pages/PlaceOrder';
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Protectedroutes from "./routes/Protectedroutes";
import Searchbar from "./components/Searchbar";
import { ToastContainer, toast } from 'react-toastify';
import Verify from "./pages/Verify";
import Profile from "./pages/Profile"

const App = () => {
  return (
    // <BrowserRouter>
    <>
    <ToastContainer/>
      <Navbar />
      <Searchbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
         <Route path="/collection/:query" element={<Collection />} />
         <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productID" element={<Product />} />
        <Route path="/verify" element={<Verify />} />
        <Route
          path="/cart"
          element={
            // <Protectedroutes>
              <Cart />
            // </Protectedroutes>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
      <Footer />
      </>
    // </BrowserRouter>
  );
};

export default App;

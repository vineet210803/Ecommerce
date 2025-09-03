
import React from 'react';
import {  Router, Routes, Route, BrowserRouter  } from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/collection';
import About from './pages/About'
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
// import Placeorder from './pages/Placeorder';
import Orders from './pages/Orders';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    <BrowserRouter >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productID" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/placeorder" element={<Placeorder />} /> */}
        <Route path="/orders" element={<Orders />} />
      </Routes>
      <Footer />
     </BrowserRouter>
  );
};

export default App;

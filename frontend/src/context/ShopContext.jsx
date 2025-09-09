import { createContext, useDebugValue, useEffect, useState } from "react";
import { products } from "../assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showsearch, setshowsearch] = useState(false);
  const [cartItems, setCartItems] = useState({});

  const addToCart = async (itemId, size) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
  };

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems])
  

  const ShopContextData = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showsearch,
    setshowsearch,
    addToCart
  };

  return (
    <ShopContext.Provider value={ShopContextData}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;

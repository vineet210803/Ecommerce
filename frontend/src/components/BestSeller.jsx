import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Product from "./Product";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestseller, setBestseller] = useState([]);

  useEffect(() => {
    const Bestsellerproducts = products.filter((item) => item.bestseller);
    setBestseller(Bestsellerproducts.slice(0, 5));
  }, [products]);

  return (
    <>
      <div className="my-10">
        <div className="flex items-center gap-2 justify-center ">
          <p className="text-4xl brightness-50 opacity-50">Best </p>
          <p className="text-4xl brightness-50 ">SELLER</p>
          <div className="bg-gray-500 w-8 h-0.5"></div>
        </div>
        <p className="w-[80vw] mx-auto text-center pt-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
          voluptate quidem nam. Saepe, dolor sed?
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestseller.map((item, index)=>(
            <Product key={index} id={item._id} price={item.price} name={item.name} image={item.image}  />
        ))}
      </div>
    </>
  );
};

export default BestSeller;

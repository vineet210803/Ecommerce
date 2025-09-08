import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

const Product = () => {
  const { productID } = useParams();
  const { products, currency } = useContext(ShopContext);
  const [productdata, setproductdata] = useState(false);
  const [image, setimage] = useState("");
  const [size, setsize] = useState("");
  const [activeTab, setActiveTab] = useState("description");

  const fetchProductdata = async () => {
    products.map((item) => {
      if (item._id === productID) {
        setproductdata(item);
        setimage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductdata();
  }, [productID, products]);

  return productdata ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 px-4 sm:px-10">
      <div className="flex gap-12 flex-col sm:flex-row">
        {/* ---------- Left Image Section ---------- */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="pl-2 flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal w-full sm:max-h-[500px] sm:w-[20%]">
            {productdata.image.map((item, index) => (
              <img
                onClick={() => setimage(item)}
                src={item}
                key={index}
                className={`w-[22%] sm:w-[70px] sm:h-[70px] object-cover flex-shrink-0 cursor-pointer border transition 
                ${image === item ? "border-[#c586a5]" : "border-transparent"}`}
                alt=""
              />
            ))}
          </div>

          <div className="w-full sm:w-[80%] flex items-center justify-center">
            <img
              className="w-full h-auto max-h-[600px] object-contain shadow-md"
              src={image}
              alt={productdata.name}
            />
          </div>
        </div>

        {/* ---------- Right Product Details ---------- */}
        <div className="flex-1">
          <h1 className="font-semibold text-2xl mt-2">{productdata.name}</h1>
          <div className="flex items-center gap-1 mt-3">
            {[...Array(4)].map((_, i) => (
              <img src={assets.star_icon} alt="star" className="w-4" key={i} />
            ))}
            <img src={assets.star_dull_icon} alt="star" className="w-4" />
            <p className="pl-2 text-gray-600 text-sm">(122 Reviews)</p>
          </div>

          <p className="mt-5 text-3xl font-semibold text-gray-800">
            {currency}
            {productdata.price}
          </p>

          <p className="mt-4 text-gray-600 md:w-4/5 leading-relaxed">
            {productdata.description}
          </p>

          {/* Sizes */}
          <div className="flex flex-col gap-3 my-8">
            <p className="font-medium">Select Size</p>
            <div className="flex gap-2">
              {productdata.sizes.map((item, index) => (
                <button
                  onClick={() => setsize(item)}
                  className={`border py-1 px-3 cursor-pointer text-sm transition 
                    ${
                      item === size
                        ? "border-[#c586a5] bg-[#c586a5] text-white"
                        : "bg-gray-100 border-gray-300 hover:bg-gray-200"
                    }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <div>
            <button className="bg-black text-white px-8 py-3 text-sm font-medium active:bg-gray-700 transition">
              ADD TO CART
            </button>

            <hr className="mt-8 sm:w-4/5 border-gray-300" />

            <div className="text-sm text-gray-600 mt-5 flex flex-col gap-1">
              <p>100% Original Product</p>
              <p>Cash on Delivery Available</p>
              <p>10 Days Easy Return & Exchange</p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Description & Review Section ---------- */}
      <div className="mt-12 sm:w-4/5">
        <div className="flex gap-8 border-b text-sm font-medium">
          <button
            className={`pb-2 transition ${
              activeTab === "description"
                ? "border-b-2 border-[#c586a5] text-[#c586a5]"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={`pb-2 transition ${
              activeTab === "reviews"
                ? "border-b-2 border-[#c586a5] text-[#c586a5]"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews (122)
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-6 text-gray-700 leading-relaxed">
          {activeTab === "description" ? (
            <p>
              {productdata.description} <br /> <br />
              This product is crafted with high-quality materials, designed to
              provide durability and style. Perfect for daily wear and available
              in multiple sizes.
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="border p-4 shadow-sm">
                <p className="font-medium">John Doe ⭐⭐⭐⭐☆</p>
                <p className="text-sm text-gray-600 mt-1">
                  Really loved the product, great quality and perfect fit.
                </p>
              </div>
              <div className="border p-4 shadow-sm">
                <p className="font-medium">Jane Smith ⭐⭐⭐⭐⭐</p>
                <p className="text-sm text-gray-600 mt-1">
                  Excellent material, value for money. Will buy again!
                </p>
              </div>
              <div className="border p-4 shadow-sm">
                <p className="font-medium">Rahul Sharma ⭐⭐⭐⭐☆</p>
                <p className="text-sm text-gray-600 mt-1">
                  Product is good but delivery took a little longer.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* ------------Related Products */}
      <div>
        
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;

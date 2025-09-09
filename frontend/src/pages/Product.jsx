import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Relatedproduct from "../components/Relatedproduct";

const Product = () => {
  const { productID } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
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
      return null;
    });
  };

  useEffect(() => {
    fetchProductdata();
  }, [productID, products]);

  return productdata ? (
    <div className="border-t pt-10 transition-opacity ease-in duration-500 opacity-100 px-4 sm:px-10">
      <div className="flex gap-12 flex-col lg:flex-row">
        {/* ---------- Left Image Section ---------- */}
        <div className="flex-1 flex flex-col lg:flex-row gap-3 lg:sticky lg:top-20">
          {/* Thumbnail List */}
          <div className="pl-2 flex lg:flex-col overflow-x-auto lg:overflow-y-auto justify-between lg:justify-normal w-full lg:max-h-[600px] lg:w-[20%]">
            {productdata.image.map((item, index) => (
              <img
                onClick={() => setimage(item)}
                src={item}
                key={index}
                className={`w-[22%] lg:w-[70px] lg:h-[70px] object-cover flex-shrink-0 cursor-pointer rounded-lg border transition-transform duration-200 hover:scale-105 ${
                  image === item ? "border-[#c586a5]" : "border-gray-200"
                }`}
                alt=""
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="w-full lg:w-[80%] flex items-center justify-center">
            <img
              className="w-full h-auto max-h-[650px] object-contain rounded-2xl shadow-lg"
              src={image}
              alt={productdata.name}
            />
          </div>
        </div>

        {/* ---------- Right Product Details ---------- */}
        <div className="flex-1">
          <h1 className="font-bold text-3xl text-gray-900">
            {productdata.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-3">
            {[...Array(4)].map((_, i) => (
              <img src={assets.star_icon} alt="star" className="w-4" key={i} />
            ))}
            <img src={assets.star_dull_icon} alt="star" className="w-4" />
            <p className="pl-2 text-gray-500 text-sm">(122 Reviews)</p>
          </div>

          {/* Price */}
          <p className="mt-5 text-3xl font-semibold">
            {currency}
            {productdata.price}
          </p>

          {/* Short Description */}
          <p className="mt-4 text-gray-600 leading-relaxed">
            {productdata.description}
          </p>

          {/* Sizes */}
          <div className="flex flex-col gap-3 my-8">
            <p className="font-medium text-gray-800">Select Size</p>
            <div className="flex gap-2 flex-wrap">
              {productdata.sizes.map((item, index) => (
                <button
                  onClick={() => setsize(item)}
                  className={`rounded-lg border py-2 px-4 text-sm font-medium transition-all duration-200 ${
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
            <button
              onClick={() => addToCart(productdata._id, size)}
              className="bg-[#c586a5] text-white px-10 py-3 text-sm font-medium shadow-md hover:bg-[#a65a80] transition"
            >
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
            className={`pb-3 transition-all ${
              activeTab === "description"
                ? "border-b-2 border-[#c586a5] text-[#c586a5]"
                : "text-gray-500 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={`pb-3 transition-all ${
              activeTab === "reviews"
                ? "border-b-2 border-[#c586a5] text-[#c586a5]"
                : "text-gray-500 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews (122)
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-6 text-gray-700 leading-relaxed">
          {activeTab === "description" ? (
            <p className="bg-gray-50 p-5 rounded-xl shadow-sm">
              {productdata.description} <br /> <br />✨ This product is crafted
              with high-quality materials, designed to provide durability and
              style. Perfect for daily wear and available in multiple sizes.
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {[
                {
                  name: "John Doe ⭐⭐⭐⭐",
                  review:
                    "Really loved the product, great quality and perfect fit.",
                },
                {
                  name: "Jane Smith ⭐⭐⭐⭐⭐",
                  review:
                    "Excellent material, value for money. Will buy again!",
                },
                {
                  name: "Rahul Sharma ⭐⭐⭐",
                  review: "Product is good but delivery took a little longer.",
                },
              ].map((r, i) => (
                <div
                  className="border p-4 rounded-xl shadow-sm bg-white"
                  key={i}
                >
                  <p className="font-medium">{r.name}</p>
                  <p className="text-sm text-gray-600 mt-1">{r.review}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ------------Related Products ------------ */}
      <div className="mt-16">
        <h2 className="text-xl font-semibold mb-6">You may also like</h2>
        <Relatedproduct
          category={productdata.category}
          subcategory={productdata.subcategory}
        />
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;

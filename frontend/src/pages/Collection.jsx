import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Product from "../components/Product";
import { assets } from "../assets/assets";
import { useParams } from "react-router-dom";

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [filterproducts, setfilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [showFilter, setShowFilter] = useState(false);
  const { query } = useParams();

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubcategory = (e) => {
    if (subcategory.includes(e.target.value)) {
      setSubcategory((prev) =>
        prev.filter((item) => item !== e.target.value)
      );
    } else {
      setSubcategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (query) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subcategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subcategory.includes(item.subCategory)
      );
    }

    setfilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterproducts.slice();
    switch (sortType) {
      case "Low-to-High":
        setfilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;

      case "High-to-Low":
        setfilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subcategory, query, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 pt-12 w-[90vw] mx-auto border-t">
        {/* Sidebar */}
        <div className="sm:w-64">
          {/* Filter Header */}
          <div className="flex items-center justify-between sm:justify-start gap-2">
            <p className="text-2xl font-semibold tracking-wide">Filters</p>
            <img
              onClick={() => setShowFilter(!showFilter)}
              src={assets.dropdown_icon}
              alt="toggle filter"
              className={`h-5 sm:hidden cursor-pointer transition-transform ${
                showFilter ? "rotate-90" : ""
              }`}
            />
          </div>

          {/* Category Filter */}
          <div
            className={`mt-6 rounded-lg border border-gray-200 bg-gray-50 shadow-sm transition-all ${
              showFilter ? "block" : "hidden"
            } sm:block`}
          >
            <p className="font-medium px-5 py-3 border-b border-gray-200">
              Categories
            </p>
            <div className="px-5 py-3 space-y-3 text-gray-700">
              {["Men", "Women", "Kids"].map((cat) => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    value={cat}
                    className="w-4 h-4 accent-black"
                    onChange={toggleCategory}
                    checked={category.includes(cat)}
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Subcategory Filter */}
          <div
            className={`mt-6 rounded-lg border border-gray-200 bg-gray-50 shadow-sm transition-all ${
              showFilter ? "block" : "hidden"
            } sm:block`}
          >
            <p className="font-medium px-5 py-3 border-b border-gray-200">Type</p>
            <div className="px-5 py-3 space-y-3 text-gray-700">
              {["Topwear", "Bottomwear", "Winterwear"].map((sub) => (
                <label key={sub} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    value={sub}
                    className="w-4 h-4 accent-black"
                    onChange={toggleSubcategory}
                    checked={subcategory.includes(sub)}
                  />
                  <span>{sub}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-3xl font-semibold tracking-wide">
              {query ? `Collection for “${query}”` : "All Collections"}
            </h2>

            <select
              onChange={(e) => setSortType(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="relevant">Sort by: Relevant</option>
              <option value="Low-to-High">Sort by: Low to High</option>
              <option value="High-to-Low">Sort by: High to Low</option>
            </select>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filterproducts.length > 0 ? (
              filterproducts.map((item, index) => (
                <div
                  key={index}
                  className="transform hover:-translate-y-1 hover:scale-105 transition duration-300"
                >
                  <Product
                    name={item.name}
                    id={item._id}
                    price={item.price}
                    image={item.image}
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-full py-10">
                No products found
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Collection;

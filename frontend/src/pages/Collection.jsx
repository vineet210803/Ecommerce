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

  // Toggle category filter
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  // Toggle subcategory filter
  const toggleSubcategory = (e) => {
    if (subcategory.includes(e.target.value)) {
      setSubcategory((prev) =>
        prev.filter((item) => item !== e.target.value)
      );
    } else {
      setSubcategory((prev) => [...prev, e.target.value]);
    }
  };

  // Apply filters (search + category + subcategory)
  const applyFilter = () => {
    let productsCopy = products.slice();

    //Apply search filter from URL param
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

  // Sorting function
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

  // Reapply filters when category, subcategory, or query changes
  useEffect(() => {
    applyFilter();
  }, [category, subcategory, query]);

  // Resort when sortType changes
  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 w-[88vw] mx-auto border-t">
        {/* Left Sidebar (Filters) */}
        <div className="min-w-50">
          <div className="flex items-center gap-2">
            <img
              onClick={() => setShowFilter(!showFilter)}
              src={assets.dropdown_icon}
              alt="toggle filter"
              className={`h-4 ${showFilter ? "rotate-90" : ""} sm:hidden transition-all`}
            />
            <p className="my-2 text-xl flex items-center cursor-pointer gap-2">
              FILTERS
            </p>
          </div>

          {/* Category Filter */}
          <div
            className={`border border-gray-300 pl-5 py-3 mt-6 ${
              showFilter ? "" : "hidden"
            } sm:block`}
          >
            <p className="font-semibold">CATEGORIES</p>
            <div className="flex gap-3 pt-2">
              <input
                value="Men"
                type="checkbox"
                className="checkbox"
                onChange={toggleCategory}
                checked={category.includes("Men")}
              />
              <p>Men</p>
            </div>
            <div className="flex gap-3">
              <input
                value="Women"
                type="checkbox"
                className="checkbox"
                onChange={toggleCategory}
                checked={category.includes("Women")}
              />
              <p>Women</p>
            </div>
            <div className="flex gap-3">
              <input
                value="Kids"
                type="checkbox"
                className="checkbox"
                onChange={toggleCategory}
                checked={category.includes("Kids")}
              />
              <p>Kids</p>
            </div>
          </div>

          {/* Subcategory Filter */}
          <div
            className={`border border-gray-300 pl-5 py-3 mt-6 ${
              showFilter ? "" : "hidden"
            } sm:block`}
          >
            <p className="font-semibold">TYPE</p>
            <div className="flex gap-3 pt-2">
              <input
                type="checkbox"
                className="checkbox"
                value="Topwear"
                onChange={toggleSubcategory}
                checked={subcategory.includes("Topwear")}
              />
              <p>Topwear</p>
            </div>
            <div className="flex gap-3">
              <input
                type="checkbox"
                className="checkbox"
                value="Bottomwear"
                onChange={toggleSubcategory}
                checked={subcategory.includes("Bottomwear")}
              />
              <p>Bottomwear</p>
            </div>
            <div className="flex gap-3">
              <input
                type="checkbox"
                className="checkbox"
                value="Winterwear"
                onChange={toggleSubcategory}
                checked={subcategory.includes("Winterwear")}
              />
              <p>Winterwear</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border"></div>

        {/* Right Side (Products + Sorting) */}
        <div className="flex-1">
          {/* Header Section */}
          <div className="pb-7">
            <div className="p-2 flex h-10 w-full justify-between items-center">
              <div className="flex justify-between items-center gap-4 overflow-hidden">
                <p className="text-3xl">
                  {query ? `Collection for ${query}` : "ALL COLLECTIONS"}
                </p>
                <div className="bg-gray-500 w-8 h-0.5"></div>
              </div>
              <select
                onChange={(e) => setSortType(e.target.value)}
                className="border-2 border-gray-300 text-sm p-2"
              >
                <option value="relevant">Sort by: Relevant</option>
                <option value="Low-to-High">Sort by: Low to High</option>
                <option value="High-to-Low">Sort by: High to Low</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {filterproducts.length > 0 ? (
              filterproducts.map((item, index) => (
                <Product
                  key={index}
                  name={item.name}
                  id={item._id}
                  price={item.price}
                  image={item.image}
                />
              ))
            ) : (
              <p className="text-gray-500">No products found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Collection;

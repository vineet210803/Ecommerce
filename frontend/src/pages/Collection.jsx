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

  const { query } = useParams(); // <-- get query from URL

  const applyFilter = () => {
    let productsCopy = products.slice();

    // 🔥 Apply search from URL param
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

  useEffect(() => {
    applyFilter();
  }, [category, subcategory, query]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 w-[88vw] mx-auto border-t">
      {/* Sidebar filters (same as before) */}
      <div className="flex-1">
        <p className="text-3xl mb-5">
          {query ? `Results for "${query}"` : "ALL COLLECTIONS"}
        </p>
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
            <p>No products found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;

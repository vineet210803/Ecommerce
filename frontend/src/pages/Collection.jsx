import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets, products } from "../assets/assets";
import Product from "../components/Product";

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterproducts, setfilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [sortType, setSortType] = useState("relevent");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubcategory = (e) => {
    if (subcategory.includes(e.target.value)) {
      setSubcategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubcategory((prev) => [...prev, e.target.value]);
    }
  }

  const applyFilter = ()=>{
    let productsCopy = products.slice();
    if(category.length>0){
      productsCopy= productsCopy.filter(item=> category.includes(item.category));
    }
    if(subcategory.length>0){
      productsCopy= productsCopy.filter(item=> subcategory.includes(item.subCategory))
    }
    setfilterProducts(productsCopy)
  }

  // useEffect(() => {
  //   setfilterProducts(products);
  // }, []);

  const sortProduct=()=>{
    let fpCopy= filterproducts.slice();
    switch (sortType ){
      case 'low-high':
        setfilterProducts(fpCopy.sort((a,b)=>(a.price - b.price)))
        break;

      case ' high-low':
        setfilterProducts(fpCopy.sort((a,b)=>(b.price-a.price)));
        break;
        
      default:
        applyFilter();
        break;
    }
  }

  useEffect(()=>{
    applyFilter();
  },[category, subcategory]);

  return (
    <>
      <div className=" flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 w-[88vw] mx-auto border-t ">
        <div className="  min-w-50 ">
          <div className="flex items-center gap-2 ">
            <img
              onClick={() => setShowFilter(!showFilter)}
              src={assets.dropdown_icon}
              alt=""
              className={`h-4 ${
                showFilter ? "rotate-90" : ""
              } sm:hidden transition-all`}
            />
            <p className="my-2 text-xl flex items-center cursor-pointer gap-2">
              FILTERS
            </p>
          </div>
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
                value={'Topwear'}
                onChange={toggleSubcategory}
              />
              <p>Topwear</p>
            </div>
            <div className="flex gap-3">
              <input
                type="checkbox"
                className="checkbox"
                value="Bottomwear"
                onChange={toggleSubcategory}
              />
              <p>Bottomwear</p>
            </div>
            <div className="flex gap-3">
              <input
                type="checkbox"
                className="checkbox"
                value="Winterwear"
                onChange={toggleSubcategory}
              />
              <p>Winterwear</p>
            </div>
          </div>
        </div>
        <div className=" border "></div>
        <div className="">
          <div className="pb-7">
            <div className=" p-2 flex h-10 w-full justify-between items-center">
              <div className="flex justify-between items-center gap-4 overflow-hidden">
                <p className="text-3xl">ALL COLLECTIONS</p>
                <div className="bg-gray-500 w-8 h-0.5"></div>
              </div>
              <select className="border-2 border-gray-300 text-sm p-2">
                <option value="relevant" onChange={}>Sort by: Relevent</option>
                <option value="Low to High">Sort by: Low to High</option>
                <option value="High to Low">Sort by: High to Low</option>
              </select>
            </div>
          </div>
          <div className="items- grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {filterproducts.map((item, index) => (
              <Product
                key={index}
                name={item.name}
                id={item._id}
                price={item.price}
                image={item.image}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Collection;

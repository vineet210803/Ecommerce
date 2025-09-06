import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation, useNavigate } from "react-router-dom";

const Searchbar = () => {
  const { search, setSearch, showsearch, setshowsearch } = useContext(ShopContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Show search bar only on collection page
  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setshowsearch(true);
    } else {
      setshowsearch(false);
    }
  }, [location.pathname, setshowsearch]);

  // Handle search (navigate to query page)
  const handleSearch = () => {
    if (search.trim() !== "") {
      navigate(`/collection/${search.trim()}`);
    } else {
      navigate(`/collection`);
    }
  };

  // Trigger search on Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Close search bar
  const handleClose = () => {
    setshowsearch(false);
    setSearch(""); // clear text when closing
  };

  return showsearch ? (
    <div className="bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 outline-none bg-inherit text-sm"
          type="text"
          placeholder="Search"
        />
        <img
          className="w-4 cursor-pointer"
          src={assets.search_icon}
          alt="search"
          onClick={handleSearch}
        />
      </div>
      <img
        onClick={handleClose}
        src={assets.cross_icon}
        className="inline w-3 cursor-pointer ml-2"
        alt="close"
      />
    </div>
  ) : null;
};

export default Searchbar;

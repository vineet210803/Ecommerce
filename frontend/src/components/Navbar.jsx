import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false); // Mobile menu
  const [profileMenuOpen, setProfileMenuOpen] = useState(false); // Profile menu toggle
  const {
    showsearch,
    setshowsearch,
    getCartCount,
    token,
    setToken,
    navigate,
    setCartItems,
  } = useContext(ShopContext);

  const handleLogout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    setProfileMenuOpen(false);
  };

  const toggleProfileMenu = () => setProfileMenuOpen((prev) => !prev);

  return (
    <div className="flex items-center justify-between py-5 font-medium px-15 relative">
      {/* Logo */}
      <div>
        <img src={assets.logo} className="w-36" alt="Logo" />
      </div>

      {/* Desktop Menu */}
      <ul className="hidden sm:flex gap-7 text-sm text-gray-700">
        {["/", "/collection", "/about", "/contact"].map((path, i) => {
          const labels = ["Home", "Collection", "About", "Contact"];
          return (
            <NavLink
              key={i}
              to={path}
              className="flex flex-col items-center gap-1"
            >
              {({ isActive }) => (
                <>
                  <p>{labels[i]}</p>
                  {isActive && (
                    <hr className="w-10 border-none h-[1.5px] bg-[#c586a5] rounded-xl" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </ul>

      {/* Icons */}
      <div className="flex items-center gap-6">
        {/* Search Icon */}
        <img
          onClick={() => setshowsearch(!showsearch)}
          src={assets.search_icon}
          className="w-4 cursor-pointer"
          alt="Search"
        />

        {/* Profile Icon */}
        <div className="relative">
          <img
            src={assets.profile_icon}
            className="w-4 cursor-pointer"
            alt="Profile"
            onClick={toggleProfileMenu}
          />

          {profileMenuOpen && (
            <div className="absolute right-0 mt-2 w-40 py-3 px-5 bg-slate-200 text-gray-600 rounded shadow-lg z-50">
              {token ? (
                <div className="flex flex-col gap-2">
                  <p
                    onClick={() => {
                      navigate("/profile");
                      setProfileMenuOpen(false);
                    }}
                    className="cursor-pointer hover:text-[#c586a5]"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => {
                      navigate("/orders");
                      setProfileMenuOpen(false);
                    }}
                    className="cursor-pointer hover:text-[#c586a5]"
                  >
                    Orders
                  </p>
                  <p
                    onClick={handleLogout}
                    className="cursor-pointer hover:text-[#c586a5]"
                  >
                    Logout
                  </p>
                </div>
              ) : (
                <p
                  onClick={() => {
                    navigate("/login");
                    setProfileMenuOpen(false);
                  }}
                  className="cursor-pointer hover:text-[#c586a5]"
                >
                  Login
                </p>
              )}
            </div>
          )}
        </div>

        {/* Cart */}
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-4 min-w-4" alt="Cart" />
          <p className="absolute right-[-6px] bottom-[-6px] w-4 text-center bg-[#c586a5] rounded-full leading-4 aspect-square text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="Menu"
        />
      </div>

      {/* Mobile Side Menu */}
      <div
        className={`absolute top-0 right-0 overflow-hidden bg-white transition-all ${
          visible ? "w-[60vw]" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img
              src={assets.dropdown_icon}
              className="h-4 rotate-180"
              alt="Back"
            />
            <p>Back</p>
          </div>
          <NavLink className="py-2 pl-6" to="/">
            Home
          </NavLink>
          <NavLink className="py-2 pl-6" to="/about">
            About
          </NavLink>
          <NavLink className="py-2 pl-6" to="/contact">
            Contact
          </NavLink>
          <NavLink className="py-2 pl-6" to="/collection">
            Collection
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

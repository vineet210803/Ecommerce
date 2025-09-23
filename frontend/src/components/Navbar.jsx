import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { Link, Navigate, NavLink } from "react-router-dom";
import { useState } from "react";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
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
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium px-15">
      {/* Logo */}
      <div>
        <img src={assets.logo} className="w-36" alt="" />
      </div>

      <ul className="hidden sm:flex gap-7 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          {({ isActive }) => (
            <>
              <p>Home</p>
              {isActive && (
                <hr className="w-10 border-none h-[1.5px] bg-[#c586a5] rounded-xl" />
              )}
            </>
          )}
        </NavLink>

        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          {({ isActive }) => (
            <>
              <p>Collection</p>
              {isActive && (
                <hr className="w-10 border-none h-[1.5px] bg-[#c586a5] rounded-xl" />
              )}
            </>
          )}
        </NavLink>

        <NavLink to="/about" className="flex flex-col items-center gap-1">
          {({ isActive }) => (
            <>
              <p>About</p>
              {isActive && (
                <hr className="w-10 border-none h-[1.5px] bg-[#c586a5] rounded-xl" />
              )}
            </>
          )}
        </NavLink>

        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          {({ isActive }) => (
            <>
              <p>Contact</p>
              {isActive && (
                <hr className="w-10 border-none h-[1.5px] bg-[#c586a5] rounded-xl" />
              )}
            </>
          )}
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        <img
          onClick={() => setshowsearch(!showsearch)}
          src={assets.search_icon}
          className="w-4 cursor-pointer"
          alt=""
        />

        <div className="group relative">
          <img
            src={assets.profile_icon}
            className="w-4 cursor-pointer"
            alt=""
          />
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 ">
            <div className="flex flex-col gap-2 w-30 py-3 px-5 bg-slate-200 text-gray-600 rounded ">
              <p className="cursor-pointer hover:text-[#c586a5]">My Profile</p>
              <p className="cursor-pointer hover:text-[#c586a5]">Orders</p>
              {token ? (
                <p
                  onClick={handleLogout}
                  className="cursor-pointer hover:text-[#c586a5]"
                >
                  Logout
                </p>
              ) : (
                <Link to="/login">
                  <p className="cursor-pointer hover:text-[#c586a5]">Login</p>
                </Link>
              )}
            </div>
          </div>
        </div>
        <Link to="/cart" className=" relative ">
          <img src={assets.cart_icon} className="w-4 min-w-4" alt="" />
          <p className="absolute right-[-6px] bottom-[-6px] w-4 text-center bg-[#c586a5] rounded-full leading-4 aspect-square text-[8px]">
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt=""
        />
      </div>
      <div
        className={`absolute top-0 right-0 overflow-hidden bg-white transition-all ${
          visible ? "w-[60vw]" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600 ">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3"
          >
            <img
              src={assets.dropdown_icon}
              className="h-4 rotate-180 cousor-pointer"
              alt=""
            />
            <p>Back</p>
          </div>
          <NavLink className="py-2 pl-6 " to="/">
            Home
          </NavLink>
          <NavLink className="py-2 pl-6 " to="/about">
            About
          </NavLink>
          <NavLink className="py-2 pl-6 " to="/contact">
            Contact
          </NavLink>
          <NavLink className="py-2 pl-6 " to="/collection">
            Collection
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

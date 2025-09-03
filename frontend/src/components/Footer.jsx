import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <>
      <div className="flex flex-col gap-14 sm:grid grid-cols-[3fr_1fr_1fr] my-10 mt-30 text-sm pl-2 md:pl-30">
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="" />
          <p className=" w-full md:w-2/3 text-gray-600 ">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae ducimus deleniti magnam, non architecto nam maiores odio fugiat maxime! Culpa asperiores amet et ab voluptates aliquid hic cumque, ratione nobis accusamus non perferendis officia!
          </p>
        </div>
        <div>
            <p className="text-xl font-medium mb-5">COMPANY</p>
            <ul className="flex flex-col text-gray-600">
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div >
            <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
            <ul className="flex flex-col text-gray-600">
                <li>+91 9876XXXXXX</li>
                <li>contact@forever.com</li>
            </ul>
        </div>
      </div>
        <div>
            <hr className="w-3/4 mx-auto" />
            <p className="text-center mb-15">Copyright 2025@ forever.com - All Rights Reserved</p>
        </div>
    </>
  );
};

export default Footer;

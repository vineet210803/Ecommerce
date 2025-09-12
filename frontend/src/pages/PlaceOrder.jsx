import React, { useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";

const PlaceOrder = () => {

  const [method , setmethod] = useState('cod');

  return (
    <div className="flex flex-col sm:flex-row justify-between pt-5 px-6 sm:pt-14 min-h-[80vh] border-t gap-y-3 ">
      {/* left side */}
      <div className="flex flex-col w-full max-w-[480px] gap-y-5">
        <div className="text-xl my-3 sm:text-2xl">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            className=" border border-gray-300 py-1.5 px-3.5 w-full "
            type="text"
            placeholder="First Name"
          />
          <input
            className=" border border-gray-300 py-1.5 px-3.5 w-full "
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          className=" border border-gray-300 py-1.5 px-3.5 w-full "
          type="email"
          placeholder="Email Address"
        />
        <input
          className=" border border-gray-300 py-1.5 px-3.5 w-full "
          type="text"
          placeholder="Street/Area/Location"
        />
        <div className="flex gap-3">
          <input
            className=" border border-gray-300 py-1.5 px-3.5 w-full "
            type="text"
            placeholder="City"
          />
          <input
            className=" border border-gray-300 py-1.5 px-3.5 w-full "
            type="number"
            placeholder="Pincode"
          />
        </div>
        <div className="flex gap-3">
          <input
            className=" border border-gray-300 py-1.5 px-3.5 w-full "
            type="text"
            placeholder="S tate"
          />
          <input
            className=" border border-gray-300 py-1.5 px-3.5 w-full "
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          className=" border border-gray-300 py-1.5 px-3.5 w-full "
          type="number"
          placeholder="Phone Number"
        />
      </div>

      {/* right side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={'PAYMENT'} text2={'METHOD'}/>
          {/* text payment method */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div  onClick={()=>setmethod('stripe')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full  ${method === 'stripe' ? 'bg-green-700': ''}`}></p>
              <img className="h-5 mx-4 " src={assets.stripe_logo} alt="" />
            </div>
            <div onClick={()=>setmethod('razorpay')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-700': ''}`}></p>
              <img className="h-5 mx-4 " src={assets.razorpay_logo} alt="" />
            </div>
            <div onClick={()=>setmethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-700': ''}`}></p>
              <p >Cash On delivery</p>
            </div>
          </div>
          <div className="w-full text-end mt-8 ">
            <button className=" bg-black text-white p-2 px-4 cursor-pointer">PLACE ORDER</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PlaceOrder;

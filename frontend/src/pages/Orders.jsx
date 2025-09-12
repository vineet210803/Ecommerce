import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const Orders = () => {
  const { products, currency } = useContext(ShopContext);

  return (
    <div className="border-t pt-16 px-4 sm:px-10 lg:px-20 bg-gray-50 min-h-screen">
      {/* Page Title */}
      <div className="text-3xl font-semibold text-center mb-10">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div className="space-y-6">
        {products.slice(1, 4).map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md hover:shadow-lg transition  p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          >
            {/* Left Section: Image + Details */}
            <div className="flex items-start gap-6 text-sm">
              <img
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover  border"
                src={item.image[0]}
                alt={item.name}
              />
              <div>
                <p className="sm:text-lg font-semibold text-gray-800">
                  {item.name}
                </p>

                <div className="flex flex-wrap items-center gap-4 mt-2 text-gray-500 text-sm sm:text-base">
                  <p className="text-gray-800 font-medium text-lg">
                    {currency}
                    {item.price}
                  </p>
                  <p className="bg-gray-100 px-3 py-1 rounded-full text-xs sm:text-sm">
                    Quantity: 1
                  </p>
                  <p className="bg-gray-100 px-3 py-1 rounded-full text-xs sm:text-sm">
                    Size: M
                  </p>
                </div>

                <p className="mt-2 text-sm sm:text-base">
                  Date:{" "}
                  <span className="text-gray-500">25, July 2025</span>
                </p>
              </div>
            </div>

            {/* Right Section: Status + Track Button */}
            <div className="md:w-1/3 flex items-center justify-between md:justify-end gap-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-600"></span>
                <p className="text-sm sm:text-base font-medium text-green-700">
                  Ready To Ship
                </p>
              </div>
              <button className="border border-gray-300 bg-gray-100 hover:bg-gray-200 transition px-5 py-2 text-sm font-medium  shadow-sm">
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;

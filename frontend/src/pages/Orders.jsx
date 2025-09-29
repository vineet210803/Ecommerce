import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);


  // console.log(`token is:  ${token}`)

  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        // console.log("No token")
        return null;
      }
      const response = await axios.post(
        backendUrl+"/api/order/userorder",
        {},
        { headers: { token } }
      );
      // console.log(response.data);
      if(response.data.success){
        let allOrdersItem  = []
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status']=order.status
            item['payment']=order.payment
            item['paymentMethod']=order.paymentMethod
            item['date']=order.date
            allOrdersItem.push(item)
          })
        })
        setOrderData(allOrdersItem.reverse())
      }
    } catch (error) {}
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16 px-4 sm:px-10 lg:px-20 bg-gray-50 min-h-screen">
      {/* Page Title */}
      <div className="text-3xl font-semibold text-center mb-10">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div className="space-y-6">
        {orderData.map((item, index) => (
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
                    Quantity: {item.quantity}
                  </p>
                  <p className="bg-gray-100 px-3 py-1 rounded-full text-xs sm:text-sm">
                    Size: {item.size}
                  </p>
                </div>

                <p className="mt-2 text-sm sm:text-base">
                  Date: <span className="text-gray-500">{new Date(item.date).toDateString()}</span>
                </p>
                <p className="mt-2 text-sm sm:text-base">
                  Payment: <span className="text-gray-500">{item.paymentMethod}</span>
                </p>
              </div>
            </div>

            {/* Right Section: Status + Track Button */}
            <div className="md:w-1/3 flex items-center justify-between md:justify-end gap-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-600"></span>
                <p className="text-sm sm:text-base font-medium text-green-700">
                  {item.status}
                </p>
              </div>
              <button onClick={loadOrderData} className="border border-gray-300 bg-gray-100 hover:bg-gray-200 transition px-5 py-2 text-sm font-medium  shadow-sm">
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

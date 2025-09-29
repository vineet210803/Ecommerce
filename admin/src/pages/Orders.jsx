import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      console.log("NO token");
      return null;
    }
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId)=>{
    try {
      const response = await axios.post(backendUrl+'/api/order/updatestatus', {orderId, status: event.target.value}, {headers:{token}})

      if(response.data.success){
        toast.success(response.data.message)
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">Orders</h3>

      <div className="grid gap-6">
        {orders.map((order, index) => (
          <div
            key={index}
            className="bg-white p-6 flex flex-col md:flex-row justify-between gap-6 hover:shadow-md hover:bg-pink-50 transition-all"
          >
            {/* Left Section */}
            <div className="flex gap-4">
              <img
                src={assets.parcel_icon}
                alt=""
                className="w-14 h-14 object-contain"
              />

              <div className="flex flex-col gap-2">
                {/* Items */}
                <div className="text-gray-700 text-sm">
                  {order.items.map((item, idx) => (
                    <span key={idx}>
                      {item.name} x {item.quantity}
                      <span className="ml-1 text-gray-500">({item.size})</span>
                      {idx !== order.items.length - 1 && <span>, <br /> </span>}
                    </span>
                  ))}
                </div>

                {/* Address */}
                <div className="text-gray-600 text-sm">
                  <p className="font-medium">
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <p>{order.address.street}</p>
                  <p>
                    {order.address.city}, {order.address.state},{" "}
                    {order.address.country} - {order.address.pincode}
                  </p>
                  <p className="text-gray-500">📞 {order.address.phone}</p>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex flex-col justify-between text-sm text-gray-700">
              <div className="flex flex-col gap-1">
                <p>
                  <span className="font-medium">Items:</span>{" "}
                  {order.items.length}
                </p>
                <p>
                  <span className="font-medium">Payment Method:</span>{" "}
                  {order.paymentMethod}
                </p>
                <p>
                  <span className="font-medium">Payment:</span>{" "}
                  <span
                    className={`${
                      order.payment ? "text-green-600" : "text-red-500"
                    } font-semibold`}
                  >
                    {order.payment ? "Done" : "Pending"}
                  </span>
                </p>
                <p>
                  <span className="font-medium">Date:</span>{" "}
                  {new Date(order.date).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center justify-between mt-4 gap-6">
                <p className="text-lg font-bold text-gray-900">
                  {currency}
                  {order.amount}
                </p>
                <select
                onChange={(event)=>statusHandler(event, order._id)}
                  value={order.status}
                  className="border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <p className="text-center text-gray-500 text-sm">
            No orders found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Orders;

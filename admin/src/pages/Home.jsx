import React from "react";
import { Package, ShoppingCart, Users, DollarSign, Settings } from "lucide-react";

const Home = () => {
  return (
    <div className="p-6 bg-white min-h-screen text-black">
      {/* Welcome Banner */}
      <div className="bg-gray-700 text-white p-6 mb-8 shadow">
        <h1 className="text-2xl font-bold">Welcome Back, Admin!</h1>
        <p className="text-sm mt-1">Here's your dashboard overview.</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex items-center gap-4">
          <ShoppingCart className="text-[#c586a5] w-7 h-7" />
          <div>
            <p className="text-gray-500 text-sm">Orders</p>
            <h2 className="text-lg font-semibold">1,245</h2>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex items-center gap-4">
          <Users className="text-[#c586a5] w-7 h-7" />
          <div>
            <p className="text-gray-500 text-sm">Users</p>
            <h2 className="text-lg font-semibold">4,320</h2>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex items-center gap-4">
          <DollarSign className="text-[#c586a5] w-7 h-7" />
          <div>
            <p className="text-gray-500 text-sm">Revenue</p>
            <h2 className="text-lg font-semibold">$23,500</h2>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex items-center gap-4">
          <Package className="text-[#c586a5] w-7 h-7" />
          <div>
            <p className="text-gray-500 text-sm">Products</p>
            <h2 className="text-lg font-semibold">320</h2>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button className="bg-[#c586a5] text-white py-3 px-5 rounded-lg shadow hover:bg-black transition">
            ➕ Add Product
          </button>
          <button className="bg-[#c586a5] text-white py-3 px-5 rounded-lg shadow hover:bg-black transition">
            📦 Manage Orders
          </button>
          <button className="bg-[#c586a5] text-white py-3 px-5 rounded-lg shadow hover:bg-black transition">
            👥 Manage Users
          </button>
          <button className="bg-[#c586a5] text-white py-3 px-5 rounded-lg shadow hover:bg-black transition">
            📊 Reports
          </button>
          <button className="bg-gray-700 text-white py-3 px-5 shadow flex items-center justify-center gap-2 hover:bg-[#c586a5] transition">
            <Settings className="w-5 h-5" /> Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

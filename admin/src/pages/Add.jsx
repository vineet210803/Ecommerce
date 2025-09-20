import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );
      console.log(response);

      if (response.data.success) {
        toast.success(response.data.message)
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice(false);
        setSizes([]);
      } 
      else {
        // console.log("something went wrong")
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-10 space-y-6"
    >
      {/* Card Container */}
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-3xl space-y-6">
        {/* Upload Section */}
        <p className="text-gray-800 font-semibold text-lg">Upload Image</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Image Upload Boxes */}
          <label
            htmlFor="image1"
            className="flex flex-col items-center justify-center border-2 border-dashed border-[#c586a5] rounded-xl p-6 cursor-pointer hover:bg-[#c586a5]/10 transition"
          >
            <img
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt="Upload"
              className="w-16 h-16 object-contain opacity-80"
            />
            <p className="text-gray-400 text-sm mt-2">Click to Upload</p>
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>

          <label
            htmlFor="image2"
            className="flex flex-col items-center justify-center border-2 border-dashed border-[#c586a5] rounded-xl p-6 cursor-pointer hover:bg-[#c586a5]/10 transition"
          >
            <img
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt="Upload"
              className="w-16 h-16 object-contain opacity-80"
            />
            <p className="text-gray-400 text-sm mt-2">Click to Upload</p>
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>

          <label
            htmlFor="image3"
            className="flex flex-col items-center justify-center border-2 border-dashed border-[#c586a5] rounded-xl p-6 cursor-pointer hover:bg-[#c586a5]/10 transition"
          >
            <img
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt="Upload"
              className="w-16 h-16 object-contain opacity-80"
            />
            <p className="text-gray-400 text-sm mt-2">Click to Upload</p>
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>

          <label
            htmlFor="image4"
            className="flex flex-col items-center justify-center border-2 border-dashed border-[#c586a5] rounded-xl p-6 cursor-pointer hover:bg-[#c586a5]/10 transition"
          >
            <img
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt="Upload"
              className="w-16 h-16 object-contain opacity-80"
            />
            <p className="text-gray-400 text-sm mt-2">Click to Upload</p>
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>

        {/* Product Name */}
        <div>
          <p className="text-gray-700 font-medium mb-1">Product Name</p>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Type here"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#c586a5] outline-none"
          />
        </div>

        {/* Product Description */}
        <div>
          <p className="text-gray-700 font-medium mb-1">Product Description</p>
          <input
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            type="text"
            placeholder="Write Content here"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#c586a5] outline-none"
          />
        </div>

        {/* Category */}
        <div>
          <p className="text-gray-700 font-medium mb-1">Product Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-[#c586a5] outline-none"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kid">Kid</option>
          </select>
        </div>

        {/* Sub Category */}
        <div>
          <p className="text-gray-700 font-medium mb-1">Sub Category</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-[#c586a5] outline-none"
          >
            <option value="Topwear">TopWear</option>
            <option value="Bottomwear">BottomWear</option>
            <option value="Winterwear">WinterWear</option>
          </select>
        </div>

        {/* Product Price */}
        <div>
          <p className="text-gray-700 font-medium mb-1">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="number"
            placeholder="Enter the Price"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#c586a5] outline-none"
          />
        </div>

        {/* Product Sizes */}
        <div className="bg-white p-6 mt-6 rounded-2xl shadow w-full max-w-3xl">
          <p className="text-gray-700 font-medium mb-3">Product Sizes</p>
          <div className="flex flex-wrap gap-3">
            <div
              onClick={(e) =>
                setSizes((prev) =>
                  prev.includes("S")
                    ? prev.filter((item) => item !== "S")
                    : [...prev, "S"]
                )
              }
              className={`px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-[#c586a5]/10 ${
                sizes.includes("S") ? "bg-pink-100" : "bg-slate-400"
              }`}
            >
              <p>S</p>
            </div>
            <div
              onClick={(e) =>
                setSizes((prev) =>
                  prev.includes("M")
                    ? prev.filter((item) => item !== "M")
                    : [...prev, "M"]
                )
              }
              className={`px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-[#c586a5]/10 ${
                sizes.includes("M") ? "bg-pink-100" : "bg-slate-400"
              }`}
            >
              <p>M</p>
            </div>
            <div
              onClick={(e) =>
                setSizes((prev) =>
                  prev.includes("L")
                    ? prev.filter((item) => item !== "L")
                    : [...prev, "L"]
                )
              }
              className={`px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-[#c586a5]/10 ${
                sizes.includes("L") ? "bg-pink-100" : "bg-slate-400"
              }`}
            >
              <p>L</p>
            </div>
            <div
              onClick={(e) =>
                setSizes((prev) =>
                  prev.includes("XL")
                    ? prev.filter((item) => item !== "XL")
                    : [...prev, "XL"]
                )
              }
              className={`px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-[#c586a5]/10 ${
                sizes.includes("XL") ? "bg-pink-100" : "bg-slate-400"
              }`}
            >
              <p>XL</p>
            </div>
            <div
              onClick={(e) =>
                setSizes((prev) =>
                  prev.includes("XXL")
                    ? prev.filter((item) => item !== "XXL")
                    : [...prev, "XXL"]
                )
              }
              className={`px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-[#c586a5]/10 ${
                sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-400"
              }`}
            >
              <p>XXL</p>
            </div>
          </div>
        </div>

        {/* Bestseller Checkbox */}
        <div className="p-6 mt-6 w-full max-w-3xl flex items-center gap-3">
          <input
            onChange={() => setBestSeller(!bestseller)}
            checked={bestseller}
            type="checkbox"
            id="bestseller"
            className="w-5 h-5 text-[#c586a5] border-gray-300 rounded focus:ring-[#c586a5]"
          />
          <label htmlFor="bestseller" className="text-gray-700 font-medium">
            Add to bestseller
          </label>
        </div>
        {/* Submit Button */}
        <div className="pt-4 text-center">
          <button
            type="submit"
            className="bg-black text-white px-8 py-2  font-semibold hover:bg-gray-900 transition"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};

export default Add;

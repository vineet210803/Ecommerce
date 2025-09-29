import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const List = ({token}) => {

  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      // console.log(response)
      if (response.data.success) {
        setList(response.data.products)
      }
      else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

const removeProduct = async (id) => {
  try {
    const response = await axios.post(
      backendUrl + '/api/product/remove',
      { id },   // body only needs id
      {
        headers: {
          token: token, 
        },
      }
    );

    // console.log(response);

    if (response.data.success) {
      toast.success(response.data.message);
      fetchList();
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};




  useEffect(() => {
    fetchList();
  }, [])

  return (
    <>
      <p className="mb-4 text-lg font-semibold text-gray-800">All Products List</p>

      <div className="flex flex-col gap-2">
        {/* list table title */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-3 border bg-gray-100 text-sm font-medium text-gray-700">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* -----product list---- */}
        {
          list.map((item, index) => (
            <div 
              key={index} 
              className="grid grid-cols-2 md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 md:gap-4 py-2 px-3 border hover:shadow-md transition"
            >
              <img 
                src={item.image[0]} 
                alt={item.name} 
                className="w-14 h-14 object-cover " 
              />
              <p className="font-medium text-gray-800">{item.name}</p>
              <p className="text-gray-600">{item.category}</p>
              <p className="text-gray-900 font-semibold">{currency}{item.price}</p>
              <button onClick={()=>removeProduct(item._id)} className="text-red-500 font-bold text-center hover:text-red-700">X</button>
            </div>
          ))
        } 
      </div>
    </>
  )
}

export default List

import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({setToken}) => {
    const [email, setEmail]= useState('');
    const [password, setPassword] =useState('');

    

    const onSubmitHandler = async (e)=>{
        try {
            e.preventDefault();
            // console.log(email, password)
            const response = await axios.post(backendUrl+'/api/user/admin', {email,password})
            // console.log(response)

            if(response.data.success){
                setToken(response.data.token)
                toast.success("Welcome Admin!")
                
            }else{
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Admin Panel
        </h1>
        <form onSubmit={onSubmitHandler} className="space-y-6">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Email Address</p>
            <input  onChange={(e)=>setEmail(e.target.value)}
              type="email"
              placeholder="your@email.com"
              required
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black border-gray-300"
            />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Password</p>
            <input onChange={(e)=>setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black border-gray-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-2  shadow-md hover:bg-gray-900 transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-gray-500 text-sm">
          © 2025 Admin Panel. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;

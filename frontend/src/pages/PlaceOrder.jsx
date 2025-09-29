import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";
// import razorpay from "razorpay";

const PlaceOrder = () => {
  const [method, setmethod] = useState("cod");
  // const {navigate} = useContext(ShopContext)
  const {
    products,
    delivery_fee,
    cartItems,
    setCartItems,
    getCartAmount,
    navigate,
    backendUrl,
    token,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.Vite_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        // console.log(response);
        try {
          const {data} = await axios.post(backendUrl+'/api/order/verifyrazorpay', response, {headers:{token}})
          if(data.success){
            navigate('/orders')
            setCartItems({});
          }
        } catch (error) {
          // console.log(error)
          toast.error(error)
        }
      },
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      // console.log(orderItems);

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      // console.log("Selected method:", method);

      switch (method) {
        // api calls for cod
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/placeorder",
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
            toast.error("error");
          }
          break;

        case "stripe":
          const responseStripe = await axios.post(
            backendUrl + "/api/order/placestripe",
            orderData,
            { headers: { token } }
          );

          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break; 

        case "razorpay":
          const responseRazorpay = await axios.post(
            backendUrl + "/api/order/placerazorpay",
            orderData,
            { headers: { token } }
          );

          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order);
          }

          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      // toast.error("error")
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between pt-5 px-6 sm:pt-14 min-h-[80vh] border-t gap-y-3 "
    >
      {/* left side */}
      <div className="flex flex-col w-full max-w-[480px] gap-y-5">
        <div className="text-xl my-3 sm:text-2xl">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            className=" border border-gray-300 py-1.5 px-3.5 w-full "
            type="text"
            placeholder="First Name"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            className=" border border-gray-300 py-1.5 px-3.5 w-full "
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          className=" border border-gray-300 py-1.5 px-3.5 w-full "
          type="email"
          placeholder="Email Address"
        />
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          className=" border border-gray-300 py-1.5 px-3.5 w-full "
          type="text"
          placeholder="Street/Area/Location"
        />
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            className=" border border-gray-300 py-1.5 px-3.5 w-full "
            type="text"
            placeholder="City"
          />
          <input
            required
            onChange={onChangeHandler}
            name="pincode"
            value={formData.pincode}
            className=" border border-gray-300 py-1.5 px-3.5 w-full "
            type="number"
            placeholder="Pincode"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            className=" border border-gray-300 py-1.5 px-3.5 w-full "
            type="text"
            placeholder="State"
          />
          <input
            required
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            className=" border border-gray-300 py-1.5 px-3.5 w-full "
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
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
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/* text payment method */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setmethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full  ${
                  method === "stripe" ? "bg-green-700" : ""
                }`}
              ></p>
              <img className="h-5 mx-4 " src={assets.stripe_logo} alt="" />
            </div>
            <div 
              onClick={() => setmethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-green-700" : ""
                }`}
              ></p>
              <img className="h-5 mx-4 " src={assets.razorpay_logo} alt="" />
            </div>
            <div
              onClick={() => setmethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-700" : ""
                }`}
              ></p>
              <p>Cash On delivery</p>
            </div>
          </div>
          <div className="w-full text-end mt-8 ">
            <button
              type="Submit"
              className=" bg-black text-white p-2 px-4 cursor-pointer"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;

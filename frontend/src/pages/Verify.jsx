import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Verify = () => {
  const { token, setCartItems, backendUrl } = useContext(ShopContext);
//   console.log(token)
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); // ✅ use react-router hook

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    try {
      if (!token) {
        // console.log("not authorised");
        return;
      }

      const response = await axios.post(
        backendUrl + "/api/order/verifyStripe",
        { success, orderId },
        { headers: { token } }
      );

    //   console.log(response.data);

      if (response.data.success) {
        setCartItems({});
        toast.success("Payment Done!");
        navigate("/orders");
      } else {
        toast.error("Order not placed, Try again!!");
        navigate("/cart");
      }
    } catch (error) {
      console.log(error);
      toast.error("error");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);

  return <div>verify</div>;
};

export default Verify;

"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "@/utils/cartslice";
import OrderSummary from "@/app/_components/checkout/orderSummary";
import ShippingAddress from "@/app/_components/checkout/shippingAdress";
import AdditionalInstructions from "@/app/_components/checkout/additionalInstuctions";
import ExpectedTime from "@/app/_components/checkout/expectedTime";
import { getCheckoutInfo } from "@/requests/checkout";

const Checkout = () => {
  const dispatch = useDispatch();

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    phone: "",
    address: "",
    residential: "",

  });

  const [instructions, setInstructions] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleCheckout = () => {
    if (!shippingInfo.name || !shippingInfo.phone || !shippingInfo.address) {
      alert("Please fill in all required fields.");
      return;
    }

    console.log("Processing Payment...");
    dispatch(clearCart());
  };

  return (
    <div className="min-h-screen  dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className=" mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
        <OrderSummary />
        <div className="flex flex-col sm:flex-row justify-between gap-6">
  <div className="w-full sm:w-1/2">
    <ShippingAddress shippingInfo={shippingInfo} handleChange={handleChange} />
  </div>
  
  <div className="w-full sm:w-1/2 flex">
    <AdditionalInstructions />
  </div>
</div>

       
        <ExpectedTime />

        {/* Checkout Button */}
        <button
          onClick={handleCheckout}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-medium mt-4"
        >
          Pay with Pi Network
        </button>
      </div>
    </div>
  );
};

export default Checkout;

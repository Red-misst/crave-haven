"useClient"
import React from "react";
import { useSelector } from "react-redux";
import { selectItems } from "@/utils/cartslice";

const OrderSummary = () => {
  const cartItems = useSelector(selectItems);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="border-b pb-4">
      <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
      {cartItems.length > 0 ? (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.slug} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.quantity} × {item.price.toLocaleString("en-KE", { style: "currency", currency: "KES" })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <p className="text-right font-semibold">
            Total: {totalPrice.toLocaleString("en-KE", { style: "currency", currency: "KES" })}
          </p>
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400">Your cart is empty.</p>
      )}
    </div>
  );
};

export default OrderSummary;


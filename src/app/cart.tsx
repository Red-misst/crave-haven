"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectItems, removeItem, incrementItem, decrementItem, clearCart } from "@/utils/cartslice";
import { useRouter } from "next/router";

const CartPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useSelector(selectItems); // Get cart items from Redux store

  // Handle remove item from cart
  const handleRemoveItem = (slug: string) => {
    dispatch(removeItem(slug)); // Dispatch action to remove item
  };

  // Handle increment item quantity
  const handleIncrementItem = (slug: string) => {
    dispatch(incrementItem(slug)); // Dispatch action to increment item quantity
  };

  // Handle decrement item quantity
  const handleDecrementItem = (slug: string) => {
    dispatch(decrementItem(slug)); // Dispatch action to decrement item quantity
  };

  // Handle checkout action (redirect to checkout page)
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    router.push("/checkout"); // Navigate to the checkout page
  };

  // Calculate the total price of all cart items
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>
      <div className="bg-white shadow-md rounded-md p-4">
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div key={item.slug} className="flex items-center justify-between py-4 border-b">
                <div className="flex items-center">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                  <div className="ml-4">
                    <h2 className="font-medium">{item.name}</h2>
                    <p className="text-sm text-gray-500">{item.name}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <p className="mr-4 text-lg font-semibold">${item.price}</p>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleDecrementItem(item.slug)}
                      className="px-2 py-1 bg-gray-200 text-sm rounded-md"
                    >
                      -
                    </button>
                    <span className="text-sm">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrementItem(item.slug)}
                      className="px-2 py-1 bg-gray-200 text-sm rounded-md"
                    >
                      +
                    </button>
                  </div>
                  <p className="ml-4 text-lg font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    onClick={() => handleRemoveItem(item.slug)}
                    className="text-red-500 hover:text-red-700 ml-4"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-between py-4">
              <p className="font-semibold">Total:</p>
              <p className="text-lg font-semibold">${calculateTotal().toFixed(2)}</p>
            </div>
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleCheckout}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;

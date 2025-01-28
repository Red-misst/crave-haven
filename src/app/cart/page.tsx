"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectItems, removeItem, incrementItem, decrementItem } from "@/utils/cartslice";
import { useRouter } from "next/navigation";
import { FiTrash } from "react-icons/fi"; // Import the delete icon from React Icons

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
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 py-6">
      <div className="">
        <h1 className="flex text-3xl font-semibold mb-6 text-gray-900 dark:text-white justify-center">Your Cart</h1>
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-md">
          {cartItems.length === 0 ? (
            <p className="text-center text-lg text-gray-600 dark:text-gray-300">Your cart is empty</p>
          ) : (
            <div>
              {cartItems.map((item) => (
                <div
                  key={item.slug}
                  className="flex  justify-between py-6 border-b dark:border-gray-700 flex-col sm:flex-row px-4"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md shadow-md"
                    />
                    <div>
                      <h2 className="font-medium text-lg text-gray-900 dark:text-white">{item.name}</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{item.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleDecrementItem(item.slug)}
                        className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-sm rounded-lg text-gray-900 dark:text-white transition hover:bg-gray-300 dark:hover:bg-gray-600"
                      >
                        -
                      </button>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{item.quantity}</span>
                      <button
                        onClick={() => handleIncrementItem(item.slug)}
                        className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-sm rounded-lg text-gray-900 dark:text-white transition hover:bg-gray-300 dark:hover:bg-gray-600"
                      >
                        +
                      </button>
                    </div>
                    <p className="ml-4 text-lg font-semibold text-gray-900 dark:text-white">
                      KES {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
              <div className="flex justify-between py-4 sm:py-6  px-4">
                <p className="font-semibold text-lg text-gray-900 dark:text-white">Total:</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  KES {calculateTotal().toLocaleString()}
                </p>
              </div>
              <div className="mt-6 flex justify-center pb-10">
                <button
                  onClick={handleCheckout}
                  className="px-8 py-3 bg-orange-600 text-white rounded-lg shadow-md hover:bg-orange-700 transition duration-300 ease-in-out focus:outline-none dark:bg-orange-700 dark:hover:bg-orange-600"
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;

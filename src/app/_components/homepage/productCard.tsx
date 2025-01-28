"use client";

import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/utils/store/store";
import {
  addItem,
  incrementItem,
  decrementItem,
} from "@/utils/cartslice";
import { FaShoppingCart, FaBan, FaRegThumbsUp, FaHeart, FaPlus, FaMinus } from "react-icons/fa";

// Utility to format currency using JavaScript's built-in method
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

interface ProductProps {
  name: string;
  price: number;
  image: string;
  inStock: boolean;
  slug: string;
}

function Product({
  name,
  price,
  image,
  inStock,
  slug,

}: ProductProps) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const cartItem = cartItems.find((item) => item.slug === slug);

  const handleAddToCart = () => {
    dispatch(
      addItem({
        slug,
        name,
        price,
        quantity: 1,
        image,
       
      })
    );
  };

  const handleIncrement = () => {
    dispatch(incrementItem(slug));
  };

  const handleDecrement = () => {
    dispatch(decrementItem(slug));
  };

  return (
    <div className="flex flex-col rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 bg-white dark:bg-gray-800">
      <Link href={`/productDetails/${slug}`} passHref>
        <div className="relative overflow-hidden rounded-t-xl cursor-pointer">
          <Image
            src={image}
            alt={name}
            width={600}
            height={400}
            className="w-full h-56 object-cover transition-all duration-500 ease-in-out transform hover:scale-110"
          />
          <div className="absolute top-2 right-2">
            <button className="text-white bg-transparent hover:text-red-500 transition duration-200">
              <FaHeart className="w-6 h-6" />
            </button>
          </div>
        </div>
      </Link>

      <div className="p-4 space-y-3">
        <p className="text-xs font-semibold text-gray-800 dark:text-white capitalize truncate">{name}</p>
        <div className="flex justify-between items-center text-gray-600 dark:text-gray-300">
          <p className="text-sm font-bold text-primary dark:text-white">{formatCurrency(price)}</p>
        </div>

        {/* Add to Cart Button */}
        <div className="mt-4 flex w-full">
          {cartItem ? (
            <div className="flex items-center gap-2 w-full justify-between">
              <button
                onClick={handleDecrement}
                className="flex items-center justify-center w-8 h-8 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400"
              >
                <FaMinus />
              </button>
              <span className="text-sm font-bold text-gray-800 dark:text-white">
                {cartItem.quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="flex items-center justify-center w-8 h-8 bg-orange-400 text-white rounded-full hover:bg-orange-500"
              >
                <FaPlus />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className={`flex items-center justify-center text-xs font-medium py-2 rounded-md transition duration-200 w-full ${
                inStock
                  ? "bg-orange-400 text-white hover:bg-orange-500"
                  : "bg-red-500 text-white cursor-not-allowed"
              }`}
              disabled={!inStock}
            >
              {inStock ? (
                <>
                  <FaShoppingCart className="mr-2" />
                  Add to Cart
                </>
              ) : (
                <>
                  <FaBan className="mr-2" />
                  Sold Out
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;

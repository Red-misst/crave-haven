// components/ProductCard.tsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { addItem, updateQuantity, selectItems } from "@/utils/cartslice";
import { FoodType } from "@/types/food";

type ProductCardProps = {
  slug: string;
  name: string;
  image: string;
  price: number;
  inStock?:boolean;
};

const ProductCard = ({ slug, name, image, price }: ProductCardProps) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectItems);
  const cartItem = cartItems.find((item) => item.slug === slug);

  const handleAddToCart = () => {
    dispatch(addItem({   slug,
        name,
        price,
        quantity: 1,
        image,
        }));
  };

  const handleIncrement = () => {
    const existingItem = cartItems.find((item) => item.slug === slug);
    if (existingItem) {
      dispatch(updateQuantity({ slug, quantity: existingItem.quantity + 1 }));
    }
  };

  const handleDecrement = () => {
    const existingItem = cartItems.find((item) => item.slug === slug);
    if (existingItem && existingItem.quantity > 1) {
      dispatch(updateQuantity({ slug, quantity: existingItem.quantity - 1 }));
    } else if (existingItem && existingItem.quantity === 1) {
      dispatch(updateQuantity({ slug, quantity: 0 }));
    }
  };

  return (
    <div className="flex items-center justify-between lg:px-5 py-2 px-4 bg-gray-50 hover:bg-gray-100">
      <div className="flex items-center space-x-4">
        <Image
          src={image}
          height={50}
          width={80}
          alt={name}
          className="rounded-lg"
          style={{ objectFit: "contain" }}
        />
        <div>
          <h5 className="text-sm text-gray-700 capitalize">{name}</h5>
          <p className="text-xs text-gray-500">{`KES ${price}`}</p>
        </div>
      </div>

      {/* Add to Cart or Increment/Decrement Buttons */}
      <div className="flex items-center space-x-2">
        {cartItem ? (
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDecrement}
              className="px-2 py-1 bg-red-500 text-white text-xs rounded-md"
            >
              -
            </button>
            <p className="text-xs">{cartItem.quantity}</p>
            <button
              onClick={handleIncrement}
              className="px-2 py-1 bg-green-500 text-white text-xs rounded-md"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            className="px-3 py-1 bg-orange-500 text-white text-xs rounded-md"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

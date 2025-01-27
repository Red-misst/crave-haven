import Image from "next/image";
import Link from "next/link";
import { FaShoppingCart, FaBan, FaRegThumbsUp, FaHeart } from "react-icons/fa";

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
  _id: string;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
  vendor: string;
}

function Product({
  _id,
  name,
  price,
  image,
  inStock,
  vendor,
}: ProductProps) {
  return (
    <div className="flex flex-col rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 bg-white dark:bg-gray-800">
      <Link href={`/productDetails/${_id}`} passHref>
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
        
            <button
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
          
        </div>
      </div>
    </div>
  );
}

export default Product;
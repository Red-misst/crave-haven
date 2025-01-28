"use client"
import { useState } from "react";
import { FiSliders } from "react-icons/fi";
import Product from "./productCard";

// Define types for Product and Category
interface ProductType {
  name: string;
  price: number;
  image: string;
  inStock: boolean;
  vendor: string;
  slug: string;
  category: string;
}

interface CategoryType {
  _id: string;
  name: string;
}

// Define props type for ProductFeed component
interface ProductFeedProps {
  products: ProductType[];
  categories: CategoryType[];
}

function ProductFeed({ products, categories }: ProductFeedProps) {
  const [categoryActive, setCategoryActive] = useState<string>("all");
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>(products);

  const activeCategoryHandler = (category: string) => {
    if (category === "all" || categoryActive === category) {
      setCategoryActive("all");
      return;
    }
    setCategoryActive(category);
    filterProducts(category);
  };

  const filterProducts = (category: string) => {
    setFilteredProducts(
      products.filter((product) => product.category === category)
    );
  };

  return (
    <div className="w-full px-6 mt-10" id="products-feed">
   <div className="flex items-center w-full max-w-screen-xl pt-4 mb-16 gap-4 mx-auto overflow-x-auto hideScrollBar capitalize text-sm font-medium">
  <div>
    <FiSliders className="w-6 text-gray-600 dark:text-white font-bold" />
  </div>
  <div
    className={`py-2 px-6 text-center rounded hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-500 hover:text-white transition-all cursor-pointer ease-in-out duration-200 shadow ${
      categoryActive === "all" ? "bg-gradient-to-r from-blue-400 to-blue-500 text-white" : "bg-white text-gray-700"
    }`}
    onClick={() => activeCategoryHandler("all")}
  >
    All
  </div>
  {categories?.map((category, i) =>
    category.name !== "offers" ? (
      <div
        key={`category-${i}`}
        className={`py-2 px-6 text-center whitespace-nowrap rounded hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-500 hover:text-white transition-all cursor-pointer ease-in-out duration-200 shadow ${
          categoryActive === category._id ? "bg-gradient-to-r from-blue-400 to-blue-500 text-white" : "bg-white text-gray-700"
        }`}
        onClick={() => activeCategoryHandler(category._id)}
      >
        {category.name}
      </div>
    ) : null
  )}
</div>

      <div className="grid justify-center grid-flow-row-dense md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-cols-2 mx-auto px-2 gap-x-3 gap-y-5 grid-auto-rows-auto">
        {(categoryActive === "all" ? products : filteredProducts)?.map(
          ({ name, price, image, inStock, vendor, slug }, index) => (
            <Product
              key={`product-${index}`}
           slug={slug}
              name={name}
              inStock={inStock}
              price={price}
              vendor={vendor}
              image={image}
            />
          )
        )}
      </div>
    </div>
  );
}

export default ProductFeed;

// Test Data for Products and Categories
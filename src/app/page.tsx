// app/page.tsx
import Banner from "@/app/_components/homepage/banner";
import JoinCommunity from "@/app/_components/homepage/communityInvite";
import FeaturesSection from "@/app/_components/homepage/features";
import ProductFeed from "@/app/_components/homepage/productFeed";
import { fetchFoods } from "@/requests/getfoods";

type ProductType = {
  
  name: string;
  price: number;
  image: string;
  inStock: boolean;
  vendor: string;
  category: string;
};

type CategoryType = {
  _id: string;
  name: string;
};

export default async function HomePage() {
  const { foods, error } = await fetchFoods();

  // Transform foods to products
  const products: ProductType[] = foods.map((food) => ({
    name: food.name,
    price: food.price,
    image: food.image,
    inStock: true,
    vendor: "Food-e Vendor",
    category: food.category,
  }));

  // Create unique categories
  const categories: CategoryType[] = Array.from(
    new Set(products.map((product) => product.category))
  ).map((category, index) => ({
    _id: `${index + 1}`,
    name: category,
  }));

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Banner />
      <FeaturesSection />
      <JoinCommunity />

      {error ? (
        <div className="w-full max-w-7xl px-4 py-8 text-center text-red-500">
          <h2 className="text-xl font-semibold">
            Failed to load products. Please try again later.
          </h2>
          <p className="mt-2 text-sm text-gray-500">Error: {error}</p>
        </div>
      ) : (
        <ProductFeed products={products} categories={categories} />
      )}
    </main>
  );
}
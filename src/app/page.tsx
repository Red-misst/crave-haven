import Banner from "@/app/_components/homepage/banner";
import JoinCommunity from "@/app/_components/homepage/communityInvite";
import FeaturesSection from "@/app/_components/homepage/features";
import ProductFeed from "@/app/_components/homepage/productFeed";
import { Suspense } from "react";
import LoadingSkeleton from "@/app/_components/layout/loading-skeleton";
import ProductErrorDisplay from "@/app/_components/homepage/productErrorDisplay";
import ErrorBoundary from "@/app/_components/boundaries/errorBoundary";
import { ProductType, CategoryType } from "@/types/homepage";
import { FoodType } from "@/types/food";
import { connectToDatabase } from "@/lib/mongoDb";
// Constants
const DEFAULT_VENDOR = "Food-e Vendor";

export default async function HomePage() {



  try {
    const { db } = await connectToDatabase();

    // Type cast WithId<Document>[] to Food[]
    const foods = await db
      .collection('foods')
      .find({})
      .toArray()
      .then((result) =>
        result.map((item) => ({
          name: item.name,
          price: item.price,
          slug: item.slug,
          image: item.image,
          category: item.category,
          inStock: item.inStock
        })) as any
      );


    // Transform data
    const products = transformFoodsToProducts(foods);
    const categories = generateUniqueCategories(products);

    return (
      <main className="flex min-h-screen flex-col items-center justify-between">
        <Banner />
        <FeaturesSection />
        <JoinCommunity />
        <ErrorBoundary fallback={<ProductErrorDisplay />}>
          <Suspense fallback={<LoadingSkeleton />}>
            <ProductFeed products={products} categories={categories} />
          </Suspense>
        </ErrorBoundary>
      </main>
    );
  } catch (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between">
        <Banner />
        <FeaturesSection />
        <JoinCommunity />
        <ProductErrorDisplay error={error} />
      </main>
    );
  }
}

// Helper Functions
function transformFoodsToProducts(foods: FoodType[]): ProductType[] {
  return foods.map((food) => ({
    name: food.name,
    slug:food.slug,
    price: food.price,
    image: food.image,
    inStock: food.inStock || true,
    vendor: food.vendor || DEFAULT_VENDOR,
    category: food.category,
  }));
}

function generateUniqueCategories(products: ProductType[]): CategoryType[] {
  const categoryMap = new Map<string, CategoryType>();

  products.forEach((product, index) => {
    if (!categoryMap.has(product.category)) {
      categoryMap.set(product.category, {
        _id: `cat-${index + 1}-${Date.now()}`,
        name: product.category,
      });
    }
  });

  return Array.from(categoryMap.values());
}

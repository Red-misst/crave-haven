import Banner from "@/app/_components/homepage/banner";
import JoinCommunity from "@/app/_components/homepage/communityInvite";
import FeaturesSection from "@/app/_components/homepage/features";
import ProductFeed from "@/app/_components/homepage/productFeed";
import { fetchFoods } from "@/requests/getfoods";
import { Suspense } from "react";
import LoadingSkeleton from "@/components/ui/loading-skeleton";
import ErrorBoundary from "@/components/error-boundary";
import { ProductType, CategoryType } from "@/types/homepage";
import { FoodType } from "@/types/food"

// Constants
const DEFAULT_VENDOR = "Food-e Vendor";

export default async function HomePage() {
  try {
    const { foods, error } = await fetchFoods();

    if (error) {
      throw new Error(error);
    }

    // Memoize transformations
    const products = transformFoodsToProducts(foods);
    const categories = generateUniqueCategories(products);

    return (
      <main className="flex min-h-screen flex-col items-center justify-between">
        <Banner />
        <FeaturesSection />
        <JoinCommunity />
        
        <ErrorBoundary fallback={<ProductErrorDisplay />}>
          <Suspense fallback={<LoadingSkeleton />}>
            <ProductFeed 
              products={products} 
              categories={categories} 
            />
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

// Helper functions
function transformFoodsToProducts(foods: FoodType[]): ProductType[] {
  return foods.map((food) => ({
    name: food.name,
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

// Error component
function ProductErrorDisplay({ error }: { error?: unknown }) {
  const errorMessage = error instanceof Error ? error.message : 'Failed to load products';

  return (
    <div 
      role="alert" 
      aria-live="polite"
      className="w-full max-w-7xl px-4 py-8 text-center text-red-500"
    >
      <h2 className="text-xl font-semibold">
        ⚠️ Product Loading Error
      </h2>
      <p className="mt-2 text-sm text-gray-500">
        {errorMessage}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
      >
        Retry
      </button>
    </div>
  );
}
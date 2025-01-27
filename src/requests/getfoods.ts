// lib/api.ts
import { FoodType } from "@/types/food"; // Import your FoodType from the appropriate location

type ApiResponseType = {
  foods: FoodType[];
  error?: string | null;
};

export const fetchFoods = async (): Promise<ApiResponseType> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_NEXTAUTH_URL;
    if (!baseUrl) {
      throw new Error("NEXTAUTH_URL environment variable is not defined");
    }

    const response = await fetch(`${baseUrl}/api/foods`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        revalidate: 60 // Cache for 60 seconds
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      throw new Error('Invalid response format - expected JSON');
    }

    const data = await response.json();
    // Validate response structure
    if (!data.foods || !Array.isArray(data.foods)) {
      throw new Error('Invalid API response structure');
    }

    return { foods: data.foods, error: null };
  } catch (error) {
    console.error("Error fetching foods:", error);
    return { 
      foods: [], 
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};
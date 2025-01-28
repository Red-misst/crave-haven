"use client";
import React, { useState, useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { fetchFoods } from "@/requests/getfoods";
import { FoodType } from "@/types/food";
import { selectItems } from "@/utils/cartslice";
import ProductCard from "./productCard"; // Import ProductCard component

const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<FoodType[]>([]);
  const [foods, setFoods] = useState<FoodType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [fade, setFade] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const cartItems = useSelector(selectItems); // Get cart items from Redux

  const options = {
    keys: ["name", "description", "category"],
    threshold: 0.3,
  };

  // Fetch foods on component mount
  useEffect(() => {
    const loadFoods = async () => {
      try {
        const { foods: fetchedFoods, error } = await fetchFoods();
        if (error) throw new Error(error);
        setFoods(fetchedFoods);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load foods");
      } finally {
        setLoading(false);
      }
    };

    loadFoods();
  }, []);

  // Close search function
  const closeSearch = (): void => {
    setSearchTerm("");
    setSearchResults([]);
    setFade(false);
  };

  // Handle clicks outside the component
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        closeSearch();
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Prevent closing search when clicking inside the results
  const handleResultClick = (e: React.MouseEvent): void => {
    e.stopPropagation(); // Prevent the click from propagating to the window click listener
  };

  // Search food function
  const searchFood = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFade(true);

    if (!term) {
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);
      const Fuse = (await import("fuse.js")).default;
      const fuse = new Fuse(foods, options);
      setSearchResults(fuse.search(term).map((result) => result.item)); // Only keep the item object
    } catch (err) {
      setError("Search failed");
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <div className="text-red-500 text-sm p-2">Error: {error}</div>;
  }

  return (
    <div className="relative flex rounded-md items-center" ref={searchRef}>
      <div className="absolute inset-y-0 left-2.5 flex items-center">
        <FiSearch className="w-4 text-gray-600" />
      </div>

      <input
        className="p-2 pl-10 h-full flex-grow flex-shrink outline-none cursor-pointer sm:text-base text-sm rounded-lg bg-gray-200"
        type="text"
        value={searchTerm}
        placeholder="Search a product"
        onChange={searchFood}
        aria-label="Search food products"
      />

      {searchTerm && (
        <div className="absolute w-full h-auto sm:max-h-96 max-h-80 top-11 rounded-md bg-gray-100 overflow-y-auto shadow-md hideScrollBar">
          {loading ? (
            <p className="text-xs text-gray-500 text-center py-4">Loading...</p>
          ) : searchResults.length > 0 ? (
            searchResults.map((food) => (
              <div key={food.slug} onClick={handleResultClick}>
                <ProductCard {...food} /> {/* Use the ProductCard component */}
              </div>
            ))
          ) : (
            <p className="text-xs text-gray-500 text-center py-4">No Food found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;

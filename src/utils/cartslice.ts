import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/utils/store/store";

interface CartItem {
  slug: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

// Load cart data from localStorage if it exists
const loadCartFromLocalStorage = (): CartItem[] => {
  if (typeof window !== "undefined") {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  }
  return [];
};

const initialStateWithLocalStorage = {
  items: loadCartFromLocalStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialStateWithLocalStorage,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const existingItem = state.items.find((item) => item.slug === action.payload.slug);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      // Save to localStorage whenever the cart state changes
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.slug !== action.payload);
      // Save to localStorage whenever the cart state changes
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    incrementItem(state, action: PayloadAction<string>) {
      const item = state.items.find((item) => item.slug === action.payload);
      if (item) {
        item.quantity += 1;
      }
      // Save to localStorage whenever the cart state changes
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    decrementItem(state, action: PayloadAction<string>) {
      const item = state.items.find((item) => item.slug === action.payload);
      if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) {
          state.items = state.items.filter((cartItem) => cartItem.slug !== action.payload);
        }
      }
      // Save to localStorage whenever the cart state changes
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    updateQuantity(state, action: PayloadAction<{ slug: string; quantity: number }>) {
      const item = state.items.find((item) => item.slug === action.payload.slug);
      if (item) {
        item.quantity = action.payload.quantity;
        if (item.quantity <= 0) {
          state.items = state.items.filter((cartItem) => cartItem.slug !== action.payload.slug);
        }
      }
      // Save to localStorage whenever the cart state changes
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    clearCart(state) {
      state.items = [];
      // Clear cart from localStorage
      localStorage.removeItem("cartItems");
    },
  },
});

export const {
  addItem,
  removeItem,
  incrementItem,
  decrementItem,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export const selectItems = (state: RootState) => state.cart.items;

export default cartSlice.reducer;

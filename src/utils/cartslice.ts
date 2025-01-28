import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/utils/store/store";

interface CartItem {
  slug: string; // Use slug instead of id
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

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const existingItem = state.items.find((item) => item.slug === action.payload.slug);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.slug !== action.payload);
    },
    incrementItem(state, action: PayloadAction<string>) {
      const item = state.items.find((item) => item.slug === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementItem(state, action: PayloadAction<string>) {
      const item = state.items.find((item) => item.slug === action.payload);
      if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) {
          state.items = state.items.filter((cartItem) => cartItem.slug !== action.payload);
        }
      }
    },
    updateQuantity(state, action: PayloadAction<{ slug: string; quantity: number }>) {
      const item = state.items.find((item) => item.slug === action.payload.slug);
      if (item) {
        item.quantity = action.payload.quantity;
        if (item.quantity <= 0) {
          state.items = state.items.filter((cartItem) => cartItem.slug !== action.payload.slug);
        }
      }
    },
    clearCart(state) {
      state.items = [];
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

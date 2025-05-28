import { createSlice } from "@reduxjs/toolkit";

const initialCart = JSON.parse(localStorage.getItem("cart")) || [];

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: initialCart,
  },
  reducers: {
    addItem(state, action) {
      // payload = { id, selectedSize, quantity, price, image, title }
      const item = action.payload;
      const existingItem = state.items.find(
        (i) => i.id === item.id && i.selectedSize === item.selectedSize
      );
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.items.push(item);
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    updateQuantity(state, action) {
      const { id, selectedSize, quantity } = action.payload;
      const item = state.items.find(
        (i) => i.id === id && i.selectedSize === selectedSize
      );
      if (item) {
        item.quantity = quantity;
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeItem(state, action) {
      const { id, selectedSize } = action.payload;
      state.items = state.items.filter(
        (i) => !(i.id === id && i.selectedSize === selectedSize)
      );
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    clearCart(state) {
      state.items = [];
      localStorage.removeItem("cart");
    },
    setCart(state, action) {
      state.items = action.payload;
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
  },
});

export const {
  addItem,
  updateQuantity,
  removeItem,
  clearCart,
  setCart,
} = cartSlice.actions;
export default cartSlice.reducer;

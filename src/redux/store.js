
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user/userSlice.js";
import cartReducer from "./reducers/user/cartSlice";
export const store = configureStore({
  reducer: {
    user: userReducer, 
    cart: cartReducer,
  },
});

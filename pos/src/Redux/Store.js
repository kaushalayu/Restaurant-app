import { configureStore } from "@reduxjs/toolkit";
import customerSlice from "../Redux/slices/customerSlice"
import cartSlice from "../Redux/slices/cartSlice";
import userSlice from "../Redux/slices/userSlice";

const store = configureStore({
    reducer: {
        customer: customerSlice,
        cart : cartSlice,
        user : userSlice
    },

    devTools: import.meta.env.NODE_ENV !== "production",
});

export default store;

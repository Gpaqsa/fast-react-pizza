import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../src/features/user/userSlice";
import cartReducer from "../src/features/cart/cartSlice";
const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
    },
});
console.log(store.getState());
export default store;
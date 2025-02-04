import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) { 
            state.cart.push(action.payload);
        },
        deleteItem(state, action) {
            state.cart = state.cart.filter(item => item.pizzaId !== action.payload);
         },
        increaseItemQuantity(state, action) {
        //   state.cart = state.cart.map(item => { 
        //         if (item.pizzaId === action.payload) {
        //             item.quantity += 1;
        //             item.totalPrice = item.unitPrice * item.quantity;
        //             return item;
        //         }
              
            //     })
            const item = state.cart.find(item => item.pizzaId === action.payload);
            item.quantity += 1;
            item.totalPrice = item.unitPrice * item.quantity;
        },
        decreaseItemQuantity(state, action) { 
            const item = state.cart.find(item => item.pizzaId === action.payload);
            item.quantity > 1 ? item.quantity -= 1 : item.quantity = 1;
            item.totalPrice = item.unitPrice * item.quantity;

            if(item.quantity === 0 ) cartSlice.caseReducers.deleteItem(state, action)
        },
        clearCart(state) {
            state.cart = [];
         },
    }
});

export const { addItem, deleteItem, increaseItemQuantity, decreaseItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;



export const getCartData = state => state.cart.cart;
export const getTotalCartPrice = (state)=> state.cart.cart.reduce((sum, current) => sum + current.totalPrice, 0)
export const getCurrentQuantityById = (id) => (state) => state.cart.cart.find(item => item.pizzaId === id)?.quantity ?? 0;
import { createSlice } from "@reduxjs/toolkit";

// Helper function to load cart from localStorage
const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem('cart');
    if (serializedCart === null) {
      return [];
    }
    return JSON.parse(serializedCart);
  } catch (err) {
    console.error('Could not load cart from localStorage', err);
    return [];
  }
};

// Helper function to save cart to localStorage
const saveCartToLocalStorage = (cart) => {
  try {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem('cart', serializedCart);
  } catch (err) {
    console.error('Could not save cart to localStorage', err);
  }
};

// Load initial state from localStorage
const initialState = {
  cart: loadCartFromLocalStorage(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
      saveCartToLocalStorage(state.cart); // Save to localStorage
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter(item => item.pizzaId !== action.payload);
      saveCartToLocalStorage(state.cart); // Save to localStorage
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find(item => item.pizzaId === action.payload);
      if (item) {
        item.quantity += 1;
        item.totalPrice = item.unitPrice * item.quantity;
        saveCartToLocalStorage(state.cart); // Save to localStorage
      }
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find(item => item.pizzaId === action.payload);
      if (item) {
        item.quantity = Math.max(item.quantity - 1, 1); // Ensure quantity doesn't go below 1
        item.totalPrice = item.unitPrice * item.quantity;
        saveCartToLocalStorage(state.cart); // Save to localStorage
      }
    },
    clearCart(state) {
      state.cart = [];
      saveCartToLocalStorage(state.cart); // Save to localStorage
    },
  },
});

export const { addItem, deleteItem, increaseItemQuantity, decreaseItemQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

// Selectors
export const getCartData = (state) => state.cart.cart;

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, current) => sum + current.totalPrice, 0);

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
  shippingAddress: localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {},
  paymentMethod: localStorage.getItem('paymentMethod')
    ? JSON.parse(localStorage.getItem('paymentMethod'))
    : '',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      
      const existItem = state.cartItems.find(
        (x) => x.product === item.product
      );
      
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.product === existItem.product ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      
      // Calculate prices
      state.itemsPrice = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      );
      
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (x) => x.product !== action.payload
      );
      
      // Calculate prices
      state.itemsPrice = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      );
      
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem(
        'shippingAddress',
        JSON.stringify(state.shippingAddress)
      );
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem('paymentMethod', JSON.stringify(state.paymentMethod));
    },
    clearCartItems: (state) => {
      state.cartItems = [];
      localStorage.removeItem('cartItems');
    },
    calculatePrices: (state) => {
      // Calculate items price
      state.itemsPrice = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      );
      // Calculate shipping price (free shipping for orders over $100)
      state.shippingPrice = state.itemsPrice > 100 ? 0 : 10;
      // Calculate tax price (15% tax)
      state.taxPrice = Number((0.15 * state.itemsPrice).toFixed(2));
      // Calculate total price
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
  calculatePrices,
} = cartSlice.actions;

export default cartSlice.reducer;

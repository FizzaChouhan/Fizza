import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../constants.js';
import { clearCartItems } from '../../redux/slices/cartSlice.js';

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (order, { getState, rejectWithValue, dispatch }) => {
    try {
      const {
        user: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(`${BASE_URL}/api/orders`, order, config);

      dispatch(clearCartItems());

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const getOrderDetails = createAsyncThunk(
  'order/getOrderDetails',
  async (id, { getState, rejectWithValue }) => {
    try {
      const {
        user: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`${BASE_URL}/api/orders/${id}`, config);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const payOrder = createAsyncThunk(
  'order/payOrder',
  async ({ orderId, paymentResult }, { getState, rejectWithValue }) => {
    try {
      const {
        user: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `${BASE_URL}/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const listMyOrders = createAsyncThunk(
  'order/listMyOrders',
  async (_, { getState, rejectWithValue }) => {
    try {
      const {
        user: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`${BASE_URL}/api/orders/myorders`, config);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

const initialState = {
  orders: [],
  order: {},
  loading: false,
  success: false,
  error: null,
  loadingPay: false,
  successPay: false,
  errorPay: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
    resetOrderPay: (state) => {
      state.loadingPay = false;
      state.successPay = false;
      state.errorPay = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get order details
      .addCase(getOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Pay order
      .addCase(payOrder.pending, (state) => {
        state.loadingPay = true;
        state.errorPay = null;
      })
      .addCase(payOrder.fulfilled, (state) => {
        state.loadingPay = false;
        state.successPay = true;
      })
      .addCase(payOrder.rejected, (state, action) => {
        state.loadingPay = false;
        state.errorPay = action.payload;
      })
      
      // List my orders
      .addCase(listMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(listMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetOrder, resetOrderPay } = orderSlice.actions;

export default orderSlice.reducer;

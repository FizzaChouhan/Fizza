import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../constants.js';

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async ({ keyword = '', pageNumber = 1, category = '' }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/products?keyword=${keyword}&pageNumber=${pageNumber}&category=${category}`
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

export const fetchProductDetails = createAsyncThunk(
  'product/fetchProductDetails',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/products/${id}`);
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

export const fetchTopProducts = createAsyncThunk(
  'product/fetchTopProducts',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/products/top`);
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

export const fetchFeaturedProducts = createAsyncThunk(
  'product/fetchFeaturedProducts',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/products/featured`);
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

export const fetchCategories = createAsyncThunk(
  'product/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/products/categories`);
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

export const createProductReview = createAsyncThunk(
  'product/createProductReview',
  async ({ productId, review }, { getState, rejectWithValue }) => {
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

      await axios.post(
        `${BASE_URL}/api/products/${productId}/reviews`,
        review,
        config
      );
      return { success: true };
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
  products: [],
  product: { reviews: [] },
  topProducts: [],
  featuredProducts: [],
  categories: [],
  loading: false,
  error: null,
  success: false,
  page: 1,
  pages: 1,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    resetProductDetails: (state) => {
      state.product = { reviews: [] };
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch product details
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch top products
      .addCase(fetchTopProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.topProducts = action.payload;
      })
      .addCase(fetchTopProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch featured products
      .addCase(fetchFeaturedProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredProducts = action.payload;
      })
      .addCase(fetchFeaturedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create product review
      .addCase(createProductReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProductReview.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createProductReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetProductDetails } = productSlice.actions;

export default productSlice.reducer;

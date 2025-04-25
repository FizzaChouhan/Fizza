import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../constants.js';

// Get user from localStorage
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        `${BASE_URL}/api/users/login`,
        { email, password },
        config
      );

      localStorage.setItem('userInfo', JSON.stringify(data));

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

export const register = createAsyncThunk(
  'user/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        `${BASE_URL}/api/users`,
        { name, email, password },
        config
      );

      localStorage.setItem('userInfo', JSON.stringify(data));

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

export const logout = createAsyncThunk('user/logout', async () => {
  localStorage.removeItem('userInfo');
  return null;
});

export const getUserDetails = createAsyncThunk(
  'user/getUserDetails',
  async (id, { getState, rejectWithValue }) => {
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

      const { data } = await axios.get(`${BASE_URL}/api/users/${id}`, config);

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

export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (user, { getState, rejectWithValue }) => {
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
        `${BASE_URL}/api/users/profile`,
        user,
        config
      );

      localStorage.setItem('userInfo', JSON.stringify(data));

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
  userInfo: userInfoFromStorage,
  loading: false,
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUserState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.userInfo = null;
      })
      
      // Get user details
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update user profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userInfo = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetUserState } = userSlice.actions;

export default userSlice.reducer;

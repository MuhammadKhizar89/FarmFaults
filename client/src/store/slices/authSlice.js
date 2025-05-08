import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUserApiCall,
  logoutApiCall,
  deletetUserApiCall,
  updateAvatarApiCall,
  verifyApiCall,
} from "../../apis/auth.api";

// Async Thunks
export const fetchUser = createAsyncThunk("auth/fetchUser", async (_, thunkAPI) => {
  const response = await getUserApiCall();
  if (response.success) return response.data;
  return thunkAPI.rejectWithValue(response.message);
});

export const deleteUser = createAsyncThunk("auth/deleteUser", async (_, thunkAPI) => {
  const response = await deletetUserApiCall();
  if (response.success) return response.message;
  return thunkAPI.rejectWithValue(response.message);
});

export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, thunkAPI) => {
  const response = await logoutApiCall();
  if (response.success) return response.message;
  return thunkAPI.rejectWithValue(response.message);
});

export const updateUserAvatar = createAsyncThunk(
  "auth/updateAvatar",
  async (avatarUrl, thunkAPI) => {
    const response = await updateAvatarApiCall(avatarUrl);
    if (response.success) return avatarUrl;
    return thunkAPI.rejectWithValue(response.message);
  }
);

export const verifyLogin = createAsyncThunk("auth/verifyLogin", async (_, thunkAPI) => {
  const response = await verifyApiCall();
  if (response.success) return true;
  return false;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    uploadingAvatar: false,
    error: null,
  },
  reducers: {
    resetAuthState: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.uploadingAvatar = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(updateUserAvatar.pending, (state) => {
        state.uploadingAvatar = true;
      })
      .addCase(updateUserAvatar.fulfilled, (state, action) => {
        state.user.avatar = action.payload;
        state.uploadingAvatar = false;
      })
      .addCase(updateUserAvatar.rejected, (state, action) => {
        state.uploadingAvatar = false;
        state.error = action.payload;
      })
      .addCase(verifyLogin.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload;
      });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
